import chromium from '@sparticuz/chromium';
import pl from 'playwright-core';

// This is the path to the local Chromium binary
const LOCAL_CHROMIUM_PATH =
  '/tmp/localChromium/chromium/mac-1477840/chrome-mac/Chromium.app/Contents/MacOS/Chromium';

export async function handler() {
  const url = 'https://ryan17.dev';
  const width = 1024;
  const height = 768;

  console.log('Launching browser...');
  const browser = await pl.chromium.launch({
    args: chromium.args,
    executablePath: process.env.SST_DEV
      ? LOCAL_CHROMIUM_PATH
      : await chromium.executablePath(),
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewportSize({
    width: width,
    height: height,
  });

  await page.goto(url);

  console.log('Visited URL', url);

  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, url }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
