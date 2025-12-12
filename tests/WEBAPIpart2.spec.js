//we usually store login token in local storage or in a variable and use that for other testcases to bypass login scenario
/*however there are some apps(more secured) where login session has multiple properties along with token and saving all those attributes 
is tedious
In that case we have to logon once through UI and  can use an inbuilt playwright method which saves all the login state and saves in a json file
we can fee that json into apicontext(json)  as a parameter .
 so that whenever a new context is opened with apiContext(), all the login states are feeded into that context  */

 const {test,expect}= require('@playwright/test');
 let webContext;
 const fakePayLoadOrders = { data: [], message: "No Orders" }; //creating a fake payload to insert as response body while intercepting the network api call
 test.beforeAll( async({browser})=>
{
  const context=await browser.newContext();
  const page=await context.newPage();
  const userName=page.locator("#userEmail");
  const password= page.locator("#userPassword");
  const loginbtn= page.locator("#login");
await page.goto("https://rahulshettyacademy.com/client");

await userName.fill("rachanabanerjee66@gmail.com");
await password.fill("Delilah@1312");
await loginbtn.click();
await page.waitForLoadState('networkidle');
await context.storageState({path: 'state.json'});  //saving the storagestate as a json file, mentioning the file name and the file saves in test folder level of the project
webContext=await browser.newContext({storageState: 'state.json'});  //creating a new context and injecting the json strings into it.


})
test ("intercept network calls", async ({})=>
{

    //here goal is to intercept the network, i.e. faking api response which is received from order list page in order to validate the no orders message while no orders are present in the order list page.
const page=await webContext.newPage();  //calling a new page with webcontext reference which has storagestate details , no page fixture s required here as we are creating page dynamically here
await page.goto("https://rahulshettyacademy.com/client");

 /*here page.route is a method which accepts 2 arguments. 
 first argument is the post call endpoint url while clicked on "orders" page.
 second argument is a method again, here named as route, it can be named anything, which intercepts the network response*/
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());//fetching the response received  from the first argument of page.route method i.e. from the post call endpoint url and storing in "response" variable.
      let body = JSON.stringify(fakePayLoadOrders); //format the fakepayload variable into json format as route.fulfill method will accept body as json only and fakepayload variable value is initially a javascipt object.
      route.fulfill(            //fulfill method will take the response and intercept it with fake body and reach till browser to render data on front end
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click(); //clicking on orders page and the above network intercepting method which was in listening mode came into action
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); //waitinf for respnse before extraing the message from the page in next line
 
  console.log(await page.locator(".mt-4").textContent());




});
