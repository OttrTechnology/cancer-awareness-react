import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useEventCallback, useEventListener } from "usehooks-ts";
import CryptoJS from "crypto-js";
import { useLocalStorageAvailable } from "./useLocalStorageAvailable";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

const SECRET_KEY = import.meta.env.VITE_AES;

const encryptData = (data: string) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

const decryptData = (data: string | null) =>
  data
    ? CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    : null;

interface Options {
  secure: boolean;
}

export function useStorage<T>(
  key: string,
  initialValue: T,
  { secure }: Options = { secure: false }
): [T, SetValue<T>] {
  const localStorageAvailable = useLocalStorageAvailable();

  const storage = localStorageAvailable
    ? window.localStorage
    : window.sessionStorage;

  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") return initialValue;

    try {
      const item = secure
        ? decryptData(storage.getItem(key))
        : storage.getItem(key);

      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(
        `Error reading ${
          localStorageAvailable ? "localStorage" : "sessionStorage"
        } key “${key}”:`,
        error
      );
      return initialValue;
    }
  }, [initialValue, key, localStorageAvailable]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      storage.setItem(
        key,
        secure
          ? encryptData(JSON.stringify(newValue))
          : JSON.stringify(newValue)
      );

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(
        `Error setting ${
          localStorageAvailable ? "localStorage" : "sessionStorage"
        } key “${key}”:`,
        error
      );
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  // this only works for other documents, not the current one
  useEventListener("storage", handleStorageChange);

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue];
}

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}
