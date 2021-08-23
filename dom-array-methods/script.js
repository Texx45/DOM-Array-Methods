const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}
// function to double Money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// function to sort users by richest

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// function to show millionaires

function showMillionaires() {
  console.log("function ran");
  data = data.filter((user) => user.money >= 1000000);
  updateDOM();
}

// function total up wealth

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  // console.log(formatMoney(wealth));
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new object to array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  // if we don't pass in a value *data* (ln-19) will be passed in.
  // clear the main div

  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>"; // set it to default content in index.html
  // loop through provided data (ln 42) with forEach.

  providedData.forEach((item) => {
    const element = document.createElement("div"); // create element for each item in the loop.
    element.classList.add("person"); // add a class of *person* to each div created.
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    // element.innerHTML = `<strong>${item.name}</strong> ${item.money}`; // adds name and money to element.
    main.appendChild(element);
  });
}

// Format number as money

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//! EVENT LISTENERS
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
