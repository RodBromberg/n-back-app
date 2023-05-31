// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

export const SignupForm = () => {

    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('') 

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert('Passwords Must Match')
            return
        }
        axios.post('http://localhost:8000/api/users/signup',{ email, password })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <form action="">
        <input onChange={e => setEmail(e.target.value)}  value={email} type="text" />
        <input onChange={e => setPassword(e.target.value)} value={password} type="text" />
        <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type="text" />
        <button onClick={() => handleSubmit()}>Submit</button>
    </form>
  )
}
