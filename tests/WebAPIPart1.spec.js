
/*here we are keeping logn and order creation API code in beforeAll block so that the apis run before executing the testcases
 of post order creation.
 in present scenario we logged in  and created an order by API code and validated the order list through UI test
 test.beforeAll block runs once before executing all the tetscases
 test.beforeEach block runs before executing each and every test case */
const {test, expect, request} = require('@playwright/test'); //request librray is imported for playwright API testing

const { APIutils } = require('./Utils/APIutils');   //importing utils class
const loginPayLoad = {userEmail:"rachanabanerjee66@gmail.com",userPassword:"Delilah@1312"}; //fetch it from browser network tab
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();   //for api testing it should be request.newContext().   for UI testing it is browser.newContext()
                                                //we will not create page here after creating context because page is not required for api testing.
                                                //directly proceed for post call 
   const apiUtils = new APIutils(apiContext,loginPayLoad);  //creating obj of utils class with parameterised constructor
   response =  await apiUtils.createOrder(orderPayLoad);  //createOrder method of utils class needs orderPayload as argument and returns response which has token and orderid
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );  //using java script, injecting token received from getToken and createOrder() function into browser local storage for testig scenarios

await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();//going to myorders list page directly as order is already placed by api in beforeAll code block


 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId)) //orderID is fetched fro response which is returned by createOrder() method of utils class

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
