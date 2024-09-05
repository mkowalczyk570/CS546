/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import {
    findTriangles,
    mergeCommonElements,
    stringMetrics
} from './arrayUtils.js'
import{
    emojiCounter,
    sortStockPrices,
    mashUp
} from './stringUtils.js'

import{
    solvePuzzles,
    evaluatePokerHand,
    combineObjects
} from './objUtils.js'

try{    
    mergeCommonElements(["apple", "apple"], ["apple", "apple", "banana"], ["apple", "apple", "mango"]);    
    console.log("mergeCommonElements passed successfully");
} catch(e) {
    console.log("mergeCommonElementsfailed test case");
}
try{    
    mergeCommonElements([3, 4, [5, "apple"]]); 
    console.log("mergeCommonElements passed successfully");
} catch(e) {
    console.log("mergeCommonElements failed test case");
}

try{    
    findTriangles([[3,3,3], [3,3,4], [5,4,2]]);
    console.log("findTriangles passed successfully");
} catch(e) {
    console.log("findTriangles failed test case");
}
try{    
    findTriangles([[7,5,5], [2,3,"string"], [12,12,11]]);    
    console.log("findTriangles passed successfully");
} catch(e) {
    console.log("findTriangles failed test case");
}

try{
    stringMetrics(["hi","hi","hello","hello","bye","bye","i","i","ihjegji"])
    console.log("stringMetrics passed successfully");
} catch(e){
    console.log("stringMetrics failed test case");
}
try{
    stringMetrics(1023)
    console.log("stringMetrics passed successfully");
} catch(e){
    console.log("stringMetrics failed test case");
}

try{    
    emojiCounter(":s:s:::::s");
    console.log("emojiCounter passed successfully")
}catch(e){
    console.log("emojiCounter failed test case");
}
try{    
    emojiCounter("");
    console.log("emojiCounter passed successfully")
}catch(e){
    console.log("emojiCounter failed test case");
}


let lastStocks = `AAPL,175.25|GOOG,135.40|amzn,140.00`;
let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
try{
    sortStockPrices(lastStocks,currStocks);
    console.log("sortStockPrices passed successfully")
}catch(e){
    console.log("sortStockPrices failed test case")
}

lastStocks = `AAPL,175.25|GOOG,135.40|amzn,140.00|EXX,123.42`;
currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
try{
    sortStockPrices(lastStocks,currStocks);
    console.log("sortStockPrices passed successfully")
}catch(e){
    console.log("sortStockPrices failed test case")
}

try{
    mashUp("Patrick", "Hill");
    console.log("mashUp passed successfully");
}catch(e){
    console.log("mashUp failed test case")
}
try{
    mashUp(["Patrick", "Hill"]);
    console.log("mashUp passed successfully");
}catch(e){
    console.log("mashUp failed test case")
}

try{
    solvePuzzles([{b: "tree", d: "patrick"}], {a: "house", b: "apple", c: 50, d: 100, e:200});
    console.log("solvePuzzles passed successfully");
}catch(e){
    console.log("solvePuzzles failed test case");
}
try{
    solvePuzzles([{a: 23, b: 17, d: 2}, {b: 17, d: 3, e: "hello"}], {a: 45, b: 60, 4:-3, d: 88, e: 12})
    console.log("solvePuzzles passed successfully");
}catch(e){
    console.log("solvePuzzles failed test case");
}

let hand = [{suit: 'hearts', value: '2'}, {suit: 'hearts', value: '3'}];
let communityCards = [
  {suit: 'hearts', value: '4'},
  {suit: 'hearts', value: '5'},
  {suit: 'hearts', value: '6'}
];
try{
    evaluatePokerHand(hand, communityCards);
    console.log("evaluatePokerHand passed successfully");
}catch(e){
    console.log("evaluatePokerHand failed test case");
}

hand = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '5'}];
communityCards = [
  {suit: 'diamonds', value: true},
  {suit: 'spades', value: '5'},
  {suit: 'hearts', value: '2'},
  {suit: 'clubs', value: 'J'},
  {suit: 'diamonds', value: 'Q'}
];
try{
    evaluatePokerHand(hand, communityCards);
    console.log("evaluatePokerHand passed successfully");
}catch(e){
    console.log("evaluatePokerHand failed test case");
}

try{
    combineObjects(
    [  { a: 3, b: 7, c: 5 , d:7},
      { d: 4, c: 2, e: 9, a:"apple" },
       ]
    );
    console.log("combineObjects passed successfully");
}catch(e){
    console.log("combineObjects failed test cases");
}
try{
    combineObjects(
    [  { a: 3, b: 7, c: 5 , d:7},
      {},
       ]
    );
    console.log("combineObjects passed successfully");
}catch(e){
    console.log("combineObjects failed test cases");
}
    