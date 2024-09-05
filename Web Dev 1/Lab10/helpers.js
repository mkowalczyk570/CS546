//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';


const exportedMethods = {
  stringCheck(arg){
    if(arg == undefined){
        throw `You must provide a string input for your parameter ${arg}`;
    }
    else if(typeof arg !== 'string'){
        throw `${arg} must be a string`;
    }
    else if(arg.trim().length == 0){
        throw `string inputs cannot be empty space`;
    }
    return arg.trim();
  },

  numCheck(arg){
    if(arg == undefined){
        throw `You must provide a number input for maxCapacity and priceOfAdmission`;
    }
    else if(typeof arg !== 'number'){
        throw `${arg} must be a number`;
    }
  },
  idCheck(id){
    if(!id) throw 'You must provide an id to search for'
    if(!ObjectId.isValid(id)) throw 'invalid object Id'
    return id;
  },
  inputCheck(
    firstName,
    lastName,
    emailAddress,
    password,
    role){
    
        firstName = firstName.trim()
        lastName = lastName.trim()
        emailAddress = emailAddress.trim()
        password = password.trim()
        role = role.trim()

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

    },

  emailValidation(email){
    this.stringCheck(email)
    const emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if(!emailCheck.test(email)){throw 'emailAddress is not a valid email'}
    return email;
  },

  passwordValidation(password){
    if(/\s/.test(password)){throw 'password cannot contain empty spaces'}
    const passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\&*\)\(+=._-])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/
    if(!passRegex.test(password)){throw 'password must be at least 8 characters long and contain 1 special character, number, and uppercase letter'}
    return password
  }
}
  


export default exportedMethods;