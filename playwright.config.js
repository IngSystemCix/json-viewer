import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60000, // 60s por si carga lento
  webServer: {
    command: "bunx serve .", // Sirve la raíz del proyecto
    port: 3000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:3000", // De aquí usarás page.goto('/test/test-page.html')
    headless: true,
  },
});
