const exceljs= require('exceljs'); //importing exceljs library

//here moto is to read an excel file from the system and print it.
//first access the file(worksbook) and tracerse to each row -> cell and extract the value of each cell  and print
async function excelupload()
{
 const workbook=new exceljs.Workbook();//creating workbook object 
 await workbook.xlsx.readFile("/Users/rachanabanerjee/Downloads/excelJSdownload.xlsx");//providing workbook file path to read
 const worksheet= workbook.getWorksheet('Sheet1');//creating worksheet obj to reach till the specific worksheet of the workbook
 worksheet.eachRow((row,rownumber)=>         //outer for loop to iterate through each row
    row.eachCell((cell,columnNumber)=>        //inner for loop to interate through each cell of the rows
 console.log(cell.value)                     //printing each cell value
    )
 )
}
excelupload();         //since all the code is mentioned inside the excelupload function, we have to call it
                       /*we are mentioning the code inside a function because we need to use 'await' while workbook obj is reading the workbook file from 
                       the given path.Otherwise it may try to access the row even before file reading is complete. 
                       To use 'await', we need to use 'async' with the method name. hence everything is written inside the method
                       */
//node ./tests/excelDemo.js
//node /Users/rachanabanerjee/Documents/SDET_STUDIES/MY-JS-PLAYWRIGHT-PROJECT/tests/excelDemo.js

async function validateCellvalueAndPrintCoordinates_and_replace()
{   
    let output= {row:-1,column: -1}; // declaring output object here t store the coordinates of a specific cell value, declaring here becuase cell value coordinates will lose life inside the for loop
    const workbook=new exceljs.Workbook();
 await workbook.xlsx.readFile("/Users/rachanabanerjee/Downloads/excelJSdownload.xlsx");
 const worksheet= workbook.getWorksheet('Sheet1');
 worksheet.eachRow((row,rownumber)=>        
    row.eachCell((cell,columnNumber)=>    
        {    
              if(cell.value === 'Apple')
              {
                console.log("Apple is found; row number is : " + rownumber+ " and column number is : " + columnNumber);
                output.row=rownumber;  //storing the row number in output object so that we can replace the value on the same coordinates
                output.column=columnNumber; //storing the column number in output object so that we can replace the value on the same coordinates
              }
        }
    )
     
 )

const newcell= worksheet.getCell(output.row,output.column); //storing the coordinate of the cell value that needs to be replaces in a newcell variable obj
newcell.value="Iphone"; //this will replace existing value with 'iphone' 
await workbook.xlsx.writeFile("/Users/rachanabanerjee/Downloads/excelJSdownload.xlsx");//workbook to write workbook from the given path
 
}
validateCellvalueAndPrintCoordinates_and_replace();