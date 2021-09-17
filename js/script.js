/***
 * variable declaration
 * **/

//variables for JobRole section
const otherJobRoleField = document.querySelector("#other-job-role");
const jobRoleSelect = document.querySelector("#title");
//variables for Tshirt Section
const colorSelector = document.querySelector("#color");
const designSelector = document.querySelector("#design");
const colorSelectorOptions = colorSelector.querySelectorAll("option");
//variables for activities section
const activitiesField = document.querySelector("#activities");
let totalCost = 0;
//variables for payment section
const paymentSelector = document.querySelector("#payment");
const divPayment = [
  document.querySelector("#credit-card"),
  document.querySelector("#paypal"),
  document.querySelector("#bitcoin"),
];
//variables for form section
const form = document.querySelector("form");
const nameInput = form.querySelector("#name");
const emailInput = form.querySelector("#email");
const creditCardInput = form.querySelector("#cc-num");
const zipInput = form.querySelector("#zip");
const cVVInput = form.querySelector("#cvv");
//variables for validation
const inputArray = [nameInput, emailInput, creditCardInput, zipInput, cVVInput];
let hasCheckedBoxes = false;
//variables for accessibility
let checkedboxes = [];
const checkboxActivities = activitiesField.querySelectorAll("input");
/***
 * focuses on the name field on load, hides the form 'Other job roles' on load, resets the activities
 */
window.addEventListener("load", () => {
  const nameField = document.querySelector("#name");
  const otherJobRoleField = document.querySelector("#other-job-role");
  nameField.focus();
  colorSelector.selectedIndex = 0;
  otherJobRoleField.style.display = "none";
  activitiesField
    .querySelectorAll("input")
    .forEach((checkbox) => (checkbox.checked = false));
  colorSelector.disabled = true;
  paymentSelector.selectedIndex = 1;
  divPayment.forEach((div) => (div.style.display = "none"));
  divPayment[0].style.display = "";
  checkedboxes = [];
  hasCheckedBoxes = false;
});

/***
 * shows an input field when the user select Other in the Job Role selector
 */

jobRoleSelect.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRoleField.style.display = "";
  } else {
    otherJobRoleField.style.display = "none";
  }
});

/***
 * handles the Tshirt choices, disable color selection until the user has made a choice
 */

designSelector.addEventListener("change", (e) => {
  colorSelectorOptions.forEach((option) => (option.style.display = ""));
  colorSelector.disabled = false;

  if (e.target.value === "js puns") {
    for (let i = 1; i < colorSelectorOptions.length; i++) {
      if (colorSelectorOptions[i].getAttribute("data-theme") != "js puns") {
        colorSelectorOptions[i].style.display = "none";
        colorSelector.selectedIndex = 1;
      }
    }
  } else {
    for (let i = 1; i < colorSelectorOptions.length; i++) {
      if (colorSelectorOptions[i].getAttribute("data-theme") != "heart js") {
        colorSelectorOptions[i].style.display = "none";
        colorSelector.selectedIndex = 3;
      }
    }
  }
});
designSelector.addEventListener("click", (e) => {
  colorSelectorOptions.forEach((option) => (option.style.display = ""));
  colorSelector.disabled = false;

  if (e.target.value === "js puns") {
    for (let i = 1; i < colorSelectorOptions.length; i++) {
      if (colorSelectorOptions[i].getAttribute("data-theme") != "js puns") {
        colorSelectorOptions[i].style.display = "none";
        colorSelector.selectedIndex = 1;
      }
    }
  } else {
    for (let i = 1; i < colorSelectorOptions.length; i++) {
      if (colorSelectorOptions[i].getAttribute("data-theme") != "heart js") {
        colorSelectorOptions[i].style.display = "none";
        colorSelector.selectedIndex = 3;
      }
    }
  }
});
/***
 * handles the activities section, adding cost when user checks the boxes. Shows error message if all boxes are unchecked
 */
