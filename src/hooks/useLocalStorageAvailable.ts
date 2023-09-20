export const useLocalStorageAvailable = () => {
  const test = "t";

  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};
