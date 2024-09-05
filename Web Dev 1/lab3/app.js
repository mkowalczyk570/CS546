/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import {
    getAuthorById,
    searchAuthorByName,
    getBookNames,
    youngestOldest,
    sameBirthday,
}from './authors.js'


import {
    getBookById,
    getAuthorName,
    sameGenre,
    priceRange,
    getAllBooksWithAuthorName
}from './books.js'


try{
    const author = await getAuthorById("1871e6d 7-551f-41cb-9a07-08240b86c95c");
    console.log(author)
} catch(e){
    console.log(e)
}
try{
    const author = await getAuthorById(-1);
    console.log(author)
} catch(e){
    console.log(e)
}
try{
    const author = await getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');
    console.log(author)
} catch(e){
    console.log(e)
}

try{
    const authors = await searchAuthorByName('Tom');
    console.log(authors)
} catch(e){
    console.log(e)
}
try{
    const authors = await searchAuthorByName(123);
    console.log(authors)
} catch(e){
    console.log(e)
}

try{
    const books = await getBookNames("Prisca", "Vakhonin");
    console.log(books)
} catch(e){
    console.log(e)
}

try{
    const books = await getBookNames("Perrine", "Greenough");
    console.log(books)
} catch(e){
    console.log(e)
}

try{
    const youngOld = await youngestOldest()
    console.log(youngOld);
} catch(e){
    console.log(e)
}

try{
    const shared = await sameBirthday(10, 12)
    console.log(shared);
} catch(e){
    console.log(e)
}

try{
    const shared = await sameBirthday(1, 32)
    console.log(shared);
} catch(e){
    console.log(e)
}

try{
    const book = await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e")
    console.log(book)
} catch(e){
    console.log(e)
}

try{
    const book = await getBookById("123123")
    console.log(book)
} catch(e){
    console.log(e)
}

try{
    const author = await getAuthorName("519c733a-6a5d-451f-927d-0e860b5d1e3d")
    console.log(author)
} catch(e){
    console.log(e)
}

try{
    const author = await getAuthorName(1235)
    console.log(author)
} catch(e){
    console.log(e)
}

try{
    const books = await sameGenre('Gothic');
    console.log(books)
}catch(e){
    console.log(e)
}

try{
    const books = await sameGenre(true);
    console.log(books)
}catch(e){
    console.log(e)
}

try{
    const books = await priceRange(1.50, 10);
    console.log(books)
}catch(e){
    console.log(e);
}

try{
    const books = await priceRange(true, 10);
    console.log(books)
}catch(e){
    console.log(e);
}


try{
    const books = await getAllBooksWithAuthorName();
    console.log(books);
}catch(e){
    console.log(e)
}
