const{test,expect} = require('@playwright/test')   //imprting test and expect annotations
const { AsyncLocalStorage } = require('async_hooks')
test ('browser context playwright test',async function({browser})
{
    //playwright code
    
    const context =  await browser.newContext();  //newContext method helps to open a new instance of browser
                                                  //inside newContext method we can add parameters to inject cookies with which the brpwser will open
    const page= await context.newPage();          //newPage method creates new page after opening the browser 
    await page.goto("https://saucelabs.com/");
    //browser here is fixture/global default variable in playwright
    
    //step 2

});
test.only ('page playwright test',async ({browser,page})=>
{
    //playwright code
    //test.only is used when you want to run only that test function form that file
    // in java script ()=> can be used to create a function without name to keep the code lighter(anonymous function)
    //newContext and newPage method is default, so we we declare the fixture called "page" inside the funcion parameter, it will work as same as the above function. "Page" ficture is a default variable of playwrite which contains the mechanism of newcontext and newPgae

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log (await page.title());
    //await  expect(page).toHaveTitle("Google");
    await page.locator('input#username').fill("rachana");
    await page.locator('input#password').fill("learning");
    await page.locator('#signInBtn').click();;
    console.log(await page.locator("[style='display: block;']").textContent());
    await expect(page.locator("[style='display: block;']")).toContainText('Incorrect');

});