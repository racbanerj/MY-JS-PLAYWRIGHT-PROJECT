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
test ('page playwright test',async ({browser,page})=>
{
    //playwright code
    //test.only is used when you want to run only that test function form that file
    // in java script ()=> can be used to create a function without name to keep the code lighter(anonymous function)
    //newContext and newPage method is default, so we we declare the fixture called "page" inside the funcion parameter, it will work as same as the above function. "Page" ficture is a default variable of playwrite which contains the mechanism of newcontext and newPgae

   
    
    const userName= page.locator('input#username');  //storing the username element in a global variable which can be used multiple times throughout the class
    const signinBtn= page.locator('#signInBtn');
    const cardTitles= page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log (await page.title());
    //await  expect(page).toHaveTitle("Google"); //expect() is for verifying
    await userName.fill("rachana");  //fill() is for typing ; //typing icorrect username now to generate error message test case
    await page.locator('input#password').fill("learning");
    await signinBtn.click();
    console.log(await page.locator("[style='display: block;']").textContent());  
    await expect(page.locator("[style='display: block;']")).toContainText('Incorrect'); // validating error text message which is displayed for few seconds
    await userName.fill("");  //fill("") is used to erase the existing texts written on the textbox already
    await userName.fill("rahulshettyacademy"); //typing correct username this time
    await signinBtn.click(); //user should be able to login successfully now
    console.log(await cardTitles.first().textContent()); //locator used traversing from parent to child; first() method used to select the first matching css as the css has 4 matching element .
    console.log(await cardTitles.nth(1).textContent());  //nth() is used to select the required matching element csss from the index(here we need 2nd element so used index 1)
    console.log(await cardTitles.last().textContent());  //first() method used to select the last matching css .
    const allTitles= await cardTitles.allTextContents(); //allTestContents() method is used to fetch array of multiple element texts of all the matching elements of the css.npx playwright
    console .log(allTitles);



});
test ('dropdown checkbox web popup tests',async ({browser,page})=>

{
    const userName= page.locator('input#username');  //storing the username element in a global variable which can be used multiple times throughout the class
    const signinBtn= page.locator('#signInBtn');
    const password = page.locator('input#password');
    const cardTitles= page.locator(".card-body a");
    const dropdown = page.locator("select.form-control");
    const userTypCheckbox =  page.locator(".checkmark"); //admin or user
    const doclink= page.locator ("[href*=documents-request]");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
    //await  expect(page).toHaveTitle("Google"); //expect() is for verifying
    await userName.fill("rachana");  //fill() is for typing ; //typing icorrect username now to generate error message test case
    await password.fill("learning");
    await dropdown.selectOption("consult");
    await userTypCheckbox.last().click();
    await page.locator("div #okayBtn").click();
    console.log(await  page.locator(".checkmark").last().isChecked()); //isChecked() returns boolean value and it is used to print if it is checked(true or false). This is not for assertion.
    //await page.pause(); //to pause and check visually what option was selected
    await expect (userTypCheckbox.last()).toBeChecked();//to assert that the specific checkbox is selected
   
    await page.locator("#terms").click();
    await     expect(  page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck(); //uncheck() is used to uncheck the checkboxes explicitly in playwright
     expect ( await page.locator("#terms").isChecked()).toBeFalsy(); // tobefalsy() asserts that the ischecked() results is false.This way we can assert that a checkbox is unchecked.
                                                                     // await is mentioned inside the expect(), not outside like other lines. why? 
                                                                     //because await is only required where any action is happening. Here ischecked() is an action inside the expect() ,.. expect(ischecked())..hence await is required
                                                                     //in the above line  action is done outside expect()... expect().tobechecked()
 //in Playwright, there is no method called isChecked() directly on the page object, but it does exist on Locator. so to use ischecked() we have to use it with the locator, not with the object
    await expect (doclink).toHaveAttribute("class","blinkingText"); //toHaveAttribute() is used to asert that a blinking text is available with the class "blinking text"


});

test ('child windows handling',async ({browser})=>
{
    //when a new page is opened from a yper link , we have to feed that information in a new page variable
    //in the below lines of code , we are using two lined asynchronusly i.e. waiting for a new page and clicking on the hyper link to get the new page is happening parallelly 
    // two lines of code is working as an array and returning a new page to the [newPage] variable in array format
    //child pages are always returned in array format as multiple pages can be opened 

    const context = await browser.newContext();
    const page =  await context.newPage();
    const doclink= page.locator ("[href*=documents-request]");
  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage]=await Promise.all(
        [
           context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
           doclink.click(),
        
        ])//new page is opened
        const newPageheading =  newPage.locator(".red");
        const text= await newPageheading.textContent();
        console.log(text);
        const arrayText= text.split("@"); //splitting the retreived text by the character @
        const domain=arrayText[1].split(" ") [0]; //taking the 1nth index and splitting that by space and storing the 0th index from the retreived value into domain variable
        console.log(domain);
        await page.locator("input#username").fill(domain); //grabbing the text from page 2 and typing the text in page 1 username feild
        //await page.pause();
        console.log(await page.locator("input#username").textContent());//textContent() will not grab the text which is typed by the user because the text is not attached to DOM
        console.log(await page.locator("input#username").inputValue())// inputValue() is used to grab texts written by the user on runtime


});

test.only ('Playwright special locators', async( {browser,page})=>
    {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Employed").check();/*getbyLabel is a special locator of playwright to find any element which has a text 
                                          with the tagname 'label'.  
                                          we can also click on the element/checkbox/radion button nearest to that label
                                          check() is also a special func of playwright to check checkboxes instead of click() */


    await page.getByLabel("Check me out if you Love IceCreams!").click(); 
    await page.getByLabel("Gender").selectOption("Female"); //selectOption method will only work on those dropdown elemnts which has select tag in dom
    await page.getByPlaceholder("Password").fill("abcnp123"); /*getByPlaceholder() is a special locator of playwright which
                                             is applicable only when dom has an attribute called 'placeholder' for the element. */

    await page.getByRole("button", {name:'Submit'}).click(); /*getByRole is a special playwright locator where we can 
                                      select a element by its role(role can be understood by tagname or class),here we are selecting 
                                      button role and out of all buttons in the page, type the name of that button to specifically select that element. */
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible(); /*getbyText() is a playwright locator to 
                                       grab an element which has a visible text on the webpage.*/


   await page.getByRole("link",{name: "Shop"}).click();  //clicking on a link by getByrole locator where the tagname in dom is @(i.i a link)                                    
   //await page.locator("app-card").filter({hasText: "Samsung Note 8"}).getByRole("button").click(); 
                                       /* first using tagname as 
                                        CSS  locator to get all the visible products , the filtering the specific product by 
                                        hasText filter of playwright -> then click on add button by getByRole locator on the same line 
                                        of code */
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();                                     
    await page.getByText("  Checkout ( 1 ) ").isVisible();                            

});