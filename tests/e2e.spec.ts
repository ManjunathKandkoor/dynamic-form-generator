import { test, expect } from "@playwright/test";
test("should load homepage", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle("DynamicFormGenaretor");
});
