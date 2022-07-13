//first thing is to work with the form
// this particular section of the project will help us to know what to do when there are multiple parameters, how to get them and how to handle them

/*

    
        <div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>Buy a physics book</p>
            </div>
            <div class="item-time">
              <p>25 Feb, 06:45 PM</p>
            </div>
          </div>
          <div class="item-amount expense-amount">
            <p>-$78</p>
          </div>
        </div>
*/
let Time = getFormattedTime();

document.querySelector("#ewallet-form").addEventListener("submit", (e) => {
  e.preventDefault(); // this preventDefault method makes the page not to reload when a value is passed

  //now we have to get the three input fields data
  const type = document.querySelector(".add__type").value;
  const description = document.querySelector(".add__description").value;
  const value = document.querySelector(".add__value").value;
  //we use this code to get the values of the inputs

  if (description.length > 0 && value.length > 0) {
    addItems(type, description, value, Time);
    resetForm();
  } else {
    console.log("there's an error");
  }
  //this is an if-else code to validate inputs passed in

  //here we want to reset the form
});

function resetForm() {
  document.querySelector(".add__type").value = "+";
  document.querySelector(".add__description").value = "";
  document.querySelector(".add__value").value = "";
} // this function is used to reset the form input values

function addItems(type, description, value, Time) {
  const newHTML = `
  <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${description}</p>
      </div>
      <div class="item-time">
        <p>${Time}</p>
      </div>
    </div>
    <div class="item-amount ${
      type === "+" ? "income-amount" : "expense-amount"
    }">
    
      <p>${type}$${value}</p>
    </div>
  </div>`;
  //using tenary operator to solve the income and expense problem
  const collection = document.querySelector(".collection");
  collection.insertAdjacentHTML("afterbegin", newHTML);
  // in this section we create the dom elements to be added
  //we use this type of method to parse html code from javascript into the dom
  //It takes in a position and the Html string

  addItemToLS(type, description, value, Time);
  getExpenditure();
}
function getFormattedTime() {
  const now = new Date().toLocaleTimeString(
    "en-us",
    {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    } // This data set is used to get the present time, or the computer's time
  ); //To explain this, a way to format dates is to use the split method on the date, that will turn the string to an array and then,the indexes can be used to format the date
  const date = now.split(",")[0].split(" ");
  const time = now.split(" ");
  const formatedTime = `${date[1]} ${date[0]}, ${time[2]} ${time[3]}`;
  return formatedTime;
}

function getItemsFromLS() {
  let items = localStorage.getItem("items");

  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }
  return items;
}
function addItemToLS(type, description, value, Time) {
  let items = getItemsFromLS();
  items.push({
    type,
    description,
    value,
    Time,
  });
  localStorage.setItem("items", JSON.stringify(items));

  //This function is used to push an object of information to the local storage and this function takes in all the data we intend to push to the items[]
  //First we declare a common variable and inside we use the getItem method to fetch our newly declared item
  //now we make an if statement declaring that when items is true, or there is actually an item, parse the items back to their initial form
  //If there is none, create an empty array
  //Then we call the push method on the items variable which will contain an object
  //Now we will call the SetItem Method on the items, which will be our key, and the second value
}

//Showing Data from local Storage

showItems();
function showItems() {
  let items = getItemsFromLS();
  for (let item of items) {
    const newHTML = `
  <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.description}</p>
      </div>
      <div class="item-time">
        <p>${item.Time}</p>
      </div>
    </div>
    <div class="item-amount ${
      item.type === "+" ? "income-amount" : "expense-amount"
    }">
    
      <p>${item.type}$${item.value}</p>
    </div>
  </div>`;
    collection = document.querySelector(".collection");
    collection.insertAdjacentHTML("afterbegin", newHTML);
  }
}
//summing up the income and expenses data

function getExpenditure() {
  let header = document.querySelector(header);
  let items = getItemsFromLS();
  let initialExpense = 0;
  let initialIncome = 0;
  for (item of items) {
    if (item.type === "+") {
      initialIncome += parseInt(item.value);
      document.querySelector(
        ".income__amount"
      ).children[0].innerText = `$${initialIncome}`;
    } else {
      initialExpense += parseInt(item.value);
      document.querySelector(
        ".expense__amount"
      ).children[0].innerText = `$${initialExpense}`;
    }
  }
  let formattedAmount = initialIncome - initialExpense;

  let total = document.querySelector(".balance__amount");
  total.innerText = `$${formattedAmount.toLocaleString()}`;
  return formattedAmount;
}
