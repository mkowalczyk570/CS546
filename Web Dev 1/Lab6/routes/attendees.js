// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import  attendeeData from '../data/attendees.js';
import  validation  from '../helpers.js'

router
  .route('/:eventId')
  .get(async (req, res) => {
    try{
      req.params.eventId = validation.idCheck(req.params.eventId)
    } catch(e){
      res.status(400).json({error: e})
      return;
    }
    try{
      const attendees = await attendeeData.getAllAttendees(req.params.eventId);
      res.status(200).json(attendees)
    }catch(e){
      res.sendStatus(404).json({error: e})
      return;
    }
  })
  .post(async (req, res) => {
    const attendeePost = req.body;
    if(!attendeePost || Object.keys(attendeePost).length === 0){
      res.status(400).json({error: 'No fields in request body'})
      return;
    }
    try{
      req.params.eventId = validation.idCheck(req.params.eventId)
      attendeePost.firstName = validation.stringCheck(attendeePost.firstName)
      attendeePost.lastName = validation.stringCheck(attendeePost.lastName)
      attendeePost.emailAddress = validation.emailValidation(attendeePost.emailAddress)
      
    }catch(e){
      res.status(400).json({error: e})
      return;
    }

    try {
        const newAttendee = await attendeeData.createAttendee(
        req.params.eventId,
        attendeePost.firstName,
        attendeePost.lastName,
        attendeePost.emailAddress
      )
      res.status(200).json(newAttendee)
    }catch(e){
      res.status(404).json({error: e})
      return;
      
    }
  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    try{
      req.params.attendeeId = validation.idCheck(req.params.attendeeId)
    } catch(e){
      res.status(400).json({error: e})
      return;
    }
    try{
      const getAttendee = await attendeeData.getAttendee(req.params.attendeeId)
      res.status(200).json(getAttendee)
    }catch(e){
      res.status(404).json({error: e})
      return;
    }
  })
  .delete(async (req, res) => {
    try{
      let id = req.params.attendeeId;
      req.params.attendeeId = validation.idCheck(id)
    } catch(e){
      res.status(400).json({error: e})
      return;
    }
    try{
      const returnedData = await attendeeData.removeAttendee(req.params.attendeeId);
      res.status(200).json(returnedData);
    }catch(e){
      res.status(404).json({error: e})
      return;
    }
  })
  
export default router;