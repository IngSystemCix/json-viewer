import { test, expect } from "@playwright/test";

test("should display JSON data when set via attribute", async ({ page }) => {
  await page.goto("/test/test-page.html"); // Crea este archivo HTML

  const content = await page.locator("json-viewer").evaluate((el) => {
    return el.shadowRoot.querySelector("pre").textContent;
  });

  expect(content).toContain('"country": "Peru"');
});

test("should display JSON data when set via JS property", async ({ page }) => {
  await page.goto("/test/test-page.html");

  await page.evaluate(() => {
    const viewer = document.getElementById("viewer");
    viewer.data = { framework: "Angular" };
  });

  const content = await page.locator("json-viewer").evaluate((el) => {
    return el.shadowRoot.querySelector("pre").textContent;
  });

  expect(content).toContain('"framework": "Angular"');
});
