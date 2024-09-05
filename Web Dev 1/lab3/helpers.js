//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
import axios from 'axios';

export const stringCheck = (arg) =>{
    if(arg == undefined){
        throw 'You must provide a string input';
    }
    else if(typeof arg != 'string'){
        throw 'Input must be a string';
    }
    else if(arg.trim().length == 0){
        throw 'Input string cannot be empty space';
    }
    return arg.trim();
}

export const numCheck = (arg) =>{
    if(arg == undefined){
        throw 'You must provide a number input';
    }
    else if(typeof arg != 'number'){
        throw 'Input must be a number';
    }
}

export async function getBooks(){
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json");
    return data;
}

export async function getAuthors(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
    return data;  
}

export async function bookFinder(id){
    const books = await getBooks();
    let foundBook = {};
    books.forEach((book) => {
        if(id == book.id){
            foundBook = book;
        }
    })
    return foundBook;
}

export async function authorFinder(id){
    const Authors = await getAuthors();
    let foundAuthor = {};
    Authors.forEach((author) => {
        if(id == author.id){
            foundAuthor = author;
        }
    })
    return foundAuthor;
}