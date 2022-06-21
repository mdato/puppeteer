const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await loadUrl(page, "http://www.dolar-blue.com/", browser);
})();

async function loadUrl(page, url, browser) {
  await page.goto(url, {
    waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
  });

  let compraBlue = await page.$eval(
    ".values > .compra > .val",
    (el) => el.innerHTML
  );
  let ventaBlue = await page.$eval(
    ".values > .venta > .val",
    (el) => el.innerHTML
  );
  let actualizado = await page.$eval(
    ".update > .container",
    (el) => el.innerHTML
  );
  let ubica = actualizado.indexOf(":");
  //console.log(ubica)
  actualizado = actualizado.substr(0, ubica + 3);
  console.log(
    "\nLast Updated: " +
      actualizado.substr(42, 13).trim() +
      "\nBlue Compra: " +
      compraBlue +
      "\nBlue Venta: " +
      ventaBlue +
      "\n"
  );
  await browser.close();
}
