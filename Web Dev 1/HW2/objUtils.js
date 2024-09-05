/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
export let solvePuzzles = (puzzles, pieces) => {
      if(!Array.isArray(puzzles) || puzzles.length == 0){
            throw 'Puzzles must be a non-empty array'
      }
      for(let i = 0; i < puzzles.length; i++){
            if(typeof puzzles[i] != 'object' || Object.keys(puzzles[i]).length === 0){
                  throw 'All objects must contain at least 1 key/value pair'
            }
            for(let key in puzzles[i]){
                  if(!/^[a-e]{1}$/.test(key)){
                        throw 'Keys in puzzle objects must be a character a-e'
                  }else{continue}
            }
      }
      if(typeof pieces != 'object' || Object.keys(pieces).length === 0){
            throw 'All objects must contain at least 1 key/value pair'
            }
            for(let key in pieces){
                  if(!/^[a-e]{1}$/.test(key)){
                        throw 'Keys in puzzle objects must be a character a-e'
                  }else{continue}
      }

      let result = [];
      for(let i = 0; i < puzzles.length; i++){
            let solved = {}
            for(let key in pieces){
                  let currPuzzle = puzzles[i];
                  if(!(key in currPuzzle)){
                       solved[key] = pieces[key];  
                         
                  }else{
                       solved[key] = currPuzzle[key];
                  }
            }
            result.push(solved);
      }
      return result;

};

export let evaluatePokerHand = (hand, communityCards) => {
      if(!Array.isArray(hand) || hand.length != 2){
            throw 'Hand must be an array containing 2 card objects'
      }
      if(!Array.isArray(communityCards) || communityCards.length > 5 || communityCards.length < 3){
            throw 'communityCards must be an array containing 3 to 5 card objects'
      }

      let cardSuits = ['hearts','clubs','diamonds','spades'];
      let cardValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

      let handObj = hand[0];
      let communityCardobj = communityCards[0];
      for(let key in handObj){ 
            if(typeof handObj[key] != 'string'){throw 'Values must be of type string'} 
            if(key == 'suit' ||key == 'value'){ //check if keys are valid
                  if(cardSuits.includes(hand[key]) || cardValues.includes(hand[key])){continue} //if values are valid, move on
            }
            else{throw 'hand objects must contain only the keys "suit" and "value"'}
      }
      for(let key in communityCardobj){
            if(typeof communityCardobj[key] != 'string'){throw 'Values must be of type string'} 
            if(key == 'suit'||key == 'value'){ //check if keys are valid
                  if(cardSuits.includes(hand[key]) || cardValues.includes(hand[key])){continue} //if values are valid, move on
            } 
            else{throw 'communityCards objects must contain only the keys "suit" and "value" '}
      }

      
      let allAvailableCards = [...hand, ...communityCards];
      let paircount = 0;
      let pair = false;
      let threeoak = false;
      let straightFlush = false; 
      let sameSuit = new Set();
      for(let i = 0; i<allAvailableCards.length; i++){
            for(let j = 0; j<allAvailableCards.length; j++){
                  if(allAvailableCards[i] != allAvailableCards[j] && allAvailableCards[i]['value'] == allAvailableCards[j]['value']){
                        paircount++;
                  }
                  else if(allAvailableCards[i] != allAvailableCards[j] &&  allAvailableCards[i]['suit'] == allAvailableCards[j]['suit']){
                        sameSuit.add(allAvailableCards[i])
                  }
            }
            if(paircount == 1){pair = true}
            else if (paircount == 2){threeoak = true}
      }
      
      let values = [];
      if(sameSuit.size >= 5){
            sameSuit.forEach(card => {
                  if(card.value == 'J'){
                        values.push(11);
                  }
                  else if(card.value == 'Q'){
                        values.push(12);
                  }
                  else if(card.value == 'K'){
                        values.push(13);
                  }
                  else if(card.value == 'A'){
                        values.push(1);
                        values.push(14);
                  }else{values.push(parseInt(card['value']))}
            });
      }
      values.sort((a,b) => a-b); //Sorts an array numerically. Found here:https://medium.com/coding-at-dawn/how-to-sort-an-array-numerically-in-javascript-2b22710e3958
      for(let num = 0; num <= values.length; num++){
            if(values[num] != values.length-1){
                  if(values[num] + 1 == values[num+1]){
                        continue;
                  }else{break}
            }else{straightFlush = true}
      }

      if(straightFlush){return "Straight Flush"}
      else if(threeoak){return "Three of a Kind"}
      else if(pair){return "Pair"}
      else{return "High Card"}

      

};

export let combineObjects = (arr) => {
      if(!Array.isArray(arr) || arr.length < 2){
            throw 'Input must be an array of at least length 2'
      }
      for(let obj of arr){
            if(typeof obj != 'object' || Object.keys(obj).length === 0){
                  throw 'All objects must contain at least 1 key/value pair'
            }
      }

      let result = {};
      for(let key in arr[0]){ 
            for(let i = 1; i < arr.length; i++){ //check if key exists in ALL objects in arr
                  if(key in arr[i]){ 
                        if(i == arr.length-1){ 
                              result[key] = [];
                        }else{continue}

                  } else{break} 
            }
      }

      for(let key in result){ //iterate through all our keys, append their respective values from each object provided
            for(let obj of arr){
                  result[key].push(obj[key]);
            }
      }
      return result;
      

};
