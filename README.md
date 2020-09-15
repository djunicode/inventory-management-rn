<h1 align="center">Inventory Management Web</h1>

<h4 align='center'> Repository for the Unicode 2019 - 2020 project Inventory Management.</h4>

## File Structure

```
.
├── README.md
├── android
├── ios
├── src/ -> React Native workspace
  ├── screens  -> screen lvl components
  ├── controllers -> business logic
  ├── config -> configuration file e.g colors etc
  ├── components -> helper components
└── package.json
```

## Technology Stack

#### Frontend

- React Native 0.61+

## Features

1. **Signup and Authentication (Employees):**  

   - Signup is defined in such a way that **only the owner/manager of the shop can add new employees**.  It requires full name of the employee, their email-address, age, gender and password to facilitate their login.

   - Editing personal details of employee as well as deleting them is incorporated .The user logs in with their email id and password.

2. **Graphs and Profit:**  

   - The first graph shows the monthly earnings or expenditure, chosen by a dropdown. 
   - The second graph shows the same for each product in the inventory. Both the graphs can be zoomed in or out, to show/hide extra data. 

3. **Inventory and Expiry Display:**  

   - In the Inventory tab, the user can check all products present in the shop, their respective quantity and their price in an elegant tabular format .
   - The user can also edit the status of the products like their count ,buying and selling price , expiry date and their critical limit. 
   - In this tab, the user can also view the products which are going to expire within next 3 days and thus, help the user take necessary action and avoid unnecessary losses.

4. **Transactions and Transaction History:**
   - Transaction history is created every time the user purchases or sells the product. A PDF file of transaction is generated at each transaction which can be downloaded and viewed .

      - **Buying :** 
        - User gives input about name of product, their quantity and the price at which the product is being bought. Expiry date can also be given as input in case of perishable products.

     - **Selling :** 
        -  User gives input about name of product, their quantity and the price at which the product is being sold. 

     - **The Transaction History** 
        - It can also be viewed in this tab, - Product transacted, Number of items, their price and the type of transaction (Buy/Sell) is displayed in tabular form.

## Screenshots

### Login Page and Register Page

<div style="float:right">
<img src="https://user-images.githubusercontent.com/53833059/93132869-f9673d80-f6f3-11ea-8248-b3533b964b8d.jpg" width="350" title="Login Page" hspace=20>

<img src="https://user-images.githubusercontent.com/53833059/93132874-fa986a80-f6f3-11ea-9fa0-a19d31338df7.jpg" width="350" title="Register" hspace=20>
</div>

<br/>

### Profile Page and Home Page
<div style="float:right">
<img src="https://user-images.githubusercontent.com/53833059/93132872-f9ffd400-f6f3-11ea-9cd2-53cfe98839f7.jpg" width="350" title="Profile Page" hspace=20>

<img src="https://user-images.githubusercontent.com/53833059/93132865-f8cea700-f6f3-11ea-90bb-0eb9738917a8.jpg" width="350" title="Home Page" hspace=20>
</div>

<br/>

### Add Employee Page and Employee List

<div style="float:right">
<img src="https://user-images.githubusercontent.com/53833059/93132882-fc622e00-f6f3-11ea-899a-22a9d268236f.jpg" width="350" title="Add Employee" hspace=20>

<img src="https://user-images.githubusercontent.com/53833059/93132885-fcfac480-f6f3-11ea-8fdf-91314440de9a.jpg" width="350" title="Employee List" hspace=20>
</div>

<br/>

### Buy and Sell

<div style="float:right">
<img src="https://user-images.githubusercontent.com/53833059/93132883-fc622e00-f6f3-11ea-9b7d-1c3857b7e2f7.jpg" width="350" title="Buy" hspace=20>

<img src="https://user-images.githubusercontent.com/53833059/93132876-fa986a80-f6f3-11ea-8af4-535174ce94a4.jpg" width="350" title="Sell" hspace=20>
</div>

<br/>

### Transactions and Side Drawer

<div style="float:right">
<img src="https://user-images.githubusercontent.com/53833059/93132881-fbc99780-f6f3-11ea-8c52-d8543c3be019.jpg" width="350" title="Transactions" hspace=20>

<img src="https://user-images.githubusercontent.com/53833059/93132878-fb310100-f6f3-11ea-8191-66f63d6e3215.jpg" width="350" title="Side Drawer" hspace=20>
</div>

<br/>

### Inventory List Screen and Expiry Screen

<div style="float:right">
<img src="https://user-images.githubusercontent.com/53833059/93132866-f9673d80-f6f3-11ea-9109-2a8b30e84603.jpg" width="350" title="Inventory List" hspace=20>

<img src="https://user-images.githubusercontent.com/53833059/93132864-f79d7a00-f6f3-11ea-989e-7d42c20ec80d.jpg" width="350" title="Expiry" hspace=20>
</div>

### Splash Screen
<div style="float:right">
<img src="https://user-images.githubusercontent.com/53833059/93132880-fb310100-f6f3-11ea-886f-31ab73d2aeca.jpg" width="350" title="Splash Screen" hspace=20>
</div>


## Team

#### Developers

1.  Nirali Parekh
2.  Jinit Jain
3. Tejas Ghone
4.  Naman Lad

#### Mentors

1. Dhruv Bhagadia
2.  Nishant Nimbare
3.  Yash Javeri

## Build Instructions

```bash
  npm install
  npm start
```

## Development Instructions

1. We have configured the precommit hook for frontend following the `eslint airbnb` guidelines along with `prettier` code formatting. So make sure to follow the above guideline otherwise code will not be commited.
2. Please follow the directory structure for React JS.

## LICENSE

> MIT License
>
> Copyright (c) 2020 Unicode
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
