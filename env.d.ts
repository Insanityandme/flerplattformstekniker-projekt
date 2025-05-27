/// <reference types="vite/client" />
/// <reference types="chrome-types" />
interface Window {
  browser?: typeof chrome;
}
