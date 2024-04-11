const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    
    for (let i = 0; i < Math.min(5, searchResults.length); i++) {
      let titleElement = await searchResults[i].findElement(By.css('h2'));
      let linkElement = await titleElement.findElement(By.css('a'));
      let title = await titleElement.getText();
      let link = await linkElement.getAttribute('href');
      console.log('Título:', title);
      console.log('Enlace:', link);
    }
    // Captura de pantalla
    const screenshot = await driver.takeScreenshot();
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshotPath = `./capturas/screenshot_${timestamp}.png`;
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
  } finally {
    await driver.quit();
  }
})();
