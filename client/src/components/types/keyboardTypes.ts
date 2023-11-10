// react-use-keypress.d.ts
/**
 * @param {string | string[]} keys - The key(s) to listen for.
 * @param {(event: KeyboardEvent) => void} callback - The callback function to execute when the key(s) are pressed.
 * @param {Object} options - Additional options (if any).
 */
declare module "react-use-keypress" {
  export default function useKeypress(keys, callback, options): void;
}
