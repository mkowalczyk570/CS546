// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import  eventData  from '../data/events.js';
import  validation  from '../helpers.js'

router
  .route('/')
  .get(async (req, res) => {
    try{
      let eventList = await eventData.getAll();
      const r = eventList.map(({_id, eventName}) =>{
        return {_id, eventName}
      })

      res.status(200).json(r)
    }catch(e){
      res.sendStatus(400)
      return;
    }
  })
  .post(async (req, res) => {
    const eventPost = req.body;
    try{
      validation.inputCheck(
        eventPost.eventName, 
        eventPost.eventDescription,
        eventPost.eventLocation,
        eventPost.contactEmail,
        eventPost.maxCapacity,
        eventPost.priceOfAdmission,
        eventPost.eventDate,
        eventPost.startTime,
        eventPost.endTime,
        eventPost.publicEvent
        )
    }catch(e){
      res.status(400).json({error: e})
      return;
    }

    try {
      const newEvent = await eventData.create(eventPost.eventName, 
        eventPost.eventDescription,
        eventPost.eventLocation,
        eventPost.contactEmail,
        eventPost.maxCapacity,
        eventPost.priceOfAdmission,
        eventPost.eventDate,
        eventPost.startTime,
        eventPost.endTime,
        eventPost.publicEvent)

        res.status(200).json(newEvent)
    }catch(e){
      res.status(400).json({error: e})
      return;
    }
  });

router
  .route('/:eventId')
  .get(async (req, res) => {
    try{
      validation.idCheck(req.params.eventId)
    }catch(e){
      res.status(400).json({error: e})
      return;
    }

    try{
      const foundEvent = await eventData.get(req.params.eventId);
      res.status(200).json(foundEvent)
    }catch(e){
      res.status(404).json({error:e})
      return;
    }
  })
  .put(async (req, res) => {
    const eventUpdate = req.body;
    try{
      validation.inputCheck(eventUpdate.eventName, 
        eventUpdate.eventDescription,
        eventUpdate.eventLocation,
        eventUpdate.contactEmail,
        eventUpdate.maxCapacity,
        eventUpdate.priceOfAdmission,
        eventUpdate.eventDate,
        eventUpdate.startTime,
        eventUpdate.endTime,
        eventUpdate.publicEvent
      )
      validation.idCheck(req.params.eventId)
    }catch(e){
      res.status(400).json({error:e})
      return;
    }
    try{
      const updated = await eventData.update(
        req.params.eventId, 
        eventUpdate.eventName, 
        eventUpdate.eventDescription,
        eventUpdate.eventLocation,
        eventUpdate.contactEmail,
        eventUpdate.maxCapacity,
        eventUpdate.priceOfAdmission,
        eventUpdate.eventDate,
        eventUpdate.startTime,
        eventUpdate.endTime,
        eventUpdate.publicEvent )
        res.status(200).json(updated)
    } catch(e){
      res.status(404).json({error: e})
      return;
    }
   
  })
  .delete(async (req, res) => {
    try{
      validation.idCheck(req.params.eventId)
    }catch(e){
      res.status(400).json({error:e})
      return;
    }
    try{
      const returnedData = await eventData.remove(req.params.eventId);
      res.status(200).json(returnedData)
    }catch(e){
      res.status(404).json({error: e})
      return;
    }
  });
  
export default router;