// Stub for canvg in extension build.
// jsPDF references canvg via an optional dynamic import in `addSvgAsImage`.
// Companion does not use addSvgAsImage (diagrams are rendered to canvas PNG
// directly in apps/extension/src/lib/mermaid.ts). Stubbing this avoids
// bundling canvg and its core-js dynamic script-tag generators, which violate
// Chrome Web Store MV3 policies (Blue Argon / Red Titanium).

export class Canvg {
  static from(): Promise<never> {
    return Promise.reject(new Error('canvg is disabled in extension context'));
  }
  static fromString(): Promise<never> {
    return Promise.reject(new Error('canvg is disabled in extension context'));
  }
}

export default Canvg;
