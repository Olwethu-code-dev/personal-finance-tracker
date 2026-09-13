function getCurrentUserEmail() {
    return localStorage.getItem("userEmail");
}

function getUserKey(type) {
    const email = getCurrentUserEmail();

    if (!email) {
        return type;
    }

    return type + "_" + encodeURIComponent(email.toLowerCase());
}



const incomeForm = document.getElementById("incomeForm");

if (incomeForm) {
    incomeForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const source = document.getElementById("incomeSource").value;
        const amount = document.getElementById("incomeAmount").value;
        const date = document.getElementById("incomeDate").value;

        const income = {
            source,
            amount,
            date
        };

        let incomeList =
            JSON.parse(localStorage.getItem(getUserKey("incomeList"))) || [];

        incomeList.push(income);

        localStorage.setItem(
            getUserKey("incomeList"),
            JSON.stringify(incomeList)
        );

        displayIncome();

        incomeForm.reset();

        displayDashboard();
        displayDashboardTransactions();
        displayReports();
    });
}


function displayIncome() {
    const incomeHistory = document.getElementById("incomeHistory");

    if (!incomeHistory) return;

    const incomeList =
        JSON.parse(localStorage.getItem(getUserKey("incomeList"))) || [];

    if (incomeList.length === 0) {
        incomeHistory.innerHTML =
            "<p>No income has been added yet.</p>";
        return;
    }

    incomeHistory.innerHTML = "";

    incomeList.forEach(function(income, index) {
        const incomeItem = document.createElement("p");

        incomeItem.innerHTML =
            "<strong>" + income.source + "</strong> - R" +
            Number(income.amount).toFixed(2) +
            " - " + income.date +
            " <button onclick=\"deleteIncome(" + index + ")\">Delete</button>";

        incomeHistory.appendChild(incomeItem);
    });
}

displayIncome();


function deleteIncome(index) {
    let incomeList =
        JSON.parse(localStorage.getItem(getUserKey("incomeList"))) || [];

    incomeList.splice(index, 1);

    localStorage.setItem(
        getUserKey("incomeList"),
        JSON.stringify(incomeList)
    );

    displayIncome();
    displayDashboard();
    displayDashboardTransactions();
    displayReports();
}


const expenseForm = document.getElementById("expenseForm");

if (expenseForm) {
    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const category =
            document.getElementById("expenseCategory").value;

        const amount =
            document.getElementById("expenseAmount").value;

        const date =
            document.getElementById("expenseDate").value;

        const expense = {
            category,
            amount,
            date
        };

        let expenseList =
            JSON.parse(localStorage.getItem(getUserKey("expenseList"))) || [];

        expenseList.push(expense);

        localStorage.setItem(
            getUserKey("expenseList"),
            JSON.stringify(expenseList)
        );

        displayExpenses();

        expenseForm.reset();

        displayDashboard();
        displayDashboardTransactions();
        displayReports();
    });
}


function displayExpenses() {
    const expenseHistory =
        document.getElementById("expenseHistory");

    if (!expenseHistory) return;

    const expenseList =
        JSON.parse(localStorage.getItem(getUserKey("expenseList"))) || [];

    if (expenseList.length === 0) {
        expenseHistory.innerHTML =
            "<p>No expenses have been added yet.</p>";
        return;
    }

    expenseHistory.innerHTML = "";

    expenseList.forEach(function(expense, index) {
        const expenseItem = document.createElement("p");

        expenseItem.innerHTML =
            "<strong>" + expense.category + "</strong> - R" +
            Number(expense.amount).toFixed(2) +
            " - " + expense.date +
            " <button onclick=\"deleteExpense(" + index + ")\">Delete</button>";

        expenseHistory.appendChild(expenseItem);
    });
}

displayExpenses();


function deleteExpense(index) {
    let expenseList =
        JSON.parse(localStorage.getItem(getUserKey("expenseList"))) || [];

    expenseList.splice(index, 1);

    localStorage.setItem(
        getUserKey("expenseList"),
        JSON.stringify(expenseList)
    );

    displayExpenses();
    displayDashboard();
    displayDashboardTransactions();
    displayReports();
}


const budgetForm = document.getElementById("budgetForm");

if (budgetForm) {
    budgetForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const category =
            document.getElementById("budgetCategory").value;

        const amount =
            document.getElementById("budgetAmount").value;

        const budget = {
            category,
            amount
        };

        let budgetList =
            JSON.parse(localStorage.getItem(getUserKey("budgetList"))) || [];

        budgetList.push(budget);

        localStorage.setItem(
            getUserKey("budgetList"),
            JSON.stringify(budgetList)
        );

        displayBudgets();

        budgetForm.reset();
    });
}


