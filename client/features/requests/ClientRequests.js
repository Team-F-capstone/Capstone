import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchClientRequests, selectClientRequests, editAssignFreelancer, editAcceptRequest} from './clientRequestSlice'
import { useParams, Link } from "react-router-dom";

export default function ClientRequests (props) {
//hardcoded data 

 const dispatch = useDispatch()
 const requests = useSelector(selectClientRequests)
 const {projectId} = useParams()
 
// need to get project id from project id and make sure the clientID matches
 const id  = useSelector((state) => state.clientAuth.clientMe.id)
 console.log("ID: ", id)

useEffect(()=>{
    dispatch(fetchClientRequests(projectId))
 
}, [])

const handleAssignUser = (id)=>{
dispatch(editAssignFreelancer({projectId: projectId, freelancerId: id, status:"Ongoing"})).then(()=>{    
  dispatch(editAcceptRequest({projectId: projectId, freelancerId: id, status:"ACCEPTED"}))
}).then(()=>{
  dispatch(fetchClientRequests(projectId))
})
}
const handleUnassignUser = (id)=>{
  dispatch(editAssignFreelancer({projectId: projectId, freelancerId: null , status:"Pending"})).then(()=>{
    dispatch(editAcceptRequest({projectId: projectId, freelancerId: id, status:"PENDING"}))
  }).then(()=>{
    dispatch(fetchClientRequests(projectId))
  })

  }

  console.log("props.clientId, props.projectId",props.clientId, props.projectId )
  console.log("props",props )
  return (
<div>
      <ul>
        <h3>Requests: </h3>
        {props.clientId === props.projectId ? requests.map((request) => (
          <div>
          <li key={request.id}>
            <p>Request Status: {request.status}</p>
             <p>You have recieved a request from: <Link to={`/freelancers/${request.freelancer.id}`}> {request.freelancer.firstName} {request.freelancer.lastName}</Link></p>
              <p>{request.requestMessage}</p>
          </li>
          <button onClick={()=>handleAssignUser(request.freelancer.id)}>Assign {request.freelancer.firstName} {request.freelancer.lastName} to Project</button>
          <button onClick={()=>handleUnassignUser(request.freelancer.id)}>Unassign {request.freelancer.firstName} {request.freelancer.lastName} from Project</button>
          </div>
        )): "Currently no requests"}
      </ul>
    </div>
  )
}




