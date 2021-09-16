/***
 * variable declaration
 * **/

//variables for JobRole section
const otherJobRoleField = document.querySelector("#other-job-role")
const jobRoleSelect = document.querySelector("#title")
//variables for Tshirt Section
const colorSelector = document.querySelector('#color')
const designSelector = document.querySelector('#design')
const colorSelectorOptions = colorSelector.querySelectorAll('option')
//variables for activities section
const activitiesField = document.querySelector('#activities')
let totalCost = 0
//variables for payment section
const paymentSelector = document.querySelector('#payment')
const divPayment = [document.querySelector('#credit-card'), document.querySelector('#paypal'), document.querySelector('#bitcoin') ];
//variables for form section
const form = document.querySelector('form')
const nameInput = form.querySelector('#name')
const emailInput = form.querySelector('#email')
const creditCardInput = form.querySelector('#cc-num')
const zipInput = form.querySelector('#zip')
const cVVInput = form.querySelector('#cvv')
//variables for validation
const inputArray = [nameInput, emailInput, creditCardInput, zipInput, cVVInput];
let hasCheckedBoxes = false
//variables for accessibility
const checkboxActivities = activitiesField.querySelectorAll('input')
/*** 
 * focuses on the name field on load, hides the form 'Other job roles' on load, resets the activities
 */
window.addEventListener('load', () =>{
    const nameField = document.querySelector('#name')
    const otherJobRoleField = document.querySelector("#other-job-role")
    nameField.focus()
    colorSelector.selectedIndex = 0
    otherJobRoleField.style.display = "none"
    activitiesField.querySelectorAll('input').forEach(checkbox => checkbox.checked = false)
    colorSelector.disabled = true;
    paymentSelector.selectedIndex = 1
    divPayment.forEach(div => div.style.display = 'none')
    divPayment[0].style.display = ''
    hasCheckedBoxes = false

})

/***
 * shows an input field when the user select Other in the Job Role selector
*/

jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRoleField.style.display = ""
    } else {
        otherJobRoleField.style.display = "none"
    }

})

/*** 
 * handles the Tshirt choices, disable color selection until the user has made a choice
 */

designSelector.addEventListener('change', (e) => {
    colorSelectorOptions.forEach(option => option.style.display= '')
    colorSelector.disabled = false;
   
    if (e.target.value === 'js puns'){
        
        for (let i = 1; i <  colorSelectorOptions.length; i++) {
            if (colorSelectorOptions[i].getAttribute("data-theme") != "js puns"){
                colorSelectorOptions[i].style.display ="none"
                colorSelector.selectedIndex = 1
            }

        }
    } else {
       
        for (let i = 1; i < colorSelectorOptions.length; i++) {
            if (colorSelectorOptions[i].getAttribute("data-theme") != "heart js"){
                colorSelectorOptions[i].style.display ="none"
                colorSelector.selectedIndex = 3
            }

        }

    }


} )
designSelector.addEventListener('click', (e) => {
    colorSelectorOptions.forEach(option => option.style.display= '')
    colorSelector.disabled = false;
    
    if (e.target.value === 'js puns'){
        
        for (let i = 1; i <  colorSelectorOptions.length; i++) {
            if (colorSelectorOptions[i].getAttribute("data-theme") != "js puns"){
                colorSelectorOptions[i].style.display ="none"
                colorSelector.selectedIndex = 1
            }

        }
    } else {
       
        for (let i = 1; i < colorSelectorOptions.length; i++) {
            if (colorSelectorOptions[i].getAttribute("data-theme") != "heart js"){
                colorSelectorOptions[i].style.display ="none"
                colorSelector.selectedIndex = 3
            }

        }

    }


} )
/*** 
 * handles the activities section, adding cost when user checks the boxes
*/
activitiesField.addEventListener('change', (e) =>{
    const activitiesCost = document.querySelector('#activities-cost')
    
    if (e.target.type === "checkbox") {
        if (e.target.checked){
            totalCost = totalCost + parseInt(e.target.getAttribute("data-cost"))
            hasCheckedBoxes = true
            for (let i = 0; i < checkboxActivities.length; i++){
                if (checkboxActivities[i].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') && 
                    checkboxActivities[i] !== e.target ) {
                        checkboxActivities[i].disabled = true
                        
                    }
            }
        } else {
            totalCost = totalCost - parseInt(e.target.getAttribute("data-cost"))
            if (checkboxActivities.some(checkbox =>{checkbox.checked}) === false){
                hasCheckedBoxes = false
            }
            for (let i = 0; i < checkboxActivities.length; i++){
                if (checkboxActivities[i].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') && 
                        checkboxActivities[i] !== e.target ) {
                            checkboxActivities[i].disabled = false
                            
                        }
                
             }
        }
        const actualCost = activitiesCost.textContent.replace(/(\d)+/, totalCost)
        activitiesCost.textContent= actualCost
        isValidActivities()
    }
})
/***
 * handles the payment info section, hide and show required divs when user select options
 */
