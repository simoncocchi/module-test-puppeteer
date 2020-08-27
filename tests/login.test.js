const timeout = 15000;

// test d'un raccourcisseur d'URL
describe("Shorten Anonymous", () => {
  let page;

  // vérification du chargement de la page d'accueil
  test(
    "basic shorten",
    async () => {
      await page.goto("http://polr.stationmyr.net");
      await page.waitForSelector("#navbar li a");
      await page.click(".navbar .dropdown a");
      await page.waitForSelector(
        '#dropdown form[action="login"] input[name="username"]'
      );
      await page.type(
        '.dropdown form[action="login"] input[name="username"]',
        "simonline"
      );
      await page.waitForSelector(
        '#dropdown form[action="login"] input[name="password"]'
      );
      await page.type(
        '.dropdown form[action="login"] input[name="password"]',
        "azerty"
      );
      await page.click('#dropdown form[action="login"] input[name="login"]');
      await page.screenshot({ path: "./tests/img/login-pass.png" });
      // fin login

      // test incrémentation
      await page.waitForSelector(".navbar .dropdown a");
      await page.click(".navbar .dropdown a");
      await page.waitForSelector(".navbar .dropdown .dropdown-menu li a");
      await page.click(".navbar .dropdown .dropdown-menu li a");
      await page.waitForSelector('ul[role="tablist"] li a[href="#links"]');
      await page.click('ul[role="tablist"] li a[href="#links"]');
      await page.screenshot({ path: "./tests/img/dashboard.png" });
      await page.waitForSelector(
        "#user_links_table tbody tr td:nth-of-type(3)"
      );
      const elementLinks = await page.$(
        "#user_links_table tbody tr td:nth-of-type(1)"
      );
      const link = await page.evaluate(
        (elementLinks) => elementLinks.textContent,
        elementLinks
      );
      console.log("link %o:", link);
      const elementClick = await page.$(
        "#user_links_table tbody tr td:nth-of-type(3)"
      );
      const click = await page.evaluate(
        (elementClick) => elementClick.textContent,
        elementClick
      );
      console.log("click", click);
      await page.goto("http://polr.stationmyr.net/" + link);
      await page.goBack();
      await page.waitForSelector(
        "#user_links_table tbody tr td:nth-of-type(3)"
      );
      const elementClickAfter = await page.$(
        "#user_links_table tbody tr td:nth-of-type(3)"
      );
      const clickafter = await page.evaluate(
        (elementClickAfter) => elementClickAfter.textContent,
        elementClickAfter
      );
      console.log("clickafter", clickafter);
      expect(parseInt(clickafter)).toBeGreaterThan(parseInt(click));
    },
    timeout
  );

  // cette fonction est lancée avant chaque test de cette
  // série de tests
  beforeAll(async () => {
    // ouvrir un onglet dans le navigateur
    page = await global.__BROWSER__.newPage();
  }, timeout);
});
