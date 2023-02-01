import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleFreelancer, selectSingleFreelancer } from './singleFreelancerSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchRatingsByFreelancerAsync, selectRatings } from '../ratings/ViewAllSlice';


const SingleFreelancer = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const {id} = useParams()
const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);

const messageButton = () => {
navigate(`/messages/${freelancer.id}`)
}

const freelancer = useSelector(selectSingleFreelancer)
const reviews = useSelector(selectRatings)

useEffect(()=>{
dispatch(fetchSingleFreelancer(id)).then(()=>{
  dispatch(fetchRatingsByFreelancerAsync(id))
})

},[dispatch])


  return (
    <div className='singleView'>
        <div className='card'>
          <Card sx={{ width: 500}}>
          <CardMedia
            sx={{ height: 140 }}
            image={freelancer.imageUrl}
            title="Freelancer"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {freelancer.firstName} {freelancer.lastName} 
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
            {freelancer.description} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {freelancer.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {freelancer.categories}
            </Typography>

          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
            {clientIsLoggedIn ? <Button onClick={messageButton} size='small'>Message</Button> : null}
          </CardActions>

        </Card>
          
        {reviews.map((rating) => (
          <div>
             <Card sx={{ width: 500, margin: "10%", marginLeft: 0 }}>
             <Typography variant="body2" color="text.secondary">
            Review
            </Typography>
          <Typography variant="body2" color="text.secondary">
            {rating.rating} Stars
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {rating.review}
            </Typography>
            </Card>
          </div>
        ))}
        </div>
    </div>
  )
}

export default SingleFreelancer
