

/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
const isArray = (arr) => {if (!(Array.isArray(arr))) throw "arr must be an array";}

const containstStringNum = (arr) => {
    //Check if each array element is a number, string, or subarray
    arr.forEach((element) => {
    if(typeof element == 'number' || typeof element == 'string' || Array.isArray(element)) {
    } else {throw "Each array element must be a number, a string, or a non-empty array"}
   
    //Check for subarrays
    if(Array.isArray(element)){
      if(typeof element[0] === 'undefined') throw "subarray cannot be empty"
      containstStringNum(element);
    } 
  })
}
export let mergeCommonElements = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  //Check if number of args is valid
  if(args.length < 2) throw "you must supply at least two arguments"
  //Check if input is a non-empty array containing strings or numbers using our helper above
  args.forEach((arr) => {
    isArray(arr);
    if (typeof arr[0] === 'undefined') throw "input array must not be empty"
    containstStringNum(arr);
  })
  
  let allArrays = []
  args.forEach((arr) =>{
    let temp = arr.flat(Infinity);
    allArrays.push(temp);
  })
 
  let dupes = allArrays.slice(1).reduce(function(result, currentArray){
    return currentArray.filter(function(currentItem){
      return result.indexOf(currentItem) !== -1;
    });
  }, allArrays[0]);

  return [...new Set(dupes)] //Bandaid fix to remove duplicates from final answer. Method found here: https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/

};

export let findTriangles = (arr) => {
  //Check if input is array
  isArray(arr);
  //Check if array contains anything
  if (typeof arr[0] === 'undefined') throw "input array must not be empty"
  //Check if input is a 2D array
  arr.forEach((value) =>{
    if(!(Array.isArray(value)) || value.length != 3) {
      throw 'Input array must be comporised of arrays containing 3 numbers'
    }
    value.forEach((element) => {
      if(typeof element != 'number'){
        throw 'Each element in triangle array should be a number'
      }
    })
  })

  //Check if valid triangle
  for(let i = 0; i < arr.length; i++){
    if(arr[i][0] + arr[i][1] < arr[i][2] || arr[i][0] + arr[i][2] < arr[i][1] || arr[i][2] + arr[i][1] < arr[i][0]){
      throw 'Each triangle must be a valid triangle'}
  }

  let triangleData = {};
  for(let i = 0; i < arr.length; i++){
    let area = 0;
    let perimeter = 0;
    arr[i].forEach((value) =>{
      perimeter += value;
    });
    
    //Since we don't know height, I used Heron's formula for the area of a triangle
    let herons = perimeter/2
    area = Math.sqrt(herons*(herons - arr[i][0])*(herons - arr[i][1])*(herons - arr[i][2]));
    
    let triangleType = ""
    if (arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2]){
      triangleType = "equilateral"
    } 
    else if(arr[i][0] == arr[i][1] || arr[i][1] == arr[i][2] || arr[i][0] == arr[i][2]){
      triangleType = "isosceles"
    } else {
      triangleType = "scalene"
    }

    triangleData[i] = [Math.round(area * 100) / 100, perimeter, triangleType]; 
  }


  return triangleData;

};

export let stringMetrics = (arr) => {
  isArray(arr);
  if(arr.length < 2) throw 'array must contain at least 2 strings'
  arr.forEach((element) => {
    if(typeof element !== 'string') throw 'all array elements must be of type string'

    if(element.trim().length === 0) throw 'string cannot be just empty space'
  })
  

  let vowelArr = ['a','e','i','o','u']
  let vowelCount = 0;
  let consonantCount = 0;
  let strLens =[];
  let longestLen = 0;
  let longest = [];
  let shortestLen = Infinity;
  let shortest = [];
  
  arr.forEach((string) => {
    for (let letter of string.toLowerCase()){
      if (vowelArr.includes(letter)){ 
        vowelCount++;
      }else{consonantCount++}
    }

    let stringLength = string.length;

    strLens.push(stringLength);

    if(stringLength == longestLen){
      longest.push(string);
    } 
    else if(stringLength > longestLen){
      longestLen = stringLength;
      longest = [];
      longest.push(string);
      
    }

    if(stringLength == shortestLen){
      shortest.push(string)
    } 
    else if(stringLength < shortestLen){
      shortestLen = stringLength;
      shortest = [];
      shortest.push(string);
    }
  });

  strLens = strLens.sort();

  let mean = array => {
    let total = 0;
    for(let i = 0; i < array.length; i++){
      total += array[i]
    }
    return Math.round((total/array.length) * 100) / 100
  }

  let median = array => {
    let length = array.length;
    if(length % 2 == 0){
      return (strLens[length/2 - 1] + strLens[length/2])/2;
    }
    return strLens[(length-1)/2];
  }

  let mode = array =>{ 
    let object = {};
    let seen = [];
    let count = 0;
    for(let i = 0; i < array.length; i++){ //[2,2,5,5,3]
      if(i==0){//first pass
        seen.push(array[i]);
        count++;
      }
      else if(i == array.length-1){//last pass
        if(seen.includes(array[i])){
          count++; 
          if(count in object){
            let temp = object[count];
            if(typeof temp == 'number'){
              temp = [temp];
            }
            temp = temp.push(array[i])
            
          }else{
            object[count] = [array[i]];
            
          }
        }else{
          if(count in object){
            let temp = object[count];
            if(typeof temp == 'number'){
              temp = [temp];
            }
            temp = temp.push(array[i-1])
           
          }else{
            object[count] = [array[i-1]];
          }
          count = 1;
          if(count in object){
            let temp = object[count];
            if(typeof temp == 'number'){
              temp = [temp];
            }
            temp = temp.push(array[i])
           
          }else{
            object[count] = [array[i]];
          }
        }  
      }
      else if(seen.includes(array[i])){ //symbol seen already
        count++;
      }
      else{ //new symbol
        if(count in object){
          let temp = object[count];
          if(typeof temp == 'number'){
            temp = [temp];
          }
          temp = temp.push(array[i-1])
          
          
        }else{
          object[count] = [array[i-1]];
        }
        count = 1;
        seen.push(array[i]);
      }
    } 
    
    let keycount = 0
    for(const key in object){
      keycount++;
    }
    if(keycount == 1){
      return null;
    } else{
      let lastkey = Object.keys(object)[Object.keys(object).length - 1];
      if(object[lastkey].length == 1){
        return object[lastkey][0]
      }
      else{return object[lastkey]}
    }
  }
  if(longest.length == 1){
    longest = longest[0];
  }
  if(shortest.length == 1){
    shortest = shortest[0];
  }
  let finalObject = {vowels: vowelCount, consonants: consonantCount, longest: longest, shortest: shortest, mean: mean(strLens), median: median(strLens), mode: mode(strLens)}
  return finalObject;
};
