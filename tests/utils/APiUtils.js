class APIutils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
         this.loginPayLoad = loginPayLoad;
           /*declaring a context freshly in the test itslef in test class and injecting that context
         into utils class constructor ,so that whenever the utils class objects are called from test class, the api context is feeded from the test class to utils object*/
        //this.apiContext is utils class variable and apicontext from test class is assigned to utils class variable through constructor
        //similarly using login payload with the constructor so whenever utils class object is created, login payload details is alos attached with it
        //we can use this  login payload for every object becuase login is mandatory/common for every test case  
        
    }
 
    async getToken() 
    {                              // apicontext is being fetched from test class as this.context (util class variable is assigned with test class apicontext value
         
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
            data: this.loginPayLoad
            }); //expect(loginResponse.ok()).toBeTruthy(). -- asserting the login response was 200(ok)
            // 200, 201 //get token method is created and saved in utils class to get the session token and save it in the browser 
                //post method containing api end point and body containing data (payload)
        const loginResponseJson = await loginResponse.json();//parsing the response to json format
        const token = loginResponseJson.token; //extracting token from the json response
        console.log(token);
        return token;
        
    } //returned token should be injected to browser for tests through javascript

 
    async createOrder(orderPayLoad) {
        let response = {};  //creating javascript object 
        response.token = await this.getToken();  //creating 'token' property for response obj  and feeding the token value fetched from getToken() method

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });//here post call takes end point url in 1st argument and 2 parameters in 2nd arguments i.e. headers for Authorization token and data(payload)
            //token for authorization is fetched from previous method getToken() 
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders;
        response.orderId = orderId;  //in javascript we can assign properties. Here we are assigning propertiy as orderID for response object.
                                 //and assigning the orderID that is fetched  from response json  into the orderID property of response obj

 
        return response;  //this response obj holds order id and token
    }
}
 
module.exports = { APIutils };   //mentioned for  export permission so that test classes can import this utils class