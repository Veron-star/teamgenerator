const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const teamMember = [];
function initApp() {
    function getManager() {
        inquirer.prompt([{
            type: "input",
            message: "Enter name",
            name: "managerName"
        }, {
            type: "input",
            message: "Enter ID",
            name: "managerId"
        }, {
            type: "input",
            message: "Enter email",
            name: "managerEmail"
        }, {
            type: "input",
            message: "Enter office number",
            name: "managerOfficeNumber"
        }
    ]).then(response => {
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
        teamMember.push(manager);
        addNewMember();
    })
    }

    function getEngineer() {
        inquirer.prompt([{
            type: "input",
            message: "Enter name",
            name: "engineerName"
        }, {
            type: "input",
            message: "Enter ID",
            name: "engineerId"
        }, {
            type: "input",
            message: "Enter GitHub path",
            name: "engineerGithub"
        }, {
            type: "input",
            message: "Enter email",
            name: "engineerEmail"
        }
    ]).then(response => {
        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
        teamMember.push(engineer);
        addNewMember();
    })
    };

    function getIntern() {
        inquirer.prompt([{
            type: "input",
            message: "Enter name",
            name: "internName"
        }, {
            type: "input",
            message: "Enter ID",
            name: "internId"
        }, {
            type: "input",
            message: "Enter school name",
            name: "internSchool"
        }, {
            type: "input",
            message: "Enter email",
            name: "internEmail"
        }
    ]).then(response => {
        const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
        teamMember.push(intern);
        addNewMember();
    })
    }

    function addNewMember() {
        inquirer.prompt([{
            type: "checkbox",
            message: "Select team member",
            name: "newMember",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Done"
            ]
        }
    ]).then(response => {
        const role = response.newMember;
        if (role == "Manager") {
            getManager();
        } else if (role == "Engineer") {
            getEngineer();
        } else if (role == "Intern") {
            getIntern();
        } else {
            htmlPage();
        }
    });
    }
    addNewMember();
    }

    
    function htmlPage() {
        let html = fs.readFileSync("./lib/htmlRenderer.js");
        const outputPath = path.join(OUTPUT_DIR, "team.html");
        fs.writeFileSync(outputPath, html, "utf-8");
    }   
    
initApp();











