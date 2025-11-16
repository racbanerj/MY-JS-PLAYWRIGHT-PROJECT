// the moto of this test case is to login to the app and select a producr-> add to cardt-> validate the product is added in cart-> make the purchase -> validate order id
/*
LOGIC of the testcase
login to app
select the product by grabbing all products in an array variable -> use for loop to select the preferred product -> add to cart
wait for the cart products page is loaded fullu  by waitfor() func as auto waiting doesnot support isVisible() func in playwright
validate that the product is added in cart by checking if the product name is present by isvisible() func
add address, validate email id  and checkout in checkout page
validate order confirmation note and order id
validate the order id is present in order history page


*/
const {test,expect}= require('@playwright/test');
const email="rachanabanerjee66@gmail.com"
test ("purchase order id validation", async ({browser,page})=>
{
const userName=page.locator("#userEmail");
const password= page.locator("#userPassword");
const login= page.locator("#login");
const products= page.locator(".card-body"); //grabbing all products in an array variable
const prductName= "ZARA COAT 3";

await page.goto("https://rahulshettyacademy.com/client");
await userName.fill(email);
await password.fill("Delilah@1312");
await login.click(); //logged in
await page.locator(".card-body").last().waitFor();//wait till all the products are loaded 
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
