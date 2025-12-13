/// <reference types="react" />
/// <reference types="react/jsx-runtime" />
/// <reference types="node" />

declare module "*.css";

declare global {
  var process: NodeJS.Process;
  var Buffer: typeof global.Buffer;
  
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface ElementClass {
      render(): JSX.Element;
    }
  }
}