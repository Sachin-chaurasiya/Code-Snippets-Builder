declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_COLLECTION_ID?: string;
      REACT_APP_API_KEY: string;
      REACT_APP_DATABASE_ID: string;
      REACT_APP_PROJECT_ID: string;
      REACT_APP_ENDPOINT: string;
    }
  }
}

export {};
