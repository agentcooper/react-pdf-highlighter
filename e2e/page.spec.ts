import { type Page, expect, test } from "@playwright/test";

const exampleUrl = "http://localhost:3003/react-pdf-highlighter/";

async function waitForHighlights(page: Page) {
  const highlight = page.locator(".Highlight .Highlight__part").first();
  const error = page.getByRole("alert");
  await expect(highlight.or(error)).toBeVisible({ timeout: 30_000 });
  if (await error.isVisible()) {
    throw new Error(await error.innerText());
  }
}

test("page loads", async ({ page }) => {
  await page.goto(exampleUrl);
  await expect(page).toHaveTitle("react-pdf-highlighter");
});

test("should display highlights", async ({ page }) => {
  await page.goto(exampleUrl);
  await waitForHighlights(page);
});

test("should display hover tips over highlights", async ({ page }) => {
  await page.goto(exampleUrl);
  await waitForHighlights(page);
  await page.hover(".Highlight .Highlight__part");
  await page.waitForSelector("#PdfHighlighter__tip-container");
  await expect(page.getByText("🔥 Flow or TypeScript?")).toBeVisible();
});

test("should display PDF loading errors", async ({ page }) => {
  const invalidPdfUrl = `${exampleUrl}invalid.pdf`;
  await page.route(invalidPdfUrl, (route) =>
    route.fulfill({
      contentType: "application/pdf",
      body: "This is not a PDF document.",
    }),
  );
  await page.goto(`${exampleUrl}?url=${encodeURIComponent(invalidPdfUrl)}`);
  await expect(page.getByRole("alert")).toContainText(
    "Unable to load PDF: Invalid PDF structure.",
  );
});
