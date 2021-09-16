//variable declaration
const colorSelector = document.querySelector('#color')
const otherJobRoleField = document.querySelector("#other-job-role")
const jobRoleSelect = document.querySelector("#title")
const designSelector = document.querySelector('#design')
const colorSelectorOptions = colorSelector.querySelectorAll('option')
const activitiesField = document.querySelector('#activities')
let totalCost = 0
//focuses on the name field on load, hides the form 'Other job roles' on load
window.addEventListener('load', () =>{
    const nameField = document.querySelector('#name')
    const otherJobRoleField = document.querySelector("#other-job-role")
    nameField.focus()
    colorSelector.selectedIndex = 0
    otherJobRoleField.style.display = "none"
    activitiesField.querySelectorAll('input').forEach(checkbox => checkbox.setAttribute('unchecked', false))
    colorSelector.disabled = true;

})

//shows an input field when the user select Other in the Job Role selector


jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRoleField.style.display = ""
    } else {
        otherJobRoleField.style.display = "none"
    }

})

//handles the Tshirt choices, disable color selection until the user has made a choice

designSelector.addEventListener('change', (e) => {
    colorSelectorOptions.forEach(option => option.style.display= '')
    colorSelector.disabled = false;
   
    if (e.target.value === 'js puns'){
        
        for (let i = 1; i <  colorSelectorOptions.length; i++) {
            if (colorSelectorOptions[i].getAttribute("data-theme") != "js puns"){
                colorSelectorOptions[i].style.display ="none"
            }

        }
    } else {
       
        for (let i = 1; i < colorSelectorOptions.length; i++) {
            if (colorSelectorOptions[i].getAttribute("data-theme") != "heart js"){
                colorSelectorOptions[i].style.display ="none"
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
            }

        }
    } else {
       
        for (let i = 1; i < colorSelectorOptions.length; i++) {
            if (colorSelectorOptions[i].getAttribute("data-theme") != "heart js"){
                colorSelectorOptions[i].style.display ="none"
            }

        }

    }


} )
//handles the activities section, adding cost when user checks the boxes
activitiesField.addEventListener('change', (e) =>{
    const activitiesCost = document.querySelector('activities-cost')
   
    if (e.target.type === "checkbox") {
        if (e.target.checked){
            totalCost = totalCost + parseInt(e.target.getAttribute("data-cost"))
        } else {
            totalCost = totalCost - parseInt(e.target.getAttribute("data-cost"))
        }
        console.log(totalCost)
    }





})