# bamazon
Date Created: 05/15/2017
# GENERAL USAGE NOTES
-----------------------------------------------------------------
- Users will be able to update stocks and number of sales for products, enter data for new products and view product sales of departments. 

Included: All bamazon js files: bamazonCustomer, bamazonManager, and bamazonSupervisor in a js file format.

INSTALLING NPM MODULES
-----------------------------------------------------------------
Uses the mysql, inquirer and columinfy to output, process and save the data. 

BAMAZONCUSTOMER
-----------------------------------------------------------------
Takes an order updates the stock and the total number of sales for that product. It will also update the department total number of sales. 

BAMAZONMANAGER
-----------------------------------------------------------------
Gives the user the selection to see products for sale, where there is low inventory, add more inventory and add a new product. These are all given as options to the list. These are all done using mysql commands.

BAMAZONSUPERVISOR
-----------------------------------------------------------------
Gives the user choices to view products sales by department and create a new department. Use mysql aliases to show a pseudo column to the user for total profit. Creating a new department follows the same syntax as the creating a new product in the BAMAZONMANAGER file. 
