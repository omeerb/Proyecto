const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const screenshot = require('screenshot-desktop');
const path = require('path');

(async function ejemplo() {
  // Configura el navegador Chrome
  let opciones = new chrome.Options();
  // Deshabilita las notificaciones de Chrome
  opciones.addArguments('--disable-notifications');
  // Inicializa el controlador de Selenium WebDriver para Chrome
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(opciones).build();

  try {
    // Abre Facebook
    await driver.get('https://www.facebook.com');

    // Captura de pantalla
    await capturarPantalla('facebook_home');

    // Espera hasta que el campo de entrada de correo electrónico esté presente
    await driver.wait(until.elementLocated(By.name('email')), 10000);

    // Captura de pantalla
    await capturarPantalla('facebook_login');

    // Ingresa tu correo electrónico y contraseña de Facebook
    await driver.findElement(By.name('email')).sendKeys('tu_correo_electronico');
    await driver.findElement(By.name('pass')).sendKeys('tu_contraseña', Key.RETURN);

    // Espera hasta que el botón de inicio de sesión esté presente en la página de inicio
    await driver.wait(until.elementLocated(By.id('u_0_b')), 10000);

    // Captura de pantalla
    await capturarPantalla('facebook_logged_in');

    // Verifica que se haya iniciado sesión correctamente
    let nombreUsuario = await driver.findElement(By.xpath("//span[text()='Inicio']")).getText();
    console.log("Inicio de sesión exitoso como:", nombreUsuario);
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
  } finally {
    // Cierra el navegador al finalizar la prueba
    await driver.quit();
  }
})();

async function capturarPantalla(nombreArchivo) {
  const rutaAbsoluta = path.join(__dirname, nombreArchivo + '.png');
  try {
    await screenshot({ filename: rutaAbsoluta });
    console.log(`Captura de pantalla guardada como ${rutaAbsoluta}`);
  } catch (error) {
    console.error('Error al capturar pantalla:', error);
  }
}
