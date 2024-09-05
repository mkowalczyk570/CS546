//Here is where you will do all of the logic and processing for the palindrome and prime checking.
(function (){
    function argcheck(arg){
        if (arg === undefined || arg.trim().length === 0)throw "Error: you must provide an input"
        return arg.trim()
    }

    function isPrime(n){
        if(n <= 1) return false
        for(let i=2, s=Math.sqrt(n); i<= s; i++){
            if(n%i ===0) return false;
        }
        return true;
    }

    function isPalindrome(str){
        str = argcheck(str);
        const strippedString = str.toLowerCase().replace(/[^0-9a-z]/gi, ''); //regex to strip non-alphanumeric chars found here: https://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string
        const reverse = strippedString.split('').reverse()
        return reverse.join('') === strippedString
    }

    function checkPalindromes(str){
        const palindromArr = str.split(',');
        let results = [];
        palindromArr.forEach((phrase) =>{
            results.push(isPalindrome(phrase))
        })

        const primeCheck = isPrime(results.length);

        return [results, primeCheck]
    }

    const palindromeForm = document.getElementById('palindrome-form');
    if(palindromeForm){
        const userinput = document.getElementById('palindrom_input');
        const errorText = document.getElementById('error');
        const results = document.getElementById('palindromes')
        
        palindromeForm.addEventListener('submit', (event) =>{
            event.preventDefault();
            try{
                const resultText = document.createElement('li');
                results.appendChild(resultText)
                //make containers hidden by default
                errorText.classList.add('hidden');
                resultText.classList.add('hidden');
                resultText.classList.remove('is-prime');
                resultText.classList.remove('not-prime');

                const userInputVal = userinput.value
                const result = checkPalindromes(userInputVal)

                resultText.textContent = result[0];
                if(result[1]){
                    resultText.classList.add('is-prime')
                } else{resultText.classList.add('not-prime')}
                resultText.classList.remove('hidden');
            }catch(e){
                errorText.textContent = e;
                errorText.classList.remove('hidden')
            }
        })
    }
})();