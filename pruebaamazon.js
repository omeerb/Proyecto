/*Como usuario interesado en comprar una camisa en línea, quiero realizar una 
búsqueda de la palabra "camisa" en Amazon, para explorar las opciones disponibles 
para comprar el producto.
*/
const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

(async function amazonSearchTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Abre Amazon
    await driver.get('https://www.amazon.com');

    // Ingresa la palabra "camisa" en el campo de búsqueda y presiona Enter
    await driver.findElement(By.id('twotabsearchtextbox')).sendKeys('camisa', Key.RETURN);

    // Espera hasta que la página de resultados de búsqueda se cargue completamente
    await driver.wait(until.titleContains('camisa'), 10000);

    // Captura de pantalla
    const screenshot = await driver.takeScreenshot();
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshotPath = `./capturas/amazon_camisa_${timestamp}.png`;
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
  } catch (error) {
    console.error("Error durante la prueba:", error);
  } finally {
    await driver.quit();
  }
})();
