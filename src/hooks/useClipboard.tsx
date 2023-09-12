import { useState } from "react";

export function useClipboard({ timeout = 2000 } = {}) {
  const [error, setError] = useState<Error>();
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<number>();
  const clipboardSupported = Boolean(
    window.isSecureContext && "clipboard" in navigator
  );

  const handleCopyResult = (value: boolean) => {
    clearTimeout(copyTimeout);
    setCopyTimeout(setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };

  const copy = (valueToCopy: string) => {
    if ("clipboard" in navigator) {
      console.log("here");
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => {
          console.log("tse");
          handleCopyResult(true);
        })
        .catch((err: Error) => setError(err));
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"));
    }
  };

  const reset = () => {
    setCopied(false);
    setError(undefined);
    clearTimeout(copyTimeout);
  };

  return { clipboardSupported, copy, reset, error, copied };
}