activitiesField.addEventListener("change", (e) => {
  const activitiesCost = document.querySelector("#activities-cost");

  if (e.target.type === "checkbox") {
    if (e.target.checked) {
      totalCost = totalCost + parseInt(e.target.getAttribute("data-cost"));
      checkedboxes.push(e.target);
      hasCheckedBoxes = true;
      for (let i = 0; i < checkboxActivities.length; i++) {
        if (
          checkboxActivities[i].getAttribute("data-day-and-time") ===
            e.target.getAttribute("data-day-and-time") &&
          checkboxActivities[i] !== e.target
        ) {
          checkboxActivities[i].disabled = true;
          checkboxActivities[i].parentNode.classList.add("disabled");
        }
      }
    } else {
      totalCost = totalCost - parseInt(e.target.getAttribute("data-cost"));
      checkedboxes.splice(checkedboxes.indexOf(e.target), 1); //thanks to https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array

      if (checkedboxes.length === 0) {
        hasCheckedBoxes = false;
      }
      for (let i = 0; i < checkboxActivities.length; i++) {
        if (
          checkboxActivities[i].getAttribute("data-day-and-time") ===
            e.target.getAttribute("data-day-and-time") &&
          checkboxActivities[i] !== e.target
        ) {
          checkboxActivities[i].disabled = false;
          checkboxActivities[i].parentNode.classList.remove("disabled");
        }
      }
    }
    const actualCost = activitiesCost.textContent.replace(/(\d)+/, totalCost);
    activitiesCost.textContent = actualCost;
    isValidActivities();
  }
});
/***
 * handles the payment info section, hide and show required divs when user select options
 */
paymentSelector.addEventListener("change", (e) => {
  divPayment.forEach((div) => (div.style.display = "none"));
  switch (e.target.value) {
    case "credit-card":
      divPayment[0].style.display = "";
      break;
    case "paypal":
      divPayment[1].style.display = "";
      break;
    case "bitcoin":
      divPayment[2].style.display = "";
      break;
  }
});
/***
 * Helper functions for form validation
 */

/***
 * ShowErrorHints: takes an HTML element as first argument and a string with an error message as second argument. Display error message and hints and returns false
 */

function showErrorHints(
  inputField,
  errorMessage = `Please enter correct information.`
) {
  inputField.parentNode.classList.add("not-valid");
  inputField.parentNode.classList.remove("valid");
  inputField.parentNode.lastElementChild.classList.remove("hint");
  inputField.parentNode.lastElementChild.textContent = errorMessage;
  return false;
}

function hideErrorHints(inputField) {
  inputField.parentNode.classList.add("valid");
  inputField.parentNode.classList.remove("not-valid");
  inputField.parentNode.lastElementChild.classList.add("hint");
  return true;
}
function isValidName(name) {
  if (/^\s+ ?(\s+)?/i.test(name.value) || name.value === "") {
    return showErrorHints(name, "Name field cannot be blank");
  } else {
    return hideErrorHints(name);
  }
}

function isValidEmail(email) {
  if (/^\s+/.test(email.value) || email.value === "") {
    return showErrorHints(email, "Email field cannot be blank");
  } else if (/^[\w^@\S]+@[\w^@\S]+\.\w{2,}$/i.test(email.value) === false) {
    return showErrorHints(
      email,
      "Email adresses must be formatted correctly (example@example.org)."
    );
  } else {
    return hideErrorHints(email);
  }
}

function isValidCreditCardNumber(creditCard) {
  if (/^\s+/.test(creditCard.value) || creditCard.value === "") {
    return showErrorHints(
      creditCard,
      "Your Credit Card number can't be blank."
    );
  } else if (/^\D+$/i.test(creditCard.value)) {
    return showErrorHints(
      creditCard,
      "Your Credit Card number can only contains numbers."
    );
  } else if (/^\d{1,12}$/.test(creditCard.value)) {
    return showErrorHints(
      creditCard,
      `Your Credit Card number must be at least 13 digits.`
    );
  } else if (/^\d{17,}$/.test(creditCard.value)) {
    return showErrorHints(
      creditCard,
      `Your Credit Card number must be at most 16 digits long.`
    );
  } else if (/^\d{13,16}$/.test(creditCard.value)) {
    return hideErrorHints(creditCard);
  }
}

