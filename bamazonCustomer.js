// GLOBAL VARIABLES
// --------------------------------------------------------------------------

var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "outman123",
    database: "bamazon_db"

});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

// FUNCTIONS
// ----------------------------------------------------------------------

var start = function() {
    // Displays the table before the selection is made
    var query = "SELECT * FROM products";
    connection.query(query, function(err, results) {
        if (err) throw err;
        var columns = columnify(results, {
            columnSplitter: '|'
        });
        console.log(columns);
         inquirer.prompt([
         {

            type: "input",
            message: "What is the ID of the product you want to buy?",
            name: "id",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }

        },

        {
            type: "input",
            message: "how many units of the product they would like to buy",
            name: "units",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {
    	// assigns variables to answers
        var id = answer.id;
        var units = answer.units;
        var query = "SELECT * FROM products WHERE ?";
        // search for id
        connection.query(query, {
            item_id: id
        }, function(err, results) {
            console.log(results[0].stock_quantity);
            if (err) throw err;
            if (results[0].stock_quantity > 0 || results[0].stock_quantity > units) {
                var sales = results[0].product_sales;
                var price = results[0].price;
                var salesOfUnits = price * units;
                subtractStock(parseInt(results[0].stock_quantity), parseInt(units), id, sales, price);
                getDepartment(results[0].department_name, salesOfUnits);
            } else{
            	console.log("Insufficient quantity!");
            	start();
            }
        });
    }); // then function completed
   }); // connection query
} // end of start function

function subtractStock(quantity, units, itemId, prevSales, price) {
    var newStock = quantity - units;
    var salesOfUnits = (units * price);
    var additionalSales = prevSales + salesOfUnits;
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{
        stock_quantity: newStock,
        product_sales: additionalSales
    }, {
        item_id: itemId
    }], function(err, results) {
    	// start();

    });

}

function getDepartment(name, units){
        var departName = name;
        var query = "SELECT total_sales FROM departments WHERE ?";
    connection.query(query,{ department_name: departName }, function(err, results){
        if(err) throw err;
        var additionalTotalRev = units + parseInt(results[0].total_sales);
        var query = "UPDATE departments SET ? WHERE ?"
        connection.query(query,[{total_sales: additionalTotalRev},{department_name:departName}], function(err, results){
            if(err) throw err;

    var query = "SELECT * FROM departments";
    connection.query(query, function(err, results) {
        if (err) throw err;
        var columns = columnify(results, {
            columnSplitter: '|'
        });
        console.log(columns);
    });


        }); // end of the second connectin query
    }); // end of the first connection query
} // end of department function











// MAIN FUNCTIONS 
// ---------------------------------------------------------