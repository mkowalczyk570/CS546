//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import axios from 'axios';
import {Router} from 'express';
import validation from '../helpers.js'
import { searchCharacterById, searchCharacterByName } from '../data/characters.js';
const router = Router();

router.route('/').get(async (req, res) => {
  res.render('home')
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  try{
    req.body.searchCharacterByName = validation.stringCheck(req.body.searchCharacterByName)
  }catch(e){
    res.status(400).render('error', {class:"error", message:"You must supply a characterto search for."})
  }
  try{
    const characters = await searchCharacterByName(req.body.searchCharacterByName)
    if(characters.data.count === 0){
      res.status(404).render('error', {class:"not-found", message: `We're sorry, but no results were found for ${req.body.searchCharacterByName}.`})
    }else{res.render('characterSearchResults', {data: characters})}
  }catch(e){
    res.status(400).render('error', {class: "error", message: "Something went wrong, please try again"})
    return;
  }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  try{
    req.params.id = validation.numCheck(req.params.id)
  } catch(e){
    res.status(400).render('error', {class: "error", message: "Invalid input. Make sure you provide a numerical id for your search"})
    return;
  }
  try{
    const characterInfo = await searchCharacterById(req.params.id);
    res.render('characterById', {data: characterInfo})
  }catch(e){
    res.status(404).render('error', {class: "error", message: "No character with that id found"})
    return;
  }
});

export default router
