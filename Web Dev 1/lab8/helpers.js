const exportedMethods = {
    stringCheck(arg){
      if(arg == undefined || arg.trim().length == 0){
          throw `You must provide a string input for character name`;
      }
      else if(typeof arg !== 'string'){
          throw `Character name must be a string!`;
      }
      return arg.trim();
    },
  
    numCheck(arg){
      if(arg == undefined){
          throw `You must provide a searchable character id`;
      }
      const check = parseInt(arg)
      if(Number.isNaN(check)){
          throw `Character id must be a number`;
      }
      return arg;
    }
}

export default exportedMethods;