function isValidZipCode(zipCode) {
  if (/^\s+/.test(zipCode.value) || zipCode.value === "") {
    return showErrorHints(zipCode, "Your ZipCode number can't be blank.");
  } else if (/^\D+$/i.test(zipCode.value)) {
    return showErrorHints(
      zipCode,
      "Your ZipCode number can only contains numbers."
    );
  } else if (/^\d{1,4}$/.test(zipCode.value)) {
    return showErrorHints(
      zipCode,
      "Your ZipCode number must be at least 5 digits long."
    );
  } else if (/^\d{6,}$/.test(zipCode.value)) {
    return showErrorHints(
      zipCode,
      "Your Zipcode is too long! (Zipcodes are 5 digits long.)"
    );
  } else if (/^\d{5}$/.test(zipCode.value)) {
    return hideErrorHints(zipCode);
  }
}

function isValidCVV(cVV) {
  if (/^\s+/.test(cVV.value) || cVV.value === "") {
    return showErrorHints(cVV, "Your CVV number can't be blank.");
  } else if (/^[A-z]+$/i.test(cVV.value)) {
    return showErrorHints(cVV, "Your CVV number can only contains numbers.");
  } else if (/^\d{1,2}$/.test(cVV.value)) {
    return showErrorHints(
      cVV,
      "Your CVV number is too short (CVV numbers must be 3 digits long.)"
    );
  } else if (/^\d{4,}$/.test(cVV.value)) {
    return showErrorHints(
      cVV,
      "Your CVV number is too long! (CVV numbers must be 3 digits long.)"
    );
  } else if (/^\d{3}$/.test(cVV.value)) {
    return hideErrorHints(cVV);
  }
}

function isValidActivities() {
  if (hasCheckedBoxes) {
    activitiesField.classList.remove("not-valid");
    activitiesField.classList.add("valid");
    activitiesField.lastElementChild.classList.add("hint");
  } else {
    activitiesField.classList.add("not-valid");
    activitiesField.classList.add("valid");
    activitiesField.lastElementChild.classList.remove("hint");
  }

  return hasCheckedBoxes;
}
function checkIfCCisValid(ccNumber, zipCode, cVV) {
  if (
    isValidCVV(cVV) &&
    isValidZipCode(zipCode) &&
    isValidCreditCardNumber(ccNumber)
  ) {
    return true;
  } else {
    isValidCVV(cVV);
    isValidZipCode(zipCode);
    isValidCreditCardNumber(ccNumber);
    return false;
  }
}
function checkIfFormIsValid(name, email) {
  if (isValidName(name) && isValidEmail(email)) {
    return true;
  } else {
    isValidName(name);
    isValidEmail(email);
  }
}

/***
 * listen to submit event and validate forms
 */
form.addEventListener("submit", (e) => {
  if (paymentSelector.selectedIndex === 1) {
    if (
      checkIfCCisValid(creditCardInput, zipInput, cVVInput) &&
      checkIfFormIsValid(nameInput, emailInput) &&
      isValidActivities()
    ) {
      console.log("All clear, reloading");
    } else {
      checkIfCCisValid(creditCardInput, zipInput, cVVInput);
      checkIfFormIsValid(nameInput, emailInput);
      isValidActivities();
      e.preventDefault();
    }
  } else {
    if (checkIfFormIsValid(nameInput, emailInput) && isValidActivities()) {
      console.log("All clear, reloading");
    } else {
      checkIfFormIsValid(nameInput, emailInput);
      isValidActivities();
      e.preventDefault();
    }
  }
});
/***
 * event listeners for on the fly validation
 */
//on the fly validation for text input
inputArray.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.name) {
      case "user-name":
        isValidName(input);
        break;
      case "user-email":
        isValidEmail(input);
        break;
      case "user-cc-num":
        isValidCreditCardNumber(input);
        break;
      case "user-zip":
        isValidZipCode(input);
        break;
      case "user-cvv":
        isValidCVV(input);
        break;
      default:
        break;
    }
  });
});

/***
 * accessibility section: makes tab navigation easier and provide useful hints
 */
for (let i = 0; i < checkboxActivities.length; i++) {
  checkboxActivities[i].addEventListener("focus", (e) => {
    e.target.parentNode.classList.add("focus");
  });
  checkboxActivities[i].addEventListener("blur", (e) => {
    e.target.parentNode.classList.remove("focus");
  });
}
