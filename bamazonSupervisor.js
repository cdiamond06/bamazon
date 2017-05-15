// GLOBAL
// --------------------------------------------------------------------------------------
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
    var query = "SELECT * FROM departments";
    connection.query(query, function(err, results) {
        if (err) throw err;
        var columns = columnify(results, {
            columnSplitter: '|'
        });
        console.log("---------------------------------------------------------------------------------");
        console.log(columns);
        console.log("---------------------------------------------------------------------------------");
        start();
    });

});


// FUNCTION
// -----------------------------------------------------------------------------------------
function start() {
    inquirer.prompt({

        type: "list",
        message: "Choose which item you would like to execute?",
        name: "choice",
        choices: ["view-product-sales-by-department", "create-new-department"]

    }).then(function(user) {
        call = user.choice;

        switch (call) {

            case "view-product-sales-by-department":
                vpsbd();
                break;

            case "create-new-department":
                cnd();
                break;

            default:
                console.log("something went wrong")
        };
    });
}

function vpsbd() {
    var query = "SELECT *, total_sales - over_head_costs AS total_profit FROM departments";
    connection.query(query, {}, function(err, results) {
        if (err) throw err;
        var columns = columnify(results, {
            columnSplitter: '|'
        });
        console.log("---------------------------------------------------------------------------------");
        console.log(columns);
        console.log("---------------------------------------------------------------------------------");
        start();
    });

}



function cnd() {
    inquirer.prompt([{
            type: "input",
            message: "Name of the deparment of added product?",
            name: "dname",
        },

        {
            type: "input",
            message: "Cost of Overhead?",
            name: "overhead",
            validate: function(value) {
                if (isNaN(value) === false && value >= 0 && value < 100000000) {
                    return true;
                }
                return false;
            }
        },

        {
            type: "input",
            message: "Total Sales?",
            name: "sales",
            validate: function(value) {
                if (isNaN(value) === false && value >= 0 && value < 10000000) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {
        var dname = answer.dname;
        var overhead = parseFloat(answer.overhead);
        var sales = parseInt(answer.sales);
        var query = "INSERT INTO departments SET ?";
        connection.query(query, {
            department_name: dname,
            over_head_costs: overhead,
            total_sales: sales
        }, function(err, results) {
            if (err) throw err;
            var query = "SELECT * FROM departments";
            connection.query(query, function(err, results) {
                if (err) throw err;
                var columns = columnify(results, {
                    columnSplitter: '|'
                });
                console.log("---------------------------------------------------------------------------------");
                console.log(columns);
                console.log("---------------------------------------------------------------------------------");
                start();
            });
        });

    });
} // end of cnd function