const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const employee = [];

function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "Enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select role",
        choices: [
            "Engineer",
            "Manager",
            "Intern"
        ],
        name: "role"
    },
    {
        message: "Enter ID",
        name: "id"
    },
    {
        message: "Enter email address",
        name: "email"
    }])
    
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Add more team member?",
            choices: [
                "Yes",
                "No"
            ],
            name: "addMember"
        }])

        .then(function({roleInfo, addMember}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            employee.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (addMember === "Yes") {
                    moreMember();
                } else {
                    finishHtml();
                }
            })
        })
    })
}










const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



