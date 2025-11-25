const{test,expect} = require('@playwright/test')   //imprting test and expect annotations
const { AsyncLocalStorage } = require('async_hooks')
test ('wait playwright test',async ({browser,page})=>

{
    const userName=page.locator("#userEmail");
    const password= page.locator("#userPassword");
    const loginbtn= page.locator("#login");
await page.goto("https://rahulshettyacademy.com/client");

await userName.fill("rachanabanerjee66@gmail.com");
await password.fill("Delilah@1312");
await loginbtn.click();

//Eventhough playwright has auto waiting mechanism, it doesnot implement autowaiting in case of "alltextcontents() function. so it will throw error because the
// alltextcontents() will be called before the page loads all the content
//to resolve this, we will use the function  waitForLoadState("networkidle").
 // this function makes sure all the network calls are made (api service calls) and page is fully loaded, before going to the next step so the all texts contents are fetched without any error

const prodTitle= await page.locator(".card-body b").allTextContents();
console.log(prodTitle);

//sometimes waitForLoadState("networkidle") is flaky , so if it doesnot work , alternatively we can use another method waitFor() to wait for the element of that CSS to be loaded and then proceed for the next step

await page.locator("section #res").waitFor();// waitFor() will let the test wait till the element is loaded and then proceed for the next step
                                             // waitFor() will only work for css returning only one element

await page.locator("div button").last().waitFor(); //since waitFor() works only for single element , use last() so that if css has mathcing multiple elements, it will fetch only the last one

});