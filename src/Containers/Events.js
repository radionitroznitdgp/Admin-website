import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import {Container,Form,Button} from 'react-bootstrap'
import {useState} from 'react'

import {setDoc ,doc, onSnapshot, addDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {db} from '../firebase'
import { getStorage, ref,uploadBytes } from "firebase/storage";
function Events() {
const [eventName,setName] = useState("")
const [description,setDescription] = useState("")
const [file,setFile] = useState("")
const EventData = { Event_Name : eventName,
    Description : description}
const submitbtn = document.getElementById("submit")
const submit = async(e) =>{
e.preventDefault();
submitbtn.innerHTML = "<i class='fa fa-spinner fa-spin'></i> Submitting";
  console.log(eventName)
console.log(description)
try{
  
   const docref = doc(db,'Main','Events')
   await updateDoc(docref,{EventList : arrayUnion(EventData)})
   const storage = getStorage()
  
  const storageRef = ref(storage,`Events/${eventName}.jpg`)
 uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
  submitbtn.innerHTML = "Submitted";
  alert("Data Uploaded Succesfully")
  document.getElementById("form").reset();
  submitbtn.innerHTML = "Submit";
}catch(e){
  console.log(e)
}
}



  return (
    <>
   <Navbar/>
  
     <Container className='Container-FormBox py-4 px-lg-5 my-3'>
    <Form method='post' autoComplete='off' noValidate validated onSubmit={submit} id='form'>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className='text-white'>Enter Event Name</Form.Label>
        <Form.Control type="text" placeholder="Event Name" onChange={(e)=>{setName(e.target.value)}} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className='text-white'>Enter Event Description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>{setDescription(e.target.value)}} required/>
      </Form.Group>
       <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='text-white'> Upload A Event Poster </Form.Label>
        <Form.Control type="file" onChange={(e)=>{setFile(e.target.files[0])}} required/>
       
      </Form.Group>
      <Button variant="primary" id='submit' type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    </>
  )
}

export default Events