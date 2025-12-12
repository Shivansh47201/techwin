/// <reference types="react" />
/// <reference types="react/jsx-runtime" />

declare module "*.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface ElementClass {
      render(): JSX.Element;
    }
  }
}