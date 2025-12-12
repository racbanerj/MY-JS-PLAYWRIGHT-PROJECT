const {test,expect} = require('@playwright/test');

test ('popup validations', async({browser,page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://www.google.com/")
//await page.goBack();//goes back to previous page
//await page.goForward(); //goes forward to next page
await expect(page.locator("#displayed-text")).toBeVisible(); // tobeVisible is an assertion method which returns boolean value
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();  //toBeHidden asserts that the element is hidden in webpage


page.on('dialog', dialog => dialog.accept()); /*page.on keeps an eye on any event on the webpage(dialog box in this case), 
                                              throughout the test, and when dialog box is opened, we can accept() or reject() the dialog.
                                              so this is used to handle javascript popups*/

await page.waitForLoadState("networkidle");
await page.locator("#confirmbtn").click();//after clikcing on this button, dialog box will appear

await page.locator("#mousehover").hover(); //hover() is playwright inbuilt method for hovering over an element
const framepage= page.frameLocator("#courses-iframe"); //framelocator is playwright inbuilt locator for frames
                                                  //collecting the frame element and storing in a variable to use that as a page.

await framepage.locator("div a[href='#/all-access-subscription']:visible").nth(1).click();//clicking on an element inside frame
                                         //if mathcing css has multiple hidden elements, we can filter out the visible one by concatinating :visible with the css
                                          
  const textcheck= await framepage.locator(".text-center .text-2xl").nth(0).textContent();//used nth because multiple mathcing elemets were visibe
  
  console.log(textcheck)  ;                                 
                                        
   })

test ('Screenshots', async({browser,page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect(page.locator("#displayed-text")).toBeVisible(); // tobeVisible is an assertion method which returns boolean value

await expect(page.locator("#displayed-text")).toBeHidden();  //toBeHidden asserts that the element is hidden in webpage
await page.screenshot({path: 'screenshot.png'}); //page.screenshot is playwright method to take screenshot  and path added here as location to store the screenshot
                                                //this is page level screenshot

await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'})  ;                                        
})


test.only ('visual comparison', async({page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

 expect(await page.screenshot()).toMatchSnapshot('landingPage.png'); // taking new screenshot and comparing it with existing screenshot 'landing.png'
                                                      //if landing.png i.e. previous screenshot doesnot exist, then for first time tets will fail and create a screenshot. And in second time test will pass and compare the new screenshot with the previous screenshot which now exists in the test class
                                                      

})

