async function waitForHighlights() {
  await page.waitForSelector(".Highlight .Highlight__part", {
    visible: true,
  });
}

async function highlight(start, end) {
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.waitFor(50);
  await page.mouse.move(end.x, end.y);
  await page.waitFor(50);
  await page.mouse.up();
}

jest.setTimeout(30000);

beforeAll(async () => {
  await page.goto("http://localhost:3000");
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
  await expect(page).toMatch("Flow or TypeScript?");
});

it("should highlight text", async () => {
  await waitForHighlights();
  await highlight({ x: 400, y: 300 }, { x: 500, y: 300 });
  await page.waitForSelector(".PdfHighlighter__tip-container", {
    visible: true,
  });
});

it("should allow a selection on multiple pages", async () => {
  await page.setViewport({ width: 1397, height: 1329 });
  await waitForHighlights();
  await highlight({ x: 30, y: 10 }, { x: 489, y: 3000 });
  const addHighlightPopup = await page.waitForSelector(".Tip__compact", {
    visible: true,
  });
  await addHighlightPopup.click();
  const commentTextArea = await page.waitForSelector(
    "div.PdfHighlighter__tip-container textarea"
  );
  await commentTextArea.type("test");
  const saveCommentButton = await page.waitForSelector(
    "div.PdfHighlighter__tip-container input[type=submit]"
  );
  await saveCommentButton.click();
});
