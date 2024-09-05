// This data file should export all functions using the ES6 standard as shown in the lecture code
import {idCheck,stringCheck } from "../helpers.js";
import {get, update} from "./events.js"
import {ObjectId} from 'mongodb';
import { events } from "../config/mongoCollections.js";
const exportedMethods = {
  async createAttendee (eventId, firstName, lastName, emailAddress){
    if(!eventId || !firstName || !lastName || !emailAddress){throw 'You must provide all parameters'}
    idCheck(eventId);
    stringCheck(firstName)
    stringCheck(lastName)
    const emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if(!emailCheck.test(emailAddress)){throw 'emailAddress is not a valid email'}
    
    const event = await get(eventId);
    
    if (!event) {throw 'No event of provided eventId exists'}
    event.attendees.forEach((attendee) => {
      if(attendee.emailAddress == emailAddress) throw 'attendee with provided email already exists'
    })
    if(event.attendees.length >= event.maxCapacity){
      throw 'The event has already reached its max capacity'
    }
    let attendeeArray = event.attendees
    const newAttendee = {
      _id: new ObjectId(),
      firstName,
      lastName,
      emailAddress
    }
    attendeeArray.push(newAttendee)
    let count = event.totalNumberOfAttendees;
    count++;

    const updatedEvent = {
      attendees: attendeeArray,
      totalNumberOfAttendees: count
    };

    const eventCollection = await events();
    const updatedInfo = await eventCollection.updateOne(
      {_id: new ObjectId(eventId)},
      {$set: updatedEvent}
    );
    if (updatedInfo.modifiedCount === 0) throw 'Could not update event successfully'
    return await get(eventId);
  },

  async getAllAttendees(eventId){
    idCheck(eventId);
    const event = await get(eventId)
    if(!event) throw 'Event with provided id does not exist'
    return event.attendees
  },

  async getAttendee (attendeeId){
    idCheck(attendeeId);
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    let returnedAttendee = null;
    eventList.forEach((event) => {
      event.attendees.forEach((attendee) => {
        if (attendee._id.toString() == attendeeId){returnedAttendee = attendee}
      })
    })
    if(!returnedAttendee){throw 'no attendee with provided id'}
    return returnedAttendee;
  },

  async removeAttendee (attendeeId){
    idCheck(attendeeId);
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();
    let updatedAttendeeArray = []
    for await (const event of eventList) {
      for (const attendee of event.attendees) {
        if (attendee._id.toString() !== attendeeId){updatedAttendeeArray.push(attendee)}
      }
      if(updatedAttendeeArray.length == event.totalNumberOfAttendees){throw 'could not remove attendee'}
      let count = event.totalNumberOfAttendees;
      count--;
      const updatedevent = await eventCollection.findOneAndUpdate({_id: event._id}, {$set:{
        attendees: updatedAttendeeArray,
        totalNumberOfAttendees: count
      }},
      {returnDocument: 'after'})
      return updatedevent;
    }
  }
}

export default exportedMethods;