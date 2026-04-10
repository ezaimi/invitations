"use client"
import React, { useEffect, useState } from 'react'

function Page() {
  const [number, setNumber] = useState<number>(0)

  useEffect(()=>{

    if(number > 20){
      setNumber(0)
    }

  },[number])



  return (
    <div className='bg-green-100 flex flex-col gap-2 h-[100vh] justify-center items-center'>
        <User user={{id:1, name:"Eraser", email:"jiod"}}/>
     <div> {number}</div>
    <button className=' bg-blue-400 cursor-pointer px-15 py-2 rounded-full ' onClick={()=>{setNumber(number + 1)}}>
   
      <h1>Click me</h1>
    </button>
    </div>
  )
}

function User({user}:{user:User}){

  return (
    <>
    <div>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
    </>
  )
}

type User = {
  id: number;
  name: string;
  email: string;
};

export default Page