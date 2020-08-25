const timeout = 15000;

// test d'un raccourcisseur d'URL
describe("Shorten Anonymous", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('basic shorten', async () => {
        await page.goto('http://polr.stationmyr.net');
        await page.waitForSelector('.long-link-input');
        await page.type('.long-link-input', 'https://www.google.com/search?source=hp&ei=QQbPW52GC9CRlwSHw46oAg&q=puppeteer+jest&oq=puppeteer+jest&gs_l=psy-ab.3...2441.6095.0.6926.0.0.0.0.0.0.0.0..0.0....0...1c.1.64.psy-ab..0.0.0....0.qKd5wLlrTYk');
        await page.screenshot({path: './tests/img/shorten1.png'});
        await page.waitForSelector('#shorten');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('input.result-box');
        const val = await page.$eval('input.result-box', el => el.value);
        expect(val).toMatch(/^http:\/\/polr\.stationmyr.net\.net\/[0-9]+/);
        await page.screenshot({path: './tests/img/shorten2.png'});
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
