const timeout = 15000;

// série de tests sur la page d'accueil
describe("Tests basiques", () => {
  let page;
  // parcours client avec about
  test(
    "about",
    async () => {
      await page.goto("http://polr.stationmyr.net");
      await page.waitForSelector("#navbar li a");
      // click sur le lien "About" de la navigation
      await page.evaluate(() => {
        Array.from(document.querySelectorAll("#navbar li a"))
          .filter((el) => el.textContent === "About")[0]
          .click();
      });
      // on attent que l'élément ".about-contents" soit chargé
      await page.waitForSelector(".content-div");
      // on récupère le code HTML
      const html = await page.$eval(".about-contents", (e) => e.innerHTML);
      // on screanshot
      await page.screenshot({ path: "./tests/img/basic-about-page.png" });
      // on vérifie qu'il contient la bonne chaîne de caractères
      expect(html).toContain("powered by Polr 2");
      // attendre que les liens soit chargé
      await page.waitForSelector(".about-contents p a");
      // clicker sur le premier liens
      await page.evaluate(() => {
        Array.from(document.querySelectorAll(".about-contents p a"))
          .filter((el) => el.textContent === "its Github page")[0]
          .click();
      });
      // attendre le chargement de la page
      await page.waitForNavigation();
      // screnshot github
      await page.screenshot({ path: "./tests/img/github-page.png" });
      // revenir en arrière
      await page.goBack();
      // attendre que les liens soit chargé
      await page.waitForSelector(".about-contents p a");
      // clicker sur le deuxième lien
      await page.evaluate(() => {
        Array.from(document.querySelectorAll(".about-contents p a"))
          .filter((el) => el.textContent === "project site")[0]
          .click();
      });
      // attendre le chargement de la page
      await page.waitForNavigation();
      // screnshot polr
      await page.screenshot({ path: "./tests/img/polr-page.png" });
      // revenir en arrière
      await page.goBack();
      // attendre que le button soit chargé
      await page.waitForSelector(".content-div a");
      // clicker sur le button
      await page.evaluate(() => {
        Array.from(document.querySelectorAll(".content-div a"))
          .filter((el) => el.textContent === "More Information")[0]
          .click();
      });
      // attendre le chargement
      await page.waitForSelector('.content-div a[href="#"]');
      //prendre un screnshot
      await page.screenshot({ path: "./tests/img/MoreInformation-page.png" });
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
