/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_COLLECTION_ID: string;
  readonly VITE_DATABASE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
