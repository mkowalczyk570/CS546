//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import{
    stringCheck,
    numCheck,
    getBooks,
    getAuthors,
    bookFinder,
    authorFinder
}from './helpers.js'


export const getAuthorById = async (id) => {
    const Authors = await getAuthors();
    stringCheck(id);
    let foundAuthor = await authorFinder(id)
    if(JSON.stringify(foundAuthor) == '{}'){
        throw 'Author not found'
    }else{return foundAuthor}
};

export const searchAuthorByName = async (searchTerm) => {
    const Authors = await getAuthors();
    stringCheck(searchTerm);
    searchTerm = searchTerm.toLowerCase();
    let foundAuthors = [];
    Authors.forEach((author) => {
        let Fname = author.first_name.toLowerCase();
        let Lname = author.last_name.toLowerCase();
        if(Fname.includes(searchTerm) || Lname.includes(searchTerm)){
            foundAuthors.push(author.last_name + " " + author.first_name)
        }
    })
    let returnAuthors = []
    if(foundAuthors.length == 0){
        throw 'No authors found'
    }else{
        foundAuthors.sort();
        
        for(let author in foundAuthors){
            let name = foundAuthors[author].split(" ")
            returnAuthors.push(name[1] + " " + name[0]);
        }
        return returnAuthors
    }
};

export const getBookNames = async (firstName, lastName) => {
    const Authors = await getAuthors();
    stringCheck(firstName);
    stringCheck(lastName);
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    let bookIDs = [];
    Authors.forEach((author) =>{
        let fName = author.first_name.toLowerCase();
        let lName = author.last_name.toLowerCase();
        if(firstName == fName && lastName == lName){
            for(let i = 0; i<author.books.length; i++){
                bookIDs.push(author.books[i])
            }
        }
    })
    if(bookIDs.length == 0){
        throw 'Author has not written any books'
    }else{
        let returnbooks = []
        const allBooks = await getBooks();
        for(let i = 0; i < bookIDs.length; i++){
            allBooks.forEach((book) => {
                if(bookIDs[i] == book.id){
                    returnbooks.push(book.title);
                }
            })
        }
        return returnbooks.sort()
    }
};
const ageHelper = (dateOfBirth) => { //found here: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
    const today = new Date();
    const bDay = new Date(dateOfBirth);
    let age = today.getFullYear() - bDay.getFullYear();
    let month = today.getMonth() - bDay.getMonth();
    if(month < 0 || (month == 0 && today.getDate() < bDay.getDate())){
        age--;
    }
    return age;
}

export const youngestOldest = async () => {
    const Authors = await getAuthors();
    let youngest = [];
    let oldest = [];
    let youngestAge = 1000;
    let oldestAge = 0;
    Authors.forEach((author) =>{
        const age = ageHelper(author.date_of_birth);
        if(youngest.length == 0 || age < youngestAge){
            youngest = [author.first_name + " " + author.last_name];
            youngestAge = age;
        }
        else if (age == youngestAge){
            youngest.push(author.first_name + " " + author.last_name)
        }

        if(oldest.length == 0 || age > oldestAge){
            oldest = [author.last_name + " " + author.first_name];
            oldestAge = age;
        }
        else if (age == oldestAge){
            oldest.push(author.last_name + " " + author.first_name)
        }
    })
    
    let returnobj = {}
    if(youngest.length == 1){
        returnobj.youngest = youngest[0];
    } else{
        youngest.sort()
        let returnYoung = []
        for(let author in youngest){
            let name = youngest[author].split(" ")
            returnYoung.push(name[1] + " " + name[0]);
        }
        returnobj.youngest = returnYoung;
    }
    if(oldest.length == 1){
        returnobj.oldest = toString(oldest[0]);
    } else{
        oldest.sort()
        let returnOld = []
        for(let author in oldest){
            let name = oldest[author].split(" ")
            returnOld.push(name[1] + " " + name[0]);
        }
        returnobj.oldest = returnOld;
    }
    
    
    return returnobj
};


export const sameBirthday = async (month, day) => {
    const Authors = await getAuthors();
    numCheck(month);
    numCheck(day);
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
    if(month < 1){
        throw 'Month cannot be < 1'
    } 
    else if(month > 12){
        throw 'Month cannot be > 12'
    }
    if(day > daysInMonth[month-1]){
        throw 'There are not ' + day + ' days in ' + months[month-1]
    }
    else if(day < 1){
        throw 'Day cannot be < 1'
    }

    //filter tutorial found here: https://www.geeksforgeeks.org/how-to-filter-object-array-based-on-attributes/#
    let matchingBdays = Authors.filter(author => {
        const birthDay = new Date(author.date_of_birth);
        return (birthDay.getMonth() + 1 == month && birthDay.getDate() == day); 
        //for some reason, getMonth counts the months starting at 0. https://stackoverflow.com/questions/18624326/getmonth-in-javascript-gives-previous-month
    })

    let returnarr = [];
    matchingBdays.forEach((author) =>{
        returnarr.push(author.first_name + " " + author.last_name);
    })

    if(matchingBdays.length < 2){
        throw 'No two authors share this birthday'
    }else{return returnarr}

};
