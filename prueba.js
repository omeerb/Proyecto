const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ejemplo() {

  let opciones = new chrome.Options();

  opciones.addArguments('--disable-notifications');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(opciones).build();

  try {

    await driver.get('https://www.facebook.com');

  
    await driver.wait(until.elementLocated(By.name('email')), 10000);

  
    await driver.findElement(By.name('email')).sendKeys('tu_correo_electronico');
    await driver.findElement(By.name('pass')).sendKeys('tu_contraseña', Key.RETURN);

    await driver.wait(until.elementLocated(By.id('u_0_b')), 10000);

   
    let nombreUsuario = await driver.findElement(By.xpath("//span[text()='Inicio']")).getText();
    console.log("Inicio de sesión exitoso como:", nombreUsuario);
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
  } finally {
  
    await driver.quit();
  }
})();