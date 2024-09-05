//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import{
    stringCheck,
    numCheck,
    getBooks,
    bookFinder,
    authorFinder
}from './helpers.js'

import{
    getAuthorById
}from './authors.js'

export const getBookById = async (id) => {
    const books = await getBooks();
    stringCheck(id);
    let foundBook = await bookFinder(id);
    if(JSON.stringify(foundBook) == '{}'){
        throw 'Book not found';
    }else{return foundBook}
};

export const getAuthorName = async (bookId) => {
    stringCheck(bookId);
    const book = await bookFinder(bookId);
    if(JSON.stringify(book) == '{}'){
        throw 'Book not found';
    }
    const authorId = book.authorId;
    const author = await authorFinder(authorId);
    return author.first_name + " " + author.last_name

};

export const sameGenre = async (genre) => {
    stringCheck(genre);
    const books = await getBooks();
    genre = genre.toLowerCase();
    let booksOfGenre = [];
    books.forEach((book) =>{
        const genres = book.genres;
        let lowerGenres = []
        for(let item in genres){
            lowerGenres.push(genres[item].toLowerCase());
        }
        if(lowerGenres.includes(genre)){
            booksOfGenre.push(book);
        }
    })
    if(booksOfGenre.length == 0){
        throw 'No books of specified genre found'
    }else{return booksOfGenre}

};

export const priceRange = async (min, max) => {
    numCheck(min);
    numCheck(max);
    if(min < 0 || max < 0){
        throw 'min/max must be positive numbers'
    }
    if(max < min){
        throw 'Min cannot be a greater value than max'
    }
    const books = await getBooks();
    let returnBooks = [];
    books.forEach((book) => {
        const price = book.price;
        if(price >= min && price <= max){
            returnBooks.push(book)
        }
    })
    if(returnBooks.length == 0){
        throw 'no books in price range'
    }else{return returnBooks}
};

//This one takes a looong time to do due to the multiple async calls from getAuthorById
export const getAllBooksWithAuthorName = async () => {
    const books = await getBooks();
    let returnBooksWithAuthor = [];
    for(const book of books){
        const authorId = book.authorId;
        const author = await getAuthorById(authorId);
        const fName = author.first_name;
        const lName = author.last_name;
        delete book.authorId;
        book.author = (fName + " " + lName);
        returnBooksWithAuthor.push(book);
    }
    return returnBooksWithAuthor;
};
