// In this file, you must perform all client-side validation for every single form input 
//(and the role dropdown) on your pages. The constraints for those fields are the same as 
//they are for the data functions and routes. Using client-side JS, you will intercept the
// form's submit event when the form is submitted and If there is an error in the user's input or
// they are missing fields, you will not allow the form to submit to the server and will display an 
//error on the page to the user informing them of what was incorrect or missing.  You must do this 
//for ALL fields for the register form as well as the login form. If the form being submitted has all valid 
//data, then you will allow it to submit to the server for processing. Don't forget to check that password 
//and confirm password match on the registration form!


(function (){
    function validateLoginForm() {
        const email = document.getElementById("loginEmailAddressInput").value;
        const password = document.getElementById("loginPasswordInput").value;

        validation.emailValidation(email);
        validation.passwordValidation(password);
        return true
    }

    function validateRegisterForm() {
        const firstName = document.getElementById("firstNameInput").value;
        const lastName = document.getElementById("lastNameInput").value;
        const email = document.getElementById("emailAddressInput").value;
        const password = document.getElementById("passwordInput").value;
        const confirmPassword = document.getElementById("confirmPasswordInput").value;
        const role = document.getElementById("roleInput").value;
        
        validation.inputValidation(firstName, lastName, email, password, role)
        if(password !== confirmPassword){throw "Passwords do not match!"}
        return true;
    }
    function validateForm(){
        const firstName = document.getElementById("firstNameInput").value;
        if(!firstName){
            validateLoginForm()
        }
        else{validateRegisterForm()}
    }
    function inputCheck(
        firstName,
        lastName,
        emailAddress,
        password,
        role){
            if(!firstName || !lastName || !emailAddress || !password || !role){throw 'All inputs must be non-empty strings'}
    
            if(/\s/.test(firstName)){throw 'firstName cannot contain empty spaces'}
            if(/\s/.test(lastName)){throw 'lastName cannot contain empty spaces'}
            const nameRegex = /^[A-Za-z]{2,25}$/
            if(!nameRegex.test(firstName) || !nameRegex.test(lastName)){
                throw 'firstName and lastName must be between 2-25 characters long and contain no numbers'
            }
    
            this.passwordValidation(password)
    
            emailAddress = this.emailValidation(emailAddress)
    
            role = role.toLowerCase()
            if(!role === 'user' || !role === 'admin'){throw `Role must be 'user' or 'admin'`}
          
    }
    
    function emailValidation(email){
        this.stringCheck(email)
        const emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        if(!emailCheck.test(email)){throw 'emailAddress is not a valid email'}
        return email;
    }
    
    function passwordValidation(password){
        if(/\s/.test(password)){throw 'password cannot contain empty spaces'}
        const passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\&*\)\(+=._-])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/
        if(!passRegex.test(password)){throw 'password must be at least 8 characters long and contain 1 special character, number, and uppercase letter'}
        return password
    }
    const name = document.getElementById("")
    const submit = document.getElementById("submit")
    submit.addEventListener("click", validateForm)
    
})();