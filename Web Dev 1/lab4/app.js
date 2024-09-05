import {create, get, getAll, rename, remove, update } from "./data/events.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import { createAttendee, getAllAttendees, getAttendee, removeAttendee } from "./data/attendees.js";
/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/

const db = await dbConnection();
//await db.dropDatabase();
/*
let bowlingEvent = undefined;
let otherEvent = undefined;
let skateEvent = undefined;
let renamed = undefined;
let all = undefined;

try{
    bowlingEvent = await create("Maciej's bowling tournament", "A bowling tournament to showcase who is the best bowler", 
    {streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "mkowalcz@stevens.edu",
    10, 0, "10/31/2024", "10:00 PM", "11:00 PM", false);
    console.log(bowlingEvent)
}catch(e){
    console.log(e)
}
await createAttendee(bowlingEvent._id.toString(), "mac", "co", "c@c.ne")
await createAttendee(bowlingEvent._id.toString(), "ads", "dsdsdfs", "c123@c.ne")
console.log(await get(bowlingEvent._id.toString()))
*/

try{
    let attendees = await getAllAttendees("653f08b759b3b8dfec0e2c19")
    console.log(attendees)
}catch(e){
    console.log(e)
}

try{
    let attendee = await getAttendee("653f08b759b3b8dfec0e2c1b")
    console.log(attendee)
}catch(e){
    console.log(e)
}

try{
    const updated = await removeAttendee("653f08b759b3b8dfec0e2c1a")
    console.log(updated)
}catch(e){
    console.log(e)
}


/*try{
    otherEvent = await create("Breaking Bad Watch Party", "A watch party for Breaking Bad", 
    {streetAddress: "710 Jefferson St.", city: "Hoboken", state: "NJ", zip: "07030"}, "WaltuhWhite@aol.com",
    10, 0, "10/23/2024", "7:00 AM", "11:00 PM", true);
    console.log(otherEvent)
}catch(e){
    console.log(e)
}

try{
    const events = await getAll();
    console.log(events);
}catch(e){
    console.log(e);
}

try{
    skateEvent = await create("Longboard workshop", "A workshop to teach people how to build longboards", 
    {streetAddress: "100 34th Street", city: "New York City", state: "NY", zip: "21374"}, "Throckmorton@gmail.com",
    10, 0, "01/2/2025", "11:00 AM", "1:00 PM", true);
    console.log(skateEvent)
}catch(e){
    console.log(e)
}

try{
    renamed = await rename(bowlingEvent._id.toString(), "Stevens Bowling League");
    console.log(renamed);
}catch(e){
    console.log(e);
}

try{
    let confirm = await remove(bowlingEvent._id.toString());
    console.log(confirm);
}catch(e){
    console.log(e);
}

try{
    all = await getAll();
    console.log(all);
}catch(e){
    console.log(e);
}

try{
    bowlingEvent = await create(13, "A bowling tournament to showcase who is the best bowler", 
    {streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "mkowalcz@stevens.edu",
    10, 0, "10/31/2024", "7:00 PM", "11:00 PM", false);
    console.log(bowlingEvent)
}catch(e){
    console.log(e)
}

try{
    let confirm = await remove(bowlingEvent._id.toString());
    console.log(confirm);
}catch(e){
    console.log(e);
}

try{
    let renamed = await rename(bowlingEvent._id.toString(), "Bowling is dead");
    console.log(renamed);
}catch(e){
    console.log(e);
}

try{
    let renamed = await rename(bowlingEvent._id.toString(), "23");
    console.log(renamed);
}catch(e){
    console.log(e);
}

try{
    let got = await get(bowlingEvent._id.toString());
    console.log(got);
}catch(e){
    console.log(e);
}*/
closeConnection();
