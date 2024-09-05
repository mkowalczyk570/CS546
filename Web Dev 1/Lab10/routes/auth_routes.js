//import express, express router as shown in lecture code
import express from 'express'
const router = express.Router();
import { loginUser, registerUser } from '../data/users.js';
import validation from '../helpers.js'

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    res.render('register')
    return;
  })
  .post(async (req, res) => {
    const userPost = req.body
    try{
      validation.inputCheck(userPost.firstNameInput, userPost.lastNameInput, userPost.emailAddressInput, userPost.passwordInput, userPost.roleInput);
      if(userPost.passwordInput !== userPost.confirmPasswordInput){
        res.status(400).render('register', {error: 'Passwords do not match!'})
        return;
      }
      let emailAddressInput = validation.emailValidation(userPost.emailAddressInput);
      let passwordInput = validation.passwordValidation(userPost.passwordInput)
      let insertedInfo = await registerUser(userPost.firstNameInput,userPost.lastNameInput,emailAddressInput,passwordInput, userPost.roleInput);
      const insertCheck = insertedInfo.insertedUser
      if(!insertCheck){
        res.status(500).render('register', {error: "Internal Server Error"})
        return;
      }
      res.redirect('/login')
      return;

    }catch(e){
      res.status(400).render('register', {error: e})
      return;
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    res.render('login')
  })
  .post(async (req, res) => {
    try{
      let emailAddress = validation.emailValidation(req.body.emailAddressInput);
      let password = validation.passwordValidation(req.body.passwordInput)
      let userInfo = await loginUser(emailAddress, password);
      req.session.user= {firstName: userInfo.firstName, lastName: userInfo.lastName, emailAddress: userInfo.emailAddress, role: userInfo.role}
      if(userInfo.role === 'admin'){
        res.redirect('/admin')
      }else{
        res.redirect('/protected')
      }
      return;
    }catch(e){
      res.status(400).render('login', {error: e})
      return;
    }
    
  });

router.route('/protected').get(async (req, res) => {
  const currentTime = new Date().toUTCString()
  res.render('protected', {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName, 
    currentTime: currentTime,
    role:req.session.user.role,
    isAdmin: (req.session.user.role === 'admin') })
  
  return;
});

router.route('/admin').get(async (req, res) => {
  const currentTime = new Date().toUTCString()
  res.render('admin', {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName, 
    currentTime: currentTime,
  })
  
  return;
});

router.route('/error').get(async (req, res) => {
  res.render('error', {status: 403, message: "Unauthorized access!"})
  return;
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  return res.render('logout');
});

export default router;