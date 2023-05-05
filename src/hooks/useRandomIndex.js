import React, { useState, useEffect } from 'react'

export const useRandomIndex = (range) => {
    const [index,setIndex] = useState()

    function getRandomIndex(){
        const idx = Math.floor(Math.random() * range)
        setIndex(idx)
    }
    useEffect(()=>{
        getRandomIndex()
    },[])


  return (
    [index,setIndex]
  )
}
