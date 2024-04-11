/* Como un tester de software, quiero realizar pruebas automatizadas para verificar 
la visualización del código fuente de la página principal de Wikipedia en español, 
para garantizar la integridad del contenido y su correcta presentación.
*/
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

(async function wikipediaTest() {
  // Configura el navegador Chrome
  let opciones = new chrome.Options();
  opciones.addArguments('--disable-notifications');

  // Inicializa el controlador de Selenium WebDriver para Chrome
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(opciones).build();

  try {
    // Abre la página principal de Wikipedia en español
    await driver.get('https://es.wikipedia.org/wiki/Wikipedia:Portada');

    // Espera hasta que el título de la página sea visible
    await driver.wait(until.titleContains('Wikipedia'), 10000);

    // Busca el elemento del menú para ver el código fuente
    let verCodigoFuenteElement = await driver.findElement(By.linkText('Ver código fuente'));

    // Abre el enlace en una nueva pestaña
    await verCodigoFuenteElement.sendKeys(Key.chord(Key.CONTROL, Key.RETURN));

    // Espera un tiempo para que se abra la nueva pestaña
    await driver.sleep(2000);

    // Cambia el controlador a la nueva pestaña
    let tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[1]);

    // Obtén el código fuente de la página
    let codigoFuente = await driver.getPageSource();
    console.log("Código fuente de la página:", codigoFuente);

    // Captura de pantalla
    await capturarPantalla('codigo_fuente');
  } catch (error) {
    console.error("Error durante la prueba:", error);
  } finally {
    // Cierra el navegador al finalizar la prueba
    await driver.quit();
  }
})();

async function capturarPantalla(nombreArchivo) {
  // Define la ruta de la carpeta de capturas y el nombre de archivo
  const capturas = path.join(__dirname, 'capturas');
  const rutaAbsoluta = path.join(capturas, nombreArchivo + '.png');
  try {
    // Verifica si la carpeta de capturas existe, si no, la crea
    if (!fs.existsSync(capturas)) {
      fs.mkdirSync(capturas);
    }
    // Captura de pantalla utilizando la librería screenshot-desktop
    await screenshot({ filename: rutaAbsoluta });
    console.log(`Captura de pantalla guardada como ${rutaAbsoluta}`);
  } catch (error) {
    console.error('Error al capturar pantalla:', error);
  }
}


