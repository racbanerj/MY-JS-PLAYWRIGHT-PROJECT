const { test,expect } = require('@playwright/test');
 
 
test('@QW Security test request intercept', async ({ page }) => {
 
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("rachanabanerjee66@gmail.com");
    await page.locator("#userPassword").fill("Delilah@1312");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
        //here interception happened on request level with continue method instead of fulfil method. 
        //here we are interception the request 'url' before it reaches server unlike response interception where we intercept the received response by manipulating the response and sending to browser
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
 
 
 
 
 
 
 
 
})