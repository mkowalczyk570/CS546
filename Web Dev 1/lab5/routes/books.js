//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file that you used for lab 3 to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
import {Router} from 'express';

import{
    getBooks,
    getBookById
}from '../data/data.js'
import validation from '../data/validation.js'

const router = Router();

router
    .route('/')
    .get(async (req, res) =>{
        try{
            const books = await getBooks();
            return res.json(books);
        }catch(e){
            res.status(500).json({error: e})
        }
    })
    .post(async (req, res) => {
        return res.send('POST request to http://localhost:3000/books');
    })
    .delete(async (req, res) => {
        return res.send('DELETE request to http://localhost:3000/books');
    })
    .put(async (req, res) => {
        return res.send('PUT request to http://localhost:3000/books');
    })
    .patch(async (req, res) => {
        return res.send('PATCH request to http://localhost:3000/books');
    });

// Implement GET Request Method and send a JSON response  See lecture code!

router
    .route('/:id')
    .get(async (req, res) =>{
        try{
            req.params.id = validation.stringCheck(req.params.id);
            const book = await getBookById(req.params.id);
            return res.json(book);
        }catch(e){
            res.status(400).json({error: e})
        }
    })
    .post(async (req, res) => {
        return res.send('POST request to http://localhost:3000/books');
    })
    .delete(async (req, res) => {
        return res.send('DELETE request to http://localhost:3000/books');
    })
    .put(async (req, res) => {
        return res.send('PUT request to http://localhost:3000/books');
    })
    .patch(async (req, res) => {
        return res.send('PATCH request to http://localhost:3000/books');
    });
// Implement GET Request Method and send a JSON response See lecture code!

export default router;
