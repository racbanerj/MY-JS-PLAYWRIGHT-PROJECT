//we usually store login token in local storage or in a variable and use that for other testcases to bypass login scenario
/*however there are some apps(more secured) where login session has multiple properties along with token and saving all those attributes 
is tedious
In that case we have to logon once through UI and  can use an inbuilt playwright method which saves all the login state and saves in a json file
we can fee that json into apicontext(json)  as a parameter .
 so that whenever a new context is opened with apiContext(), all the login states are feeded into that context  */

 const {test,expect}= require('@playwright/test');
 let webContext;
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
test ("purchase order id validation", async ({})=>
{
const page=await webContext.newPage();  //calling a new page with webcontext reference which has storagestate details , no page fixture s required here as we are creating page dynamically here
await page.goto("https://rahulshettyacademy.com/client");
const products=await page.locator(".card-body").last().waitFor();//wait till all the products are loaded 
const count= await products.count();

for (let i=0;i<count; ++i)
{
    if (await products.nth(i).locator("b").textContent() ===prductName)
    {
        //add to cart
        products.nth(i).locator("text= Add To Cart").click();
        break;
    }
}
await page.waitForLoadState("networkidle");
 await page.locator("[routerlink*='cart']").click();
 await page.locator("div li").first().waitFor();
//waiting for added products in cart to load before proceeding to next step 
//using waitfor() manually because autowait doesnot support isvisible() function in playwright yet
const boolCartproduct= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
 expect  (boolCartproduct).toBeTruthy();
 await page.locator("text=Checkout").click();
 await page.locator("[placeholder='Select Country']").pressSequentially("ind");  //presequentially() is used to type chars in the textbox one by one where there is a special keyboard handling on the pae
 const dropdown= page.locator(".ta-results");
 await dropdown.waitFor(); //waitinf gor dropdown to load
 const optionCount= await dropdown.locator("button").count(); //taking count of all the options appeared in auto suggestive droption after typing 'ind', to use in for loop
 for(let i=0;i<optionCount;i++)

 {
const text= await dropdown.locator("button").nth(i).textContent();
if(text === ' India')
{
    await dropdown.locator("button").nth(i).click(); //selected india
    break;

}
 }
 
 await expect( page.locator(".user__name [type='text']").first()).toHaveText(email); //confirming email id in checkout page

await page.locator(".btnn").click();//clicking on checkout
await expect ( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //validating order confirmation text
const orderId=await page.locator("label.ng-star-inserted").textContent();
console.log(orderId);

//validate order id in order history table

await page.locator("button[routerlink*= 'dashboard/myorders']").click();  //navigating to orders page

await page.locator("tbody").waitFor();
const orderrows=await page.locator("tbody tr"); //getting cound of all orders from order list
for(let i=0;i<await orderrows.count();++i) //finding my order 
{
const ordertext= await orderrows.nth(i).locator("th").textContent();
if(orderId.includes(ordertext))
{
await orderrows.nth(i).locator("button").first().click();

 console.log("Order found");
break;
}
}

await expect(page.locator(".title")).toHaveText(prductName);




});
