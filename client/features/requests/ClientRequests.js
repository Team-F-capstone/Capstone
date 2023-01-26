import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchClientRequests, selectClientRequests} from './RequestSlice'


export default function ClientRequests () {
//hardcoded data 
//const PROJECTID = 1
// const dispatch = useDispatch()
// const requests = useSelector(selectClientRequests)

useEffect(()=>{
    // dispatch(fetchClientRequests(1))
    console.log("HEEELO")
}, [])


// console.log("CLIENT REQUESTS: ", requests )

  return (
    <div>
      Hello from Client Requests
    </div>
  )
}