function displayBudgets() {
    const budgetHistory =
        document.getElementById("budgetHistory");

    if (!budgetHistory) return;

    const budgetList =
        JSON.parse(localStorage.getItem(getUserKey("budgetList"))) || [];

    if (budgetList.length === 0) {
        budgetHistory.innerHTML =
            "<p>No budgets have been created yet.</p>";
        return;
    }

    budgetHistory.innerHTML = "";

    budgetList.forEach(function(budget, index) {
        const budgetItem = document.createElement("p");

        budgetItem.innerHTML =
            "<strong>" + budget.category + "</strong> - R" +
            Number(budget.amount).toFixed(2) +
            " per month" +
            " <button onclick=\"deleteBudget(" + index + ")\">Delete</button>";

        budgetHistory.appendChild(budgetItem);
    });
}

displayBudgets();


function deleteBudget(index) {
    let budgetList =
        JSON.parse(localStorage.getItem(getUserKey("budgetList"))) || [];

    budgetList.splice(index, 1);

    localStorage.setItem(
        getUserKey("budgetList"),
        JSON.stringify(budgetList)
    );

    displayBudgets();
}



function displayReports() {
    const reportIncome =
        document.getElementById("reportIncome");

    const reportExpenses =
        document.getElementById("reportExpenses");

    const reportBalance =
        document.getElementById("reportBalance");

    const reportSummary =
        document.getElementById("reportSummary");

    if (!reportIncome) return;

    const incomeList =
        JSON.parse(localStorage.getItem(getUserKey("incomeList"))) || [];

    const expenseList =
        JSON.parse(localStorage.getItem(getUserKey("expenseList"))) || [];

    let totalIncome = 0;
    let totalExpenses = 0;

    incomeList.forEach(function(income) {
        totalIncome += Number(income.amount);
    });

    expenseList.forEach(function(expense) {
        totalExpenses += Number(expense.amount);
    });

    const balance = totalIncome - totalExpenses;

    reportIncome.textContent =
        "R" + totalIncome.toFixed(2);

    reportExpenses.textContent =
        "R" + totalExpenses.toFixed(2);

    reportBalance.textContent =
        "R" + balance.toFixed(2);

    reportSummary.textContent =
        "You have received R" +
        totalIncome.toFixed(2) +
        " in income and spent R" +
        totalExpenses.toFixed(2) +
        ". Your current balance is R" +
        balance.toFixed(2) +
        ".";
}

displayReports();



function displayDashboard() {
    const dashboardIncome =
        document.getElementById("dashboardIncome");

    const dashboardExpenses =
        document.getElementById("dashboardExpenses");

    const dashboardBalance =
        document.getElementById("dashboardBalance");

    if (!dashboardIncome) return;

    const incomeList =
        JSON.parse(localStorage.getItem(getUserKey("incomeList"))) || [];

    const expenseList =
        JSON.parse(localStorage.getItem(getUserKey("expenseList"))) || [];

    let totalIncome = 0;
    let totalExpenses = 0;

    incomeList.forEach(function(income) {
        totalIncome += Number(income.amount);
    });

    expenseList.forEach(function(expense) {
        totalExpenses += Number(expense.amount);
    });

    const balance = totalIncome - totalExpenses;

    dashboardIncome.textContent =
        "R" + totalIncome.toFixed(2);

    dashboardExpenses.textContent =
        "R" + totalExpenses.toFixed(2);

    dashboardBalance.textContent =
        "R" + balance.toFixed(2);
}

displayDashboard();



function displayDashboardTransactions() {
    const transactionList =
        document.getElementById("dashboardTransactions");

    if (!transactionList) return;

    const incomeList =
        JSON.parse(localStorage.getItem(getUserKey("incomeList"))) || [];

    const expenseList =
        JSON.parse(localStorage.getItem(getUserKey("expenseList"))) || [];

    transactionList.innerHTML = "";

    incomeList.forEach(function(income) {
        const row = document.createElement("tr");

        row.innerHTML =
            "<td>" + income.date + "</td>" +
            "<td>" + income.source + "</td>" +
            "<td>Income</td>" +
            "<td>R" + Number(income.amount).toFixed(2) + "</td>";

        transactionList.appendChild(row);
    });

    expenseList.forEach(function(expense) {
        const row = document.createElement("tr");

        row.innerHTML =
            "<td>" + expense.date + "</td>" +
            "<td>" + expense.category + "</td>" +
            "<td>Expense</td>" +
            "<td>R" + Number(expense.amount).toFixed(2) + "</td>";

        transactionList.appendChild(row);
    });

    if (incomeList.length === 0 && expenseList.length === 0) {
        transactionList.innerHTML =
            "<tr><td colspan=\"4\">No transactions have been added yet.</td></tr>";
    }
}

