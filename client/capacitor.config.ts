import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'freak-project',
  webDir: 'build',
  server: {
    cleartext: false,           // solo HTTP deshabilitado
    allowNavigation: ['*'],     // permite navegación a cualquier dominio
  }
};

export default config;

