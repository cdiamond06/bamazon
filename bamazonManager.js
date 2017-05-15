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
    var query = "SELECT * FROM products";
    connection.query(query, function(err, results) {
        if (err) throw err;
        var columns = columnify(results, {
            columnSplitter: '|'
        });
        console.log("----------------------------------------------------------------");
        console.log(columns);
        console.log("----------------------------------------------------------------");
        start();
    });
});

// FUNCTIONS
// ----------------------------------------------------------------------------
var start = function() {

        var query = "SELECT * FROM products";
        connection.query(query, function(err, results) {
            if (err) throw err;
            inquirer.prompt({

                type: "list",
                message: "Choose which item you would like to execute?",
                name: "choice",
                choices: ["view-products-for-sale", "view-low-inventory", "add-to-inventory", "add-new-product"]

            }).then(function(user) {
                call = user.choice;

                switch (call) {

                    case "view-products-for-sale":
                        vpfs();
                        break;

                    case "view-low-inventory":
                        vli();
                        break;

                    case "add-to-inventory":
                        vti();
                        break;

                    case "add-new-product":
                        anp();
                        break;

                    default:
                        console.log("something went wrong")
                };
            });
        });
    }
    // view products for sale
function vpfs() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, results) {
        if (err) throw err;
        var columns = columnify(results, {
            columnSplitter: '|'
        });
        console.log("-----------------------------------------------------------")
        console.log(columns);
        console.log("-----------------------------------------------------------")
        start();
    });
};

function vli() {
    var query = "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ? ";
    connection.query(query, [0, 51], function(err, results) {
        if (err) throw err;
        var columns = columnify(results, {
            columnSplitter: '|'
        });
        console.log("-----------------------------------------------------------")
        console.log(columns);
        console.log("-----------------------------------------------------------")
        start();
    });
} // end of vli function

function vti() {
    inquirer.prompt([{
            type: "input",
            message: "What is the ID of the product you want to increase?",
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
            message: "how many units of the product they would like to increase",
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
        var units = answer.units
        var query = "SELECT * FROM products WHERE ?"
            // search for id
        connection.query(query, {
            item_id: id
        }, function(err, results) {
            // console.log(results[0].stock_quantity);
            if (err) throw err;
            if (results[0].stock_quantity >= 0) {
                addStock(parseInt(results[0].stock_quantity), parseInt(units), id);
            } else {
                console.log("Insufficient quantity!");
                console.log("----------------------------------------------------------------");
                start();
                console.log("----------------------------------------------------------------");
            }
        });
    }); // then function completed
} // end of the vti prompt

function anp() {
    inquirer.prompt([{
            type: "input",
            message: "What is the name of the added product?",
            name: "name",
        },

        {
            type: "input",
            message: "Name of the deparment of added product?",
            name: "dname",
        },

        {
            type: "input",
            message: "Price of product?",
            name: "price",
            validate: function(value) {
                if (isNaN(value) === false && value > 0 && value < 100000000) {
                    return true;
                }
                return false;
            }
        },

        {
            type: "input",
            message: "Quantity of the product added?",
            name: "quantity",
            validate: function(value) {
                if (isNaN(value) === false && value > 0 && value < 10000000) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {
        var name = answer.name;
        var dname = answer.dname;
        var price = parseFloat(answer.price);
        var quantity = parseInt(answer.quantity);

        var query = "INSERT INTO products SET ?";
        connection.query(query, {
            product_name: name,
            department_name: dname,
            price: price,
            stock_quantity: quantity,
            product_sales: 0
        }, function(err, results) {
            if (err) throw err;
        var query = "SELECT * FROM products";
        connection.query(query, function(err, results) {
            if (err) throw err;
            var columns = columnify(results, {
                columnSplitter: '|'
            });
            console.log("----------------------------------------------------------------");
            console.log(columns);
            console.log("----------------------------------------------------------------");
            start();
        });
        });

    });
}


function addStock(x, y, z) {
    var newStock = x + y;
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{
        stock_quantity: newStock
    }, {
        item_id: z
    }], function(err, results) {
        console.log("----------------------------------------------------------------");
        var query = "SELECT * FROM products";
        connection.query(query, function(err, results) {
            if (err) throw err;
            var columns = columnify(results, {
                columnSplitter: '|'
            });
            console.log("----------------------------------------------------------------");
            console.log(columns);
            console.log("----------------------------------------------------------------");
            start();
        });
    });



} // end of add stock function