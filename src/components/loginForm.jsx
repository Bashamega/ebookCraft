import axios from 'axios'
import React, { useState } from 'react'
const language = require('@/setting/language.json')
export default function Login(){
    const [error, seterror] = useState(false)
    return(
        <section id="login">
          <h1 id="loginTitle">{language.loginTitle}</h1>
          <p id="loginAbout">{language.loginAbout}</p>
          <form onSubmit={(e)=>{
            seterror(false)
            e.preventDefault()
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;
            axios.post('api/login', {
                email,
                password
            }).then((res) => {
                if(res.data.status ===200){
                    window.location.reload()
                }
            }).catch((error) => {
                if (error.response.status === 401) {
                    seterror(true)
                }
            })
          }}>
            <br></br>
            <label>{language.emailAddress}</label>
            <br></br>
            {error?
            (
                <div id='error'>{language.userNotfound}</div>
            ):(<></>)}
            
            <input onFocus={()=>{seterror(false)}} type="email" name="email" placeholder={language.emailPlaceholder} required></input>
            <br></br>

            <label>{language.password}</label>
            <br></br>

            <input onFocus={()=>{seterror(false)}} type="password" name="password" placeholder={language.passPlaceholder} required></input>
            <br></br>
            <input type="submit" value={language.submit}></input>
          </form>
        </section>
    )
}