// TODO: Export and implement the following functions in ES6 format
import { stringCheck, inputCheck } from "../helpers.js";
import { events } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';

export const get = async (id) => {
  if(!id) throw 'You must provide an id to search for'
  stringCheck(id)
  if(!ObjectId.isValid(id)) throw 'invalid object Id'
  const eventCollection = await events();
  const event = await eventCollection.findOne({_id: new ObjectId(id)});
  if(event === null) throw `No event with id: ${id}`
  event._id = event._id.toString();
  return event;

};
export const create = async (
  eventName, 
  eventDescription, 
  eventLocation, 
  contactEmail, 
  maxCapacity, 
  priceOfAdmission, 
  eventDate, 
  startTime, 
  endTime, 
  publicEvent
) => {
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
    publicEvent);
  
  let newEvent = {
  eventName, 
  eventDescription, 
  eventLocation, 
  contactEmail, 
  maxCapacity, 
  priceOfAdmission, 
  eventDate, 
  startTime, 
  endTime, 
  publicEvent,
  attendees: [],
  totalNumberOfAttendees: 0

  };

  const eventCollection = await events();
  const insertInfo = await eventCollection.insertOne(newEvent);
  if(!insertInfo.acknowledged || !insertInfo.insertedId){throw 'Could not add event'};
  const newId = insertInfo.insertedId.toString();
  const event = await get(newId);
  return event;

};

export const getAll = async () => {
  const eventCollection = await events();
  let eventsList = await eventCollection.find({}).toArray();
  if(!eventsList) throw 'Could not get all events'
  eventsList = eventsList.map((element) =>{
    element._id = element._id.toString();
    return element;
  })
  return eventsList;
};

export const remove = async (id) => {
  if(!id)throw 'you must provide an id to search for'
  stringCheck(id)
  if(!ObjectId.isValid(id)) throw 'invalid object Id'
  const eventCollection = await events();
  const deletionInfo = await eventCollection.findOneAndDelete({_id:new ObjectId(id)});

  if(!deletionInfo) throw `No event with id: ${id}`;
  let deletion = {
    eventName: deletionInfo.eventName,
    deleted: true
  };
  return deletion;
};

export const rename = async (id, newEventName) => {
  if(!id) throw 'You must provide an id to search for'
  id = stringCheck(id);
  if(!ObjectId.isValid(id)) throw 'invalid object Id'
  newEventName = stringCheck(newEventName);
  if(!newEventName) throw 'You must provide a newEventName'
  if(newEventName.length < 5) throw 'newEventName must be at least 5 characters in length'
  const eventCollection = await events();
  const exists = await get(id);
  if(exists.eventName === newEventName) throw 'newEventName cannot be the same as the pre-existing eventName'

  const updatedInfo = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: {eventName: newEventName}},
    {returnDocument: 'after'}
  );
  if(updatedInfo.modifiedCount === 0) throw 'could not update event successfully'
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;

};
export const update = async (
  eventId,
  neweventName,
  neweventDescription,
  neweventLocation,
  newcontactEmail,
  newmaxCapacity,
  newpriceOfAdmission,
  neweventDate,
  newstartTime,
  newendTime,
  newpublicEvent
) => {
  if(!ObjectId.isValid(eventId)) throw 'invalid object Id'
  inputCheck(
    neweventName,
    neweventDescription,
    neweventLocation,
    newcontactEmail,
    newmaxCapacity,
    newpriceOfAdmission,
    neweventDate,
    newstartTime,
    newendTime,
    newpublicEvent
  );

  const updatedEvent = {
    eventName: neweventName,
    eventDescription: neweventDescription,
    eventLocation: neweventLocation,
    contactEmail: newcontactEmail,
    maxCapacity: newmaxCapacity,
    priceOfAdmission: newpriceOfAdmission,
    eventDate: neweventDate,
    startTime: newstartTime,
    endTime: newendTime,
    publicEvent: newpublicEvent
  }

  const eventCollection = await events();
  const updatedInfo = await eventCollection.updateOne(
    {_id: new ObjectId(eventId)},
    {$set: updatedEvent},
    {returnDocument: "after"}
  );
  if(updatedInfo.modifiedCount === 0) throw 'could not update event successfully'
  return await get(eventId)
};
