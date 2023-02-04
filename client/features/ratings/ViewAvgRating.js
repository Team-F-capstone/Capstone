import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchRatingsByFreelancerAsync, selectRatings } from './ViewAllSlice'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { selectAllFreelancers } from '../freelancers/allFreelancersSlice';



 const ViewAvgRating = (props) => {
    const dispatch = useDispatch()
    const reviews = useSelector(selectRatings)
    const freelancers = useSelector(selectAllFreelancers)
    
    const { id } = props

    console.log("REVIEWS ", reviews)

useEffect(()=>{
    dispatch(fetchRatingsByFreelancerAsync(id))
},[dispatch])

const rating = reviews.map((review)=>review.rating)
const ratingSum = rating.reduce((accumulator, value) =>{
  return accumulator + value;
}, 0)

const ratingAvg = Math.round(ratingSum / rating.length)
console.log("RATING AVG ", ratingAvg)


  return (
    <div className="allViewContainer">
          <div>
            {ratingAvg}
        </div>
       
  </div>
  )}


export default ViewAvgRating