paymentSelector.addEventListener('change', (e) =>{
   
    
    divPayment.forEach(div => div.style.display = 'none')
    switch (e.target.value){
        case "credit-card":
            divPayment[0].style.display= ""
            break
        case "paypal":
            divPayment[1].style.display= ""
            break
        case "bitcoin":
            divPayment[2].style.display= ""
            break   

    }

})
/***
 * Helper functions for form validation
 */
function showErrorHints(inputField){
    inputField.parentNode.classList.add('not-valid')
    inputField.parentNode.classList.remove('valid')
    inputField.parentNode.lastElementChild.classList.remove('hint')
}
function hideErrorHints(inputField){
    inputField.parentNode.classList.add('valid')
    inputField.parentNode.classList.remove('not-valid')
    inputField.parentNode.lastElementChild.classList.add('hint')
}
function isValidName(name) {
    if (/^\S+ ?(\S+)?/i.test(name) === false){
        showErrorHints(nameInput)
        return /^\S+ ?(\S+)?/i.test(name)
    } else {
        hideErrorHints(nameInput)
        return /^\S+ ?(\S+)?/i.test(name)
    }
}

function isValidEmail(email) {
    if (/^[\w^@\S]+@[\w^@\S]+\.\w{2,}$/i.test(email) === false){
        showErrorHints(emailInput)
        return /^[\w^@\S]+@[\w^@\S]+\.\w{2,}$/i.test(email)
    } else {
        hideErrorHints(emailInput)
        return true
    }
   
}

function isValidCreditCardNumber(creditCard){
    if (/^\d{13,16}$/.test(creditCard) === false){
        showErrorHints(creditCardInput)
        return /^\d{13,16}$/.test(creditCard)
    } else {
        hideErrorHints(creditCardInput)
        return true
    }
   

}

function isValidZipCode(zipCode){
    if (/^\d{5}$/.test(zipCode) === false){
        showErrorHints(zipInput)
        return /^\d{5}$/.test(zipCode)
    } else {
        hideErrorHints(zipInput)
        return true
    }
  

}
function isValidCVV(cVV){
    if (/^\d{3}$/.test(cVV) === false){
        showErrorHints(cVVInput)
        return /^\d{3}$/.test(cVV)
    } else {
        hideErrorHints(cVVInput)
        return true
    }
   
   
}
function isValidActivities(){
    
    
        if (hasCheckedBoxes){
            activitiesField.classList.remove('not-valid')
            activitiesField.classList.add('valid')
            activitiesField.lastElementChild.classList.add('hint')
            
        } else {
            activitiesField.classList.add('not-valid')
            activitiesField.classList.add('valid')
            activitiesField.lastElementChild.classList.remove('hint')
        }
  
    return hasCheckedBoxes
}
function checkIfCCisValid (ccNumber, zipCode, cVV){
    return isValidCVV(cVV) && isValidZipCode(zipCode) && isValidCreditCardNumber(ccNumber)

}
function checkIfFormIsValid(name, email){
    return isValidName(name) && isValidEmail(email) 
}


//There's probably a better way to do this...
function displayError(name, email, ccNumber, zipCode, cVV){
    isValidName(name)
    isValidEmail(email)
    isValidCVV(cVV)
    isValidZipCode(zipCode)
    isValidCreditCardNumber(ccNumber)
    isValidActivities()

}

/***
 * listen to submit event and validate forms
*/
form.addEventListener('submit', (e) =>{
    if (paymentSelector.selectedIndex === 1){
        if (checkIfCCisValid (
                creditCardInput.value, 
                zipInput.value, 
                cVVInput.value) === false ||
            checkIfFormIsValid(nameInput.value,
                 emailInput.value) === false || 
            isValidActivities() === false ) {
                displayError(nameInput.value, 
                    emailInput.value, 
                    creditCardInput.value, 
                    zipInput.value, 
                    cVVInput.value, 
                    checkboxActivities )
                e.preventDefault() 
            }
    } else {
        if (!checkIfFormIsValid(
            nameInput.value, 
            emailInput.value) ||
             isValidActivities() === false  ){
            displayError(
                 nameInput.value,
                 emailInput.value, 
                 creditCardInput.value, 
                 zipInput.value, 
                 cVVInput.value, 
                 checkboxActivities )
            e.preventDefault()
     }
    
    }


})
/***
 * event listeners for on the fly validation
*/
//on the fly validation for text input
inputArray.forEach(input => {
    input.addEventListener('keyup', (e) => {
    switch(e.target.name){
        case "user-name": 
            isValidName(input.value)
            break
        case "user-email":
            isValidEmail(input.value)
            break
        case "user-cc-num":
            isValidCreditCardNumber(input.value)
            break
        case "user-zip":
            isValidZipCode(input.value)
            break
        case "user-cvv":
            isValidCVV(input.value)
            break
        default:
            break


        }
    })
})

/***
 * accessibility section: makes tab navigation easier and provide useful hints
*/
for (let i = 0; i < checkboxActivities.length; i++){
    checkboxActivities[i].addEventListener('focus', (e) =>{
        
        
            e.target.parentNode.classList.add('focus') 
        



    })
    checkboxActivities[i].addEventListener('blur', (e) =>{
       
        
            e.target.parentNode.classList.remove('focus') 
        



    })
}

