async function waitForHighlights() {
  console.log("Waiting for highlights...");
  await page.waitForSelector(".Highlight .Highlight__part", {
    visible: true,
  });
  console.log("Highlights are visible.");
}

async function highlight(start, end) {
  console.log(
    `Highlighting from ${JSON.stringify(start)} to ${JSON.stringify(end)}`
  );
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.waitFor(50);
  await page.mouse.move(end.x, end.y);
  await page.waitFor(50);
  await page.mouse.up();
}

jest.setTimeout(60000); // Increased timeout

beforeAll(async () => {
  await page.goto("http://localhost:3000");
  console.log("Page loaded");
});

it("should display highlights", async () => {
  await waitForHighlights();
});

it("should display hover tips over highlights", async () => {
  await waitForHighlights();
  await page.hover(".Highlight .Highlight__part", {
    visible: true,
  });
  await page.waitForSelector(".PdfHighlighter__tip-container", {
    visible: true,
  });
  await expect(page).toMatchTextContent("Flow or TypeScript?");
});
