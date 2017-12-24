const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async () => {
	// Mở trình duyệt mới và tới trang của zing.vn
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://news.zing.vn/nhung-kieu-mot-kho-hieu-cua-nguoi-dep-quoc-te-post806114.html');

	// Crawl hình ảnh trong trang
	const imgLinks = await page.evaluate(() => {
		// Lấy tất cả các đối tượng img nằm trong thẻ div.photoset-item
		let imgElements = document.querySelectorAll('div.photoset-item > img');
		// Chuyển node list thành 1 mảng
		imgElements = [...imgElements];
		// Lấy thuộc tính src của mỗi phần tử trong mảng
		let imgLinks = imgElements.map(imgUrl => imgUrl.getAttribute('src'));
		return imgLinks;
	});
	console.log(imgLinks);

	// Dơnload hình ảnh bằng thư viện image-downloader
	await Promise.all(imgLinks.map(imgUrl => download.image({
		url: imgUrl,
		dest: __dirname
	})));

	// Đóng trình duyệt
	await browser.close();
})();
