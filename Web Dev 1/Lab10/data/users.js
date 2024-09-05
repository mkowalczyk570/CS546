//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import validation from '../helpers.js'
import bcrypt from 'bcrypt'
const saltRounds = 10;


export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  validation.inputCheck(firstName, lastName, emailAddress, password, role)
  emailAddress = emailAddress.toLowerCase()
  role = role.toLowerCase()
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const usersCollection = await users();
  let existingUser = await usersCollection.findOne({emailAddress: emailAddress})
  if(existingUser !== null){throw "User with provided email already exists"}
  let newUser = {
    "firstName": firstName,
    "lastName": lastName,
    "emailAddress": emailAddress,
    "password": hashedPassword,
    "role": role
  }

  const insertedInfo = await usersCollection.insertOne(newUser)
  if(!insertedInfo.acknowledged || !insertedInfo.insertedId){throw "User could not be added"}
  
  return {insertedUser: true}
};

export const loginUser = async (emailAddress, password) => {
  if(!emailAddress || !password){throw "You must provide both an email address and a password"}
  emailAddress = validation.emailValidation(emailAddress)
  emailAddress = emailAddress.toLowerCase()
  password = validation.passwordValidation(password)
  const usersCollection = await users()
  const user = await usersCollection.findOne({emailAddress: emailAddress})
  if (user === null){throw 'Either the email address or password is invalid'}
  const passwordCheck = await bcrypt.compare(password, user.password)
  if(!passwordCheck){throw 'Either the email address or password is invalid'}
  
  return{
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    role: user.role
  }
};
