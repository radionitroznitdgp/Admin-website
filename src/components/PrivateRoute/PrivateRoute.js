import React from 'react'
import {useEffect} from 'react';
import {useState} from 'react';
import {Navigate} from 'react-router-dom'
import {auth} from '../../firebase';

  window.isUser = auth.currentUser != null ? true : false;
//  const isUser = () =>{
// if(auth.currentUser != null){
//    return true
//   }else{
//    return false
//   }
//  }

const isUser = localStorage.getItem('isUser')
console.log("isUser : " + isUser);
  
function PrivateRoute({children}) {
  

  return (
   !window.isUser ? <Navigate to='/'/>  : children
  )
}

export default PrivateRoute
