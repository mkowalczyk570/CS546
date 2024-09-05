//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';


const exportedMethods = {
  stringCheck(arg){
    if(arg == undefined){
        throw `You must provide a string input for your parameter ${arg}`;
    }
    else if(typeof arg !== 'string'){
        throw `${arg} must be a string`;
    }
    else if(arg.trim().length == 0){
        throw `string inputs cannot be empty space`;
    }
    return arg.trim();
  },

  numCheck(arg){
    if(arg == undefined){
        throw `You must provide a number input for maxCapacity and priceOfAdmission`;
    }
    else if(typeof arg !== 'number'){
        throw `${arg} must be a number`;
    }
  },
  idCheck(id){
    if(!id) throw 'You must provide an id to search for'
    if(!ObjectId.isValid(id)) throw 'invalid object Id'
    return id;
  },
  inputCheck(
    eventName, 
    eventDescription, 
    eventLocation, 
    contactEmail, 
    maxCapacity, 
    priceOfAdmission, 
    eventDate, 
    startTime, 
    endTime, 
    publicEvent){
    if(!eventName|| !eventDescription|| !eventLocation|| !contactEmail|| maxCapacity === undefined ||
        priceOfAdmission === undefined || !eventDate || !startTime || !endTime || publicEvent === undefined){
          throw 'All fields must have a value'
        }
      eventName = this.stringCheck(eventName);
      eventDescription = this.stringCheck(eventDescription);
      contactEmail = this.stringCheck(contactEmail);
      eventDate = this.stringCheck(eventDate);
      startTime = this.stringCheck(startTime);
      endTime = this.stringCheck(endTime);
      
      if(eventName.length < 5){throw 'eventName must be at least 5 characters'}
      if(eventDescription.length < 25){throw 'eventDescription must be at least 25 characters in length'}
    
      this.emailValidation(contactEmail)
    
      const currDate = new Date();
      const inputDate = new Date(eventDate);
      if(inputDate <= currDate){throw 'eventDate must take place in the future'}
    
      const timeCheck = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/
      if(!timeCheck.test(startTime)){throw 'startTime must be in a valid 12-hour AM/PM format'}
      if(!timeCheck.test(endTime)){throw 'endTime must be in a valid 12-hour AM/PM format'}
      
      let [hours,minutes] = startTime.split(":")
      hours = parseInt(hours)
      if (minutes.slice(3,5) == "PM" && hours !== 12){hours += hours}
      if (minutes.slice(3,5) == "AM" && hours === 12){hours -= 12}
      minutes = minutes.slice(0,2)
      const startTimeCheck = new Date(2000,1,1,hours,minutes,0);
      [hours,minutes] = endTime.split(":")
      hours = parseInt(hours)
      if (minutes.slice(3,5) == "PM"){hours += hours}
      if (minutes.slice(3,5) == "AM" && hours === 12){hours = 0}
      minutes = minutes.slice(0,2)
      const endTimeCheck = new Date(2000,1,1,hours,minutes,0);
      if(startTimeCheck >= endTimeCheck){throw 'startTime cannot be later than the endtime'}
      if(((endTimeCheck-startTimeCheck)/60000) < 30){throw 'endTime must be at least 30 minutes past startTime'}
      
      if(typeof publicEvent !== 'boolean'){throw 'publicEvent must be a boolean'}
      this.numCheck(maxCapacity);
      this.numCheck(priceOfAdmission);
    
      if(maxCapacity < 0 || !Number.isInteger(maxCapacity)){throw 'maxCapacity must be a positive integer'}
      if(priceOfAdmission < 0 || (priceOfAdmission * 100) % 1 !== 0){throw 'priceOfAdmission must be a positive number with up to 2 decimals'}
      if(typeof eventLocation !== 'object'){throw 'eventLocation must be an object'}
    
      if(!eventLocation.streetAddress || !eventLocation.city || !eventLocation.state || !eventLocation.zip){
        throw 'eventLocation must contain a street address, city, state, and zip'
      }
      if (
        typeof eventLocation.streetAddress !== "string" ||
        eventLocation.streetAddress.length < 3
      ) {
        throw new Error("eventLocation.streetAddress is invalid");
      }
    
      if (typeof eventLocation.city !== "string" || eventLocation.city.length < 3) {
        throw new Error("eventLocation.city is invalid");
      }
      const stateAbbreviations = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
        "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
      ];
      if (!stateAbbreviations.includes(eventLocation.state)) {
        throw new Error("eventLocation.state is not a valid state abbreviation");
      }
      const zipRegex = /^\d{5}$/;
      if (!zipRegex.test(eventLocation.zip)) {
        throw new Error("eventLocation.zip is not a valid 5-digit zip code");
      }
  },
  emailValidation(email){
  this.stringCheck(email)
    const emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if(!emailCheck.test(email)){throw 'emailAddress is not a valid email'}
    return email;
  }
  
}

export default exportedMethods;