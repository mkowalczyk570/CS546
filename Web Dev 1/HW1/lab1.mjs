export const questionOne = (arr) => {
  let numVowels = 0;
  let isEven = null;
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  arr.forEach((value) => {
    for (let letter of value.toLowerCase()){
      if (vowels.includes(letter)){ //.includes method found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
          numVowels++;
      }
    }
  })


  if(numVowels%2 == 0){
    isEven = true;
  } else{isEven = false}

  return [numVowels, isEven];
};
  
export const questionTwo = (obj1, obj2) => {
  var returnArray = [];
  for(const [key, val] of Object.entries(obj1)){ 
    //Checked if for of can be used on objects, used the following as reference
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    if(key in obj2){
      continue;
    } else{
      returnArray.push(key);
    }
  }

  for(const [key, val] of Object.entries(obj2)){
    if(key in obj1){
      continue;
    } else{
      returnArray.push(key);
    }
  }

  return returnArray.sort();

  
};

export const questionThree = (arr) => {
  var triangleData = {};
  for(var i = 0; i < arr.length; i++){
    var area = 0;
    var perimeter = 0;
    arr[i].forEach((value) =>{
      perimeter += value;
    });

    //Since we don't know height, I used Heron's formula for the area of a triangle
    var herons = perimeter/2
    area = Math.sqrt(herons*(herons - arr[i][0])*(herons - arr[i][1])*(herons - arr[i][2]));
    triangleData[i] = [Math.round(area * 100) / 100, perimeter]; 
  }
  return triangleData;
};

export const questionFour = (string) => {
  var tempArr = string.split(',');
  var finalArr = [];
  tempArr.forEach((word) =>{
    var middle = Math.round(word.length/2);
    var half1 = word.slice(0, middle);
    var half2 = word.slice(middle);
    finalArr.push(half2+half1);
  });
  return finalArr;
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Maciej',
  lastName: 'Kowalczyk',
  studentId: '10454755'
};