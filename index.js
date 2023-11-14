const functions = require("@google-cloud/functions-framework");
const puppeteer = require("puppeteer");

const PUPPETEER_OPTIONS = {
  headless: true,
};

let page;

async function getBrowserPage() {
  // Launch headless Chrome. Turn off sandbox so Chrome can run under root.
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
  return browser.newPage();
}

functions.http("htmltopdf", async (req, res) => {
  if (req.method !== "POST") {
    return res.send("Only POST requests are allowed");
  }

  const body = req.body;

  if (!body.html) {
    return res.send("Send a HTML to convert");
  }

  if (!page) {
    page = await getBrowserPage();
  }

  try {
    await page.setContent(body.html, {
      waitUntil: "networkidle0",
    });
  } catch (err) {
    throw err;
  }

  let pdf;
  try {
    pdf = await page.pdf(body.opts, { timeout: 60000 });
  } catch (err) {
    throw err;
  }

  res.contentType("application/pdf");
  res.send(pdf);
});
