const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Abre el navegador y va a la página de Google
    await driver.get('https://www.google.com');

    // Espera a que aparezca el enlace 'Condiciones' y haz clic en él
    await driver.wait(until.elementLocated(By.linkText('Condiciones')), 10000);
    let settingsLink = await driver.findElement(By.linkText('Condiciones'));
    await settingsLink.click();

   
    // Captura de pantalla
    const screenshot = await driver.takeScreenshot();
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshotPath = `./capturas/condiciones.png`;
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
  } finally {
    await driver.quit();
  }
})();
