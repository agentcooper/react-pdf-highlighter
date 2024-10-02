import { type Page, expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3003/react-pdf-highlighter/");
});

async function waitForHighlights(page: Page) {
  await page.waitForSelector(".Highlight .Highlight__part");
}

test("page loads", async ({ page }) => {
  await expect(page).toHaveTitle("react-pdf-highlighter");
});

test("should display highlights", async ({ page }) => {
  await waitForHighlights(page);
});

test("should display hover tips over highlights", async ({ page }) => {
  await waitForHighlights(page);
  await page.hover(".Highlight .Highlight__part");
  await page.waitForSelector("#PdfHighlighter__tip-container");
  await expect(page.getByText("🔥 Flow or TypeScript?")).toBeVisible();
});
