const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	page.setViewport({ width: 1280, height: 720 });
	await page.goto('http://kenh14.vn', { waitUntil: 'networkidle2' });
	await page.screenshot({ path: 'kenh14.png' });
	
	await browser.close();
})();
