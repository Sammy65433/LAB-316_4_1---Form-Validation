// ALAB 316.4.1 - Form Validation

// Your goal in this lab is to demonstrate your knowledge of form
// validation techniques using the variety of tools available to you.
// Working with user-entered data is a cornerstone of web
// development, so it is important to understand how you can control
// and verify that data.
console.log("test");

// Part 1: Introduction

// Currently, these forms have no validation! Your job is to add
// validation so that the forms adhere to the requirements outlined
// below. You can choose to implement this validation using any
// combination of HTML validation attributes and JavaScript event
// listeners that you want, as long as it meets the requirements.

// Explore the HTML structure that has been provided. You can make
// changes to the HTML (and CSS), as long as they do not subtract
// from the original functional intent of the page.

// An HTML element with id errorDisplay has been provided as a
// convenient method of showing error text to the user. In order to
// show or hide errorDisplay, you must modify its display style
// attribute.

// You can place any text or HTML into errorDisplay.

// Part 2: General Requirements

// To reiterate, these requirements can be completed using any
// combination of HTML validation attributes and JavaScript event
// listeners that you want. Consider the right tool for each job
// before you begin working on it.

// General Requirements: Whenever any of these validation
// requirements fail, an appropriate error should be communicated
// to the user (in most cases, the actual requirement listed below
// serves as a good error message), and focus should return to the
// input element that the error originates from. If any requirements
// fail, the form should not submit.

const registerForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");

// console.log(registerForm);

// helpers

// message = words, input = input box
function showError(msg, input) {
    errorDisplay.textContent = msg; //put words inside box
    errorDisplay.style.display = "block"; //pop up on the page
    input.focus(); //move to show problem
}

// hide box and erase old message
function clearError() {
    errorDisplay.textContent = ""; // remove words inside box
    errorDisplay.style.display = "none"; // hide box here
}

// Storage Helpers

// storage only saves strings(setItem(key, stringValue))
// browser auto converts an array or obj in [obj Obj]/ cant use this 
// want to turn data structure into a str and back again

// store users in an array
function getUsers() {

    // turn string into JavaScript array
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function setUsers(arr) {
    // convert array into JSOn string
    // write string under key users
    localStorage.setItem('users', JSON.stringify(arr));
}

// JSON.parse – deserialization
// Takes a JSON string and reconstructs the original JavaScript value.

// JSON.stringify – serialization
// Takes any JavaScript value (object, array, number, etc.) and returns a 
// JSON‑formatted string.




// Registration form -----------------------

registerForm.addEventListener("submit", e => {

    // function validate(e) {
    e.preventDefault(); // stop submit
    // console.log("function");
    clearError(); //reset



    //registration form / look inside the form input = grab name="username"
    // const usernameInput = document.querySelector('#registration input[name="username"]');
    const usernameInput = registerForm.elements.username;

    const emailInput = registerForm.elements.email;
    const passwordInput = registerForm.elements.password;
    const passwordCheckInput = registerForm.elements.passwordCheckInput;
    const termsInput = registerForm.elements.terms.checked;

    const username = usernameInput.value.trim().toLowerCase(); //what the user typed,
    const email = emailInput.value.trim().toLowerCase();
    const password1 = passwordInput.value;
    const password2 = passwordCheckInput.value;

    //   username loops
    // The username cannot be blank.
    // The username must be at least four characters long.

    // Username must contain at least two unique characters.
    if (uniqueCharacters(username) < 2) {
        showError("Username must contain at least two unique characters.", usernameInput, );
        return;
        // false;
    }
    if (username === '') {
        showError("The username cannot be blank.", usernameInput);
        return;
    }

    //Username cannot contain whitespace.
    if (/\s/.test(username)) {
        showError("Username cannot contain whitespace.", usernameInput);
        return;
        // false;
    }

    //"Username cannot contain special characters."
    // negated character set to check for anything other than a-z or 0-9
    if (/[^a-zA-Z0-9]/.test(username)) {
        showError("Username cannot contain special characters.", usernameInput);
        return;
        // false;
    }

    // EMAIL VALIDATION - Html (type email)
    // / The email must be a valid email address.
    // The email must not be from the domain "example.com."
    if (email === "") {
        showError("Email cannot be blank.", emailInput);
        return;
    }
    if (email.includes("example.com")) {
        showError(
            "The email must not be from the domain example.com.",
            usernameInput,
        );
        return false;
    }

    // Password Validation

    // Passwords must be at least 12 characters long.
    if (password.length < 12) {
        console.log(password1);
        showError("Passwords must be at least 12 characters long.", passwordInput);
        return;
    }

    // Passwords must have at least one uppercase and one lowercase letter.
    if (!/[a-z]/.test(password1) || !/[A-Z]/.test(password)) {
        showError(
            "Passwords must have at least one uppercase and one lowercase letter.",
            passwordInput,
        );
        return;
    }
    // Passwords must contain at least one number.
    if (!/[0-9]/.test(password1)) {
        showError("Passwords must contain at least one number.", passwordInput);
        return;
    }
    // Passwords must contain at least one special character.



    // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    if (/password/i.test(password1)) {
        showError('Passwords cannot contain the word "password".', passwordInput);
        return;
    }
    // Passwords cannot contain the username.
    if (password.includes(username)) {
        showError('Passwords cannot contain the username.', passwordInput);
        return;
    }

    // Both passwords must match.
    if (password !== password2) {
        showError('Both passwords must match.', passwordCheckInput);
        return;
    }

    function uniqueCharacters(str) {
        let uniqueChar = [];

        //loop over the string and check each char ("c")

        for (let c of username) {
            if (uniqueChar.includes(c) === false) {
                uniqueChar.push(c);
            }
        }
        // console.log(uniqueChar);

        return uniqueChar.length;
    }

    // Registration Form - Terms and Conditions:


    // The terms and conditions must be accepted.
    if (!terms) {
        showError('Terms and conditions must be accepted.', termsInput);
        return;
    }

    // Store User
    // users contain new user 
    users.push({
        username,
        email,
        password: password
    });

    // JSON writes it too localstroge under key users
    setUsers(users);


    // hide errors 
    registerForm.reset(); //clear everything in registration form
    clearError(); // hide errordisplay and empty 
    alert('Registration successful!'); // give feedback

});

