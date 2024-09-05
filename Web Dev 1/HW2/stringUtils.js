/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let emojiCounter = (message) => {
      if(typeof message != 'string') throw 'input must be a string'
      if(message.trim().length === 0) throw 'string cannot be just empty space'

      let emojiCount = 0;
      let currDebugSymbol = "";
      for(let i = 0; i<message.length; i++){
            currDebugSymbol = message[i];
            if(message[i] == ":"){ //if the current character is : 
                  if(message[i+1] == ":"){//if the next character is a :, empty emoji, skip.
                  continue;
                  }else{ //next character is a letter
                        let next = i+1;
                        while(next < message.length && message[next] != ":"){ //iterate through string until we see another colon
                              next++;
                        }
                        //We enter this logic if we break the conditions of the loop, meaning we found the closing colon to our emoji.
                        if(next < message.length){ //make sure we aren't outside the bounds of the string
                              emojiCount++;
                              i = next; //makes sure we skip the closing colon
                        } else{
                              i++;}
                  }
            } else{continue} //go until we see another colon
      }
      return emojiCount;
};

/*
Helper to parse the string containing stocks and prices. Uses regex to make ensure correct format. 
Returns an object containing key value pairs of the form 
{TICKER: Price}
*/
let stockFormatHelper = (string) =>{
      let stocks = {};
      string = string.toUpperCase();
      let pairsArr = string.split('|');
      for(let pair of pairsArr){
            let [ticker, price] = pair.split(',');
            if(!/^[A-Z]{1,5}$/.test(ticker)){  //Looked up how to use RegEx to test for valid input. Found here: https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
                  throw 'Stock ticker must only contain letters a-z and its length must be >=1 and <=5';
            }
            if(!/[+-]?([0-9]*[.])?[0-9]+/.test(price)){ //Found the regex for floats here: https://stackoverflow.com/questions/10256061/regular-expression-for-finding-decimal-float-numbers
                  throw 'Stock price must be a valid float number';
            } 
            stocks[ticker] = Number(parseFloat(price).toFixed(2));
      }
      return stocks;

      

}
export let sortStockPrices = (lastStocks, currStocks) => {
      if(typeof lastStocks != 'string' || typeof currStocks != 'string'){
            throw 'Both inputs must be a string';
      }

      let lastStocksObject = stockFormatHelper(lastStocks);
      let currStocksObject = stockFormatHelper(currStocks);

      //Wanted to see if there was an easy method for comparing JUST the keys in objects. Found this: https://stackoverflow.com/questions/14368596/how-can-i-check-that-two-objects-have-the-same-set-of-property-names
      let lastkeys = Object.keys(lastStocksObject).sort(); //Make sure to sort so we can directly compare them later
      let currkeys = Object.keys(currStocksObject).sort();
      if(JSON.stringify(lastkeys) != JSON.stringify(currkeys)){
            throw 'Both inputs must contain the same stock ticker/price pairs and be of form (Stock,ticker|Stock,ticker|...)'
      }

      
      
      let results = [];
      for(let ticker in lastStocksObject){
            let currPrice = currStocksObject[ticker]
            let percentChange = ((currPrice - lastStocksObject[ticker]) / lastStocksObject[ticker]) * 100;
            let obj = {symbol: ticker, price: currStocksObject[ticker], change: Math.round(percentChange * 10)/10}
            results.push(obj);
      }
      return results;

      
};

export let mashUp = (string1, string2) => {
      if(string1.length < 4 || string2.length < 4){
            throw 'Both strings must be at least length 4'
      }
      if(string1.trim().length === 0 || string2.trim().length === 0){
            throw 'String cannot be just empty space'
      }
      if(typeof string1 !== 'string' || typeof string2 !== 'string'){
            throw 'Input must be of type string'
      }

      let string1start = string1.slice(0,4);
      let string1rest = string1.slice(4);
      let string2start = string2.slice(0,4);
      let string2rest = string2.slice(4);

      return string2start + string1rest + " " + string1start + string2rest;

};
