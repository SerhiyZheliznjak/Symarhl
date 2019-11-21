import {NETWORK_DEV} from '@monorepo/core';

// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  publicUrl: `http://192.168.31.129: ${NETWORK_DEV.WEB_PORT}`,
};