displayDashboardTransactions();



const profileForm =
    document.getElementById("profileForm");

if (profileForm) {

    const email = getCurrentUserEmail();

    const registeredUsers =
        JSON.parse(
            localStorage.getItem("registeredUsers")
        ) || [];

    const currentUser = registeredUsers.find(
        function(user) {
            return user.email.toLowerCase() ===
                email.toLowerCase();
        }
    );

    if (currentUser) {

        document.getElementById("profileName").value =
            currentUser.name;

        document.getElementById("profileEmail").value =
            currentUser.email;
    }

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("profileName").value;

        const email =
            document.getElementById("profileEmail").value;

        const profile = {
            name,
            email
        };

        localStorage.setItem(
            getUserKey("profile"),
            JSON.stringify(profile)
        );

        alert("Profile updated successfully.");
    });
}


function displayWelcomeMessage() {
    const welcomeMessage =
        document.getElementById("welcomeMessage");

    if (!welcomeMessage) return;

    const email = getCurrentUserEmail();

    if (!email) return;

    const registeredUsers =
        JSON.parse(
            localStorage.getItem("registeredUsers")
        ) || [];

    const currentUser = registeredUsers.find(
        function(user) {
            return user.email.toLowerCase() ===
                email.toLowerCase();
        }
    );

    if (currentUser) {
        welcomeMessage.textContent =
            "Welcome back, " + currentUser.name;
    }
}

displayWelcomeMessage();



const registerForm =
    document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name =
            document.getElementById("fullName").value;

        const email =
            document.getElementById("registerEmail").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let registeredUsers =
            JSON.parse(
                localStorage.getItem("registeredUsers")
            ) || [];

        const existingUser = registeredUsers.find(
            function(user) {
                return user.email.toLowerCase() ===
                    email.toLowerCase();
            }
        );

        if (existingUser) {
            alert("An account with this email already exists.");
            return;
        }

        const user = {
            name,
            email,
            password
        };

        registeredUsers.push(user);

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(registeredUsers)
        );

        alert("Account created successfully.");

       window.location.href = "index.html";
    });
}

const oldRegisteredUser =
    JSON.parse(localStorage.getItem("registeredUser"));

if (oldRegisteredUser) {
    let registeredUsers =
        JSON.parse(
            localStorage.getItem("registeredUsers")
        ) || [];

    const alreadyExists = registeredUsers.some(
        function(user) {
            return user.email.toLowerCase() ===
                oldRegisteredUser.email.toLowerCase();
        }
    );

    if (!alreadyExists) {
        registeredUsers.push(oldRegisteredUser);

        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(registeredUsers)
        );
    }

    localStorage.removeItem("registeredUser");
}


const loginForm =
    document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        if (email === "" || password === "") {
            alert("Please enter your email and password.");
            return;
        }

        const registeredUsers =
            JSON.parse(
                localStorage.getItem("registeredUsers")
            ) || [];

        const user = registeredUsers.find(
            function(user) {
                return user.email.toLowerCase() ===
                    email.toLowerCase() &&
                    user.password === password;
            }
        );

        if (!user) {
            alert("Incorrect email or password.");
            return;
        }

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", user.email);

        window.location.href = "dashboard.html";
    });
}



const currentPage =
    window.location.pathname;

const protectedPages = [
    "dashboard.html",
    "income.html",
    "expenses.html",
    "budget.html",
    "reports.html",
    "profile.html"
];

const pageName =
    currentPage.substring(
        currentPage.lastIndexOf("/") + 1
    );

const loggedIn =
    localStorage.getItem("loggedIn");

if (
    protectedPages.includes(pageName) &&
    loggedIn !== "true"
) {
    window.location.href = "index.html";
}


const logoutLink =
    document.getElementById("logoutLink");

if (logoutLink) {
    logoutLink.addEventListener("click", function(event) {
        event.preventDefault();

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userEmail");

        window.location.href = "index.html";
    });
}