const{test,expect} = require('@playwright/test')   //imprting test and expect annotations
const { AsyncLocalStorage } = require('async_hooks')

test ('network interception by abort',async ({browser})=>
{
    
   //here we are aborting network calls which are used to load images in the webpage.
   //But other scenarios can also be aborted. for exp: aborting calls to load css in the web page, or to bring server down and validate server down message display
    const context= await browser.newContext();
    const page=  await context.newPage();
    page.route('**/*.{jpg,jpeg,png}',route =>route.abort()); //this syntax will abort all the api calls that are made to load images, **/*.{jpg,png}  is used to block any url endpoints that ends with png or jpg. this urls basicall are used by api to load images in the we pages. 
    const userName= page.locator('input#username');  //storing the username element in a global variable which can be used multiple times throughout the class
    const signinBtn= page.locator('#signInBtn');
    const cardTitles= page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
    await userName.fill("rahulshettyacademy");  //fill() is for typing ; //typing icorrect username now to generate error message test case
    await page.locator('input#password').fill("learning");
    await signinBtn.click();
    await page.pause();
    console.log(await cardTitles.first().textContent()); //locator used traversing from parent to child; first() method used to select the first matching css as the css has 4 matching element .
    console.log(await cardTitles.nth(1).textContent());  //nth() is used to select the required matching element csss from the index(here we need 2nd element so used index 1)
    console.log(await cardTitles.last().textContent());  //first() method used to select the last matching css .
    const allTitles= await cardTitles.allTextContents(); //allTestContents() method is used to fetch array of multiple element texts of all the matching elements of the css.npx playwright
    console .log(allTitles);

})
test ('playwright listeners',async ({browser})=>
{
    //playwright has listeners which listens to any request or response events triggered through out the tets automation. 
    //for example if we want to log all the request urls that are triggered or all the status codes when any response event is triggered, we can do it with playwright page.on mechanism
   const context= await browser.newContext();
    const page=  await context.newPage();
    page.route('**/*.{jpg,jpeg,png}',route =>route.abort()); //this syntax will abort all the api calls that are made to load images, **/*.{jpg,png}  is used to block any url endpoints that ends with png or jpg. this urls basicall are used by api to load images in the we pages. 
    const userName= page.locator('input#username');  //storing the username element in a global variable which can be used multiple times throughout the class
    const signinBtn= page.locator('#signInBtn');
    const cardTitles= page.locator(".card-body a");
    page.on('request', request=>console.log(request.url()));// log all the request urls that are triggered 
    page.on('response', response=>console.log(response.url(),response.status()));//log all the response urls and status codes when any response event is triggered
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
    await userName.fill("rahulshettyacademy");  //fill() is for typing ; //typing icorrect username now to generate error message test case
    await page.locator('input#password').fill("learning");
    await signinBtn.click();
    await page.pause();
    console.log(await cardTitles.first().textContent()); //locator used traversing from parent to child; first() method used to select the first matching css as the css has 4 matching element .
    console.log(await cardTitles.nth(1).textContent());  //nth() is used to select the required matching element csss from the index(here we need 2nd element so used index 1)
    console.log(await cardTitles.last().textContent());  //first() method used to select the last matching css .
    const allTitles= await cardTitles.allTextContents(); //allTestContents() method is used to fetch array of multiple element texts of all the matching elements of the css.npx playwright
    console .log(allTitles);

})
