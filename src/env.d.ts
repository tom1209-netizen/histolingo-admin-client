interface ImportMetaEnv {
    readonly VITE_DOMAIN_API: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }