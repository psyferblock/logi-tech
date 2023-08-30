"use client"

import {useRouter} from "next/router"

import React from 'react'


function FinishButtonComponent() {
const router=useRouter()

const redirectPage=()=>{
  router.push('/')
}
  return (
    <div>
      <button  className='btn btn-primary'
        onClick={()=>{redirectPage}}>
          finish 
        </button>
    </div>
  )
}

export default FinishButtonComponent