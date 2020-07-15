const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const path = require("path");
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

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Team Profile Generator</a>
        </div>
      </nav>

      <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;"></div>`;
    
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGitHub();
            data = `<div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
            <div class="card-header">Engineer</div>
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">E-mail: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
              </ul>
            </div>
          </div>`;
        } else if (role === "Manager") {
            const officeNumber = member.getOfficeNumber();
            data = `<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">Manager</div>
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">E-mail: ${email}</li>
              <li class="list-group-item">Office Number: ${officeNumber}</li>
            </div>
          </div>`;
        } else {
            const school = member.getSchool();
            data = `<div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header">Intern</div>
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">E-mail: ${email}</li>
              <li class="list-group-item">School: ${school}</li>
            </div>
          </div>`;
        }
        console.log("adding new team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = `</div>
    </div>
  
</body>
</html>`;

fs.appendFile("./output/team.html", html, function (err) {
    if (err) {
        console.log(err);
    };
});
console.log("End");
}

initApp();









// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");