// LOGIN -----------------------------------------
loginForm.addEventListener('submit', e => {
    e.preventDefault(); //dont let it submit
    clearError(); //make sure no old message is popping up


    const usernameRaw = loginForm.elements.username.value.trim().toLowerCase();
    const passwordRaw = loginForm.elements.password.value;
    const keepLogged = loginForm.elements.keepLogged.checked // tru/false?


    // Login Form - Username Validation:


    //  Username 
    // The username cannot be blank.
    if (usernameRaw === '') { //empty feild?
        showError('The username cannot be blank.', loginForm.elements.username);
        return; //stop 
    }


    // The username must exist (within localStorage). Remember that usernames are stored 
    // in all lowercase, but the username field accepts (and should not invalidate) 
    // mixed-case input.

    const users = getUsers(); //read array from localStorage 

    // look thru stored users and give me user whose username 
    // matches person entered
    const user = users.find(u => 
        // u = user obj - check if username = usernameRaw
        u.username === usernameRaw);

    if (!user) { //undefined 
        showError('Username does not exist.', loginForm.elements.username);
    }

    // password Valid
    // Login Form - Password Validation:
    // The password cannot be blank.
    if (passwordRaw === '') {
        showError('Password cannot be blank.', loginForm.elements.password);
        return;
    }
    // The password must be correct (validate against localStorage).

})
//



// Registration Form - Form Submission:

// Usually, we would send this information to an external API for processing. In our case, we are going to process and store the data locally for practice purposes.

// If all validation is successful, store the username, email, and password using localStorage.

// If you are unfamiliar with localStorage, that is okay! Reference the documentation's "Description" and "Examples" sections to learn how to implement it. If you run into issues speak with a peer or one of your instructors.

// Consider how you want to store the user data, keeping in mind that there will be quite a few users registering for the site. Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.

// Valid usernames should be converted to all lowercase before being stored.

// Valid emails should be converted to all lowercase before being stored.

// Clear all form fields after successful submission and show a success message.

// Registration Form - Username Validation (Part Two):

// Now that we are storing usernames, create an additional validation rule for them...

// Usernames must be unique ("that username is already taken" error).
//  Remember that usernames are being stored all lowercase, so
// "learner" and "Learner" are not unique.

// Part 4: Login Form Validation Requirements

// For the Login Form section of the page, implement the following validation requirements:

// Login Form - Username Validation:

// The username cannot be blank.

// The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.

// Login Form - Password Validation:

// The password cannot be blank.

// The password must be correct (validate against localStorage).

// Login Form - Form Submission:

// If all validation is successful, clear all form fields and show a success message.

// If "Keep me logged in" is checked, modify the success message to
// indicate this (normally, this would be handled by a variety of
// persistent login tools and technologies).

// Part 5: Completion

// Test your validation thoroughly! Try to break things!

// Remember that each successful registration should be stored; therefore you should be able to login with a variety of account credentials.

// When you are done testing your own code, swap sandboxes with a partner and test theirs!

// When each of you are finished testing, share your results.

// Discuss with your partner the differences and similarities between your two approaches. Remember that there is rarely a strictly "correct" or "incorrect" way to solve a problem in development, but there are (almost always) more efficient approaches!

// Remember to submit the link to your finished sandbox using the submission instructions included at the beginning of this document.