const exportedMethods ={
    stringCheck(arg){
        if(arg == undefined){
            throw 'You must provide a string input';
        }
        else if(typeof arg != 'string'){
            throw 'Input must be a string';
        }
        else if(arg.trim().length == 0){
            throw 'Input string cannot be empty space';
        }
        return arg.trim();
    },

    numCheck(arg){
        if(arg == undefined){
            throw 'You must provide a number input';
        }
        else if(typeof arg != 'number'){
            throw 'Input must be a number';
        }
    }
}

export default exportedMethods;