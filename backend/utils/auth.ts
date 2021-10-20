/**
 * A randomly generated string to protect against attacks such as cross-site request forgery (used in `spotify web api`).
 * @param length - will determine the return value length
 * @returns randomly generated strings
 * @example generateRandomString(16);
 */
export const generateRandomString = (length: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
