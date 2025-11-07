import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'freak-project',
  webDir: 'build',
  server: {
    url: "https://freak-project-production.up.railway.app/",
    allowNavigation: ["freak-project-production.up.railway.app"],
  }
};

export default config;

