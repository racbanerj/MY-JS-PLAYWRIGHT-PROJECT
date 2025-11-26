
/*here we are keeping logn and order creation API code in before all block so that the apis run before executing the testcases
 of post order creation.
 in present scenario we logged in created an order by API code and validated the order list through UI test
 test.beforeAll block runs once before executing all the tetscases
 test.beforeEach block runs before executing each and every test case */
const {test, expect, request} = require('@playwright/test');

const { APiUtils } = require('./utils/APiUtils');
const loginPayLoad = {userEmail:"rachanabanerjee66@gmail.com",userPassword:"Delilah@1312"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
 
 ///Users/rachanabanerjee/Documents/SDET_STUDIES/MY-JS-PLAYWRIGHT-PROJECT/tests/Utils/APiUtils.js
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
