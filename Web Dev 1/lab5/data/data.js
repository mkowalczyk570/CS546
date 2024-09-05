/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/
import validate from './validation.js'
import axios from 'axios';

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

export const getBookById = async (id) => {
    const books = await getBooks();
    id = validate.stringCheck(id);
    let foundBook = await bookFinder(id);
    if(JSON.stringify(foundBook) == '{}'){
        throw 'Book not found';
    }else{return foundBook}
};

export const getAuthorById = async (id) => {
    const Authors = await getAuthors();
    id = validate.stringCheck(id);
    let foundAuthor = await authorFinder(id)
    if(JSON.stringify(foundAuthor) == '{}'){
        throw 'Author not found'
    }else{return foundAuthor}
};