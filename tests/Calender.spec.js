const {test, expect}= require('@playwright/test');
 test ('calender handling', async({browser,page})=>
 {

const monthNumber = "6";
const date = "25";
const year = "2027"
const expectInput = [monthNumber,date,year];
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

await page.locator(".react-date-picker__inputGroup").click();  //clicking on calender element
await page.locator(".react-calendar__navigation__label").click(); //clicking on year
await page.locator(".react-calendar__navigation__label").click(); //again clicking on year to select preferred year
await page.getByText(year).click();//Selecting year
await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber-1)).click(); /*Selecting month. Here we are using monthnumber -1 because locator is 
                                                                                 fetching all months into an array, and array starts with 0. SO onth number 6 will match
                                                                                 with 5th elemnt in the array     */
 await page.locator ("//abbr[text()='"+date+"']").click(); //selecting date by xpath. we cannot use getByTest as there as multiple 15 in same webpage

await page.waitForLoadState("networkidle"); //waiting for updated dates to reflect in page

   const inputs= page.locator(".react-date-picker__inputGroup__input");
  
   for(let i=0;i<expectInput.length;i++)
    
 {
  const value = await inputs.nth(i).inputValue();// inputValue() Returns the value attribute of the input.Works only on elements that accept input
  expect(value).toEqual(expectInput[i]);

 }

  

 })

 
   
 
 
 
 
 
 
 
 
 
 
 
 
 
