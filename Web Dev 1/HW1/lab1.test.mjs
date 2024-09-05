import * as lab1 from './lab1.mjs';
//TODO: Write and call each function in lab1.js 5 times each, passing in different input

console.log(lab1.questionOne(["Hello", "World"]));
console.log(lab1.questionOne(["I", "like", "video", "games"]));
console.log(lab1.questionOne(["A", "E", "I", "O", "U"]));
console.log(lab1.questionOne(["How", "many", "days", "till", "Halloween?"]));
console.log(lab1.questionOne(["Hockey", "is", "better", "than", "baseball"]));

console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); //returns ["d", "e"]
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })); // returns ["a","b","c","d","e","f"]
console.log(lab1.questionTwo( {'1': true, a: 5, '2': 'hi'}, {'3': true, b: 5, '44': "hi", '4': "bye", '5': 8})); // returns ['1', '2', '3', '4', '5', '44', 'a', 'b'] )
console.log(lab1.questionTwo({A:23, b: 44}, {'2': null, '98': undefined, true: false}));
console.log(lab1.questionTwo({A: 'b', B: ''}, {A: 'c', B: 'b'}));


console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]]))  // returns {'0': [3.9,9], '1': [4.47,10], '2': [3.8,11]}
console.log(lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]))   // returns {'0': [12.5, 17], '1': [2.9,9], '2': [14.98,19], '3': [58.66,35]}  
console.log(lab1.questionThree([[3,2,1], [7,5,5]]))
console.log(lab1.questionThree([[30,30,55], [2,2,2], [31,13,31], [6,7,6], [10,15,20], [2,2,1]]))
console.log(lab1.questionThree([]));

console.log(lab1.questionFour('Hello,I,Am,Maciej'));
console.log(lab1.questionFour('patrick,hill,trees,home'));  //should return and then log ['rickpat', 'llhi', 'eestr', 'meho'] 
console.log(lab1.questionFour('joseph,ball,square,pencil'));  //should return and then log ['ephjos', 'llba', 'aresqu', 'cilpen']  
console.log(lab1.questionFour('Hockey,Baseball,Bowling'))
console.log(lab1.questionFour(''))