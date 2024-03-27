const { test, expect, chromium, firefox, webkit } = require('@playwright/test');
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

test("Test Scenario 1", async () => {
    const capabilities = {
        'browserName': 'pw-chromium',
        'browserVersion': 'latest',
        'LT:Options': {
            'build': 'Playwright JS Final Build',
            'name': 'Playwright Test Scenario 1',  
            'user': 'amreshn45',
            'accessKey': '2ZmUaa9Q7tiV3LsIb20Qy4zhQe0aK5sjq1hyBP1GCfgvVIycDm',
            'network' : true,
            "video": true,
            "platform": "Windows 10",
            "tunnel": true,
            "console": true,
            'playwrightClientVersion': playwrightClientVersion
        }
    }

    const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
    
    const page = await browser.newPage();
    const textMessage = "Welcome to LambdaTest";
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await expect(page).toHaveTitle("Selenium Grid Online | Run Selenium Test On Cloud");
    await page.locator("[href*='simple-form-demo']").click();
    await expect(page.url()).toContain("simple-form-demo");
    await page.locator("[placeholder='Please enter your Message']").fill(textMessage);
    await page.locator("#showInput").click();
    const actualMessage = await page.locator("#message").textContent();
    
    try {
        expect(actualMessage).toBe(textMessage);        
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
        await teardown(page, browser)
      } catch (e) {
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
        await teardown(page, browser)
        throw e
      }
})

test("Test Scenario 2", async () => {
    const capabilities = {
        'browserName': 'pw-chromium',
        'browserVersion': 'latest',
        'LT:Options': {
            'build': 'Playwright JS Final Build',
            'name': 'Playwright Test Scenario 2',  
            'user': 'amreshn45',
            'accessKey': '2ZmUaa9Q7tiV3LsIb20Qy4zhQe0aK5sjq1hyBP1GCfgvVIycDm',
            'network' : true,
            "video": true,
            "platform": "Windows 10",
            "tunnel": true,
            "console": true,
            'playwrightClientVersion': playwrightClientVersion
        }
    }

    const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
    
    const page = await browser.newPage();
    const requiredValue = 95;
    const defaultValue = 15;
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await expect(page).toHaveTitle("Selenium Grid Online | Run Selenium Test On Cloud");
    await page.locator("[href*='drag-drop-range-sliders-demo']").click();
    expect(page.url()).toContain("drag-drop-range-sliders-demo");
    await page.locator("[value='"+ defaultValue.toString() +"']").click();
    let successRange;
    for( let i=0; i<=requiredValue-defaultValue ; i++){
        await page.keyboard.press('ArrowRight');
        if(await page.locator("#rangeSuccess").textContent() === requiredValue.toString()){
            successRange = await page.locator("#rangeSuccess").textContent();
            expect(successRange).toBe(requiredValue.toString());
            break;
        }
    }
    
    try {
        expect(successRange).toBe(requiredValue.toString());        
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Success Range matched' } })}`)
        await teardown(page, browser)
      } catch (e) {
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
        await teardown(page, browser)
        throw e
      }
})

test("Test Scenario 3", async () => {
    const capabilities = {
        'browserName': 'pw-chromium',
        'browserVersion': 'latest',
        'LT:Options': {
            'build': 'Playwright JS Final Build',
            'name': 'Playwright Test Scenario 3',  
            'user': 'amreshn45',
            'accessKey': '2ZmUaa9Q7tiV3LsIb20Qy4zhQe0aK5sjq1hyBP1GCfgvVIycDm',
            'network' : true,
            "video": true,
            "platform": "Windows 10",
            "tunnel": true,
            "console": true,
            'playwrightClientVersion': playwrightClientVersion
        }
    }

    const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`);
    
    const page = await browser.newPage();
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await expect(page).toHaveTitle("Selenium Grid Online | Run Selenium Test On Cloud");
    await page.locator("[href*='input-form-demo']").click();
    expect(page.url()).toContain("input-form-demo");
    const nameField = page.locator("#name");
    const email = page.locator("#inputEmail4");
    const password = page.locator("#inputPassword4");
    const company = page.locator("#company");
    const website = page.locator("#websitename");
    const city = page.locator("#inputCity");
    const address1 = page.locator("#inputAddress1");
    const address2 = page.locator("#inputAddress2");
    const state = page.locator("#inputState");
    const zipCOde = page.locator("#inputZip");
    const country = page.locator("[name='country']");
    const submitButton = page.locator("text='Submit'");


    await submitButton.click();
    
    const validationMessage = await nameField.evaluate((element) => {
        const input = element;
        return input.validationMessage;
    });

    if(browser.browserName == "webkit"){
        expect(validationMessage).toBe("Fill out this field");
    }
    else{
        expect(validationMessage).toBe("Please fill out this field.");
    }
    

    await nameField.fill("Sachin");
    await email.fill("abc@gmail.com");
    await password.fill("sachinSaga@#");
    await company.fill("Arjun and Co.");
    await website.fill("www.srtarj.com");
    await country.selectOption("India");
    await city.fill("Mumbai");
    await address1.fill("Wankhade");
    await address2.fill("Navi Mumbai");
    await state.fill("Maharashtra");
    await zipCOde.fill("6000145");
    await submitButton.click();

    await page.waitForSelector("text='Input form validations'");
    const successMessage = await page.locator("[class*='success-msg']").textContent();
    expect(successMessage).toBe("Thanks for contacting us, we will get back to you shortly.");
    
    try {
        expect(successMessage).toBe("Thanks for contacting us, we will get back to you shortly.");   
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Success Message matched' } })}`)
        await teardown(page, browser)
      } catch (e) {
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
        await teardown(page, browser)
        throw e
      }
})

async function teardown(page, browser) {
    await page.close();
    await browser.close();
}