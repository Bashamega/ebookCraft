"use client"
import { Book } from "@/components/book";
import Login from "@/components/loginForm";
import axios from "axios";
import React, {useState, useEffect} from "react";
const settings =  require('@/setting/settings.json')
export default function App(){
  const [loggedIn, setLoggedIn] = useState(false)
  const credential = settings.credentials
  useEffect(()=>{
    if(credential){
      axios.get("/api/loggedIn").then(res=>res.data).then(res=>{
        if(res.LoggedIn === true) {
          setLoggedIn(true);
        }      
      });
    }
  })
  return(
    <main id="ebookcraft">
      {credential && !loggedIn  ? (
        <Login/>
      ) : (
        <Book/>
      )}
    </main>
  )
}