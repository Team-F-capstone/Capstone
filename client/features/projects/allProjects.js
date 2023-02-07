import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom"
import { 
  fetchProjectsAsync, 
  selectProjects, 
  selectProjectsByCategory,
  sortByCategory,
  fetchProjectsByCategoryAsync
} from "../projects/allProjectsSlice";
import usePagination from "../freelancers/usePagimentation";





import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { List } from "@mui/material";
import Stack from "@mui/material/Stack";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import { likeProjectAsync } from "./likedProjectsSlice";

import { fetchLikedProjectsAsync, likeProjectAsync, selectLikedProjects, unlikeProjectAsync } from "./likedProjectsSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';



const AllProjects = () => {
  
  const projectsByCat = useSelector(selectProjectsByCategory)
  const projects = useSelector(selectProjects);
  const freelancer = useSelector((state) => state.freelancerAuth.me.id)
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const likedProjects = []

  const [category, setCategory] = useState('')
  const [render, setRender] = useState(false)

  const liked = useSelector(selectLikedProjects)

  const unlike = async (id) => {
    await dispatch(unlikeProjectAsync(id))
    setRender(!render)
  }

  console.log(liked)

  const learnMore = (id) => {
    navigate(`/projects/${id}`)
  }
  
  useEffect(() => {
    dispatch(fetchProjectsAsync());
    dispatch(fetchLikedProjectsAsync(freelancer))
  }, [dispatch, render] );

  const handleCategory = (evt) => {
    evt.preventDefault();
    console.log("handle category", category);
    dispatch(sortByCategory(category));
    // console.log("FREELANCERS BY CAT ", freelancersByCategory)
  }


 

  const likeProject = async (id) => {
      await dispatch(
        likeProjectAsync({
          freelancerId: freelancer,
          projectId: id
        })
      );
      setRender(!render);

  };



    ////FOR PAGINATION/////
    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
  
    const count = Math.ceil(projects.length / PER_PAGE);
    const _DATA = usePagination(projects, PER_PAGE);


    const countB = Math.ceil(projectsByCat.length / PER_PAGE);
    const _DATAB = usePagination(projectsByCat, PER_PAGE);


  


    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };
    
    const handleChangeCat = (e, p) => {
      setPage(p);
      _DATAB.jump(p);
    };
  
    ///////////////////////
if (projectsByCat.length) {
  return (
<div className="allViewContainer">
<div style={{marginTop: 10}}>
          <Typography fontWeight={"bold"} color="primary">Search by Categories and Specialties</Typography>
          </div>
          <div>
      <form onSubmit={handleCategory}>
        {/* category  */}
        <InputLabel>Categories</InputLabel>
        <Select
          name="category"
          fullWidth
          // label="Category"
          value={category}
          color="primary"
          sx={{ m: 1, width: "20ch" }}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="all">
            All freelancers
          </MenuItem>
          <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
          <MenuItem value={"Javascript Developer"}>
            Javascript Developer{" "}
          </MenuItem>
          <MenuItem value={"HTML & CSS Developer"}>
            HTML & CSS Developer
          </MenuItem>
          <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
        </Select>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      </div>
    <div className='allList'>

      
        {_DATAB.currentData().map((project) => (
          <div className='card'>
            <Link to={`/projects/${project.id}`}>

        {/* {_DATA.currentData().map((project) => (
          <div className='card'>

          <Card  sx={{ minWidth: 300, minHeight: 300, 
            backgroundColor:"#F5F5F5", 
            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            ':hover': {
              boxShadow: 20, // theme.shadows[20]
            },
            }}>
          <CardContent>

        
            <FavoriteIcon></FavoriteIcon>
          <Typography fontFamily={"Playfair Display serif"}  align="center" variant="h5" component="div">
            {p.project.title}

            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>
            <Typography color='primary'  variant="body1" component="div">

            {project.category}
            </Typography>
            <br></br>
            <Typography variant="body2" color='primary'>
            Status: {project.status}

            

            </Typography>
          </CardContent>
          <br></br>
          <br></br>
          <CardActions>

            <Button size="small" fullWidth variant='contained'>Learn More</Button>

            <Button onClick={() => learnMore(p.project.id)} size="small" fullWidth variant='contained'>Learn More</Button>
          
            <Button onClick={() => unlike(p.id)}>Unlike</Button>
               
          </CardActions>
        </Card>
        </div>
          ))} */}
        {_DATA.currentData().map((project) => {
          if(!likedProjects.includes(project.id)){
            return(
              <div className='card'>
              <Card  sx={{ minWidth: 300, minHeight: 300, backgroundColor:"#F5F5F5", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
              <CardContent>
                {liked ? liked.map((like) => {
                  if(like.project.id == project.id){
                    return <FavoriteIcon></FavoriteIcon>
                  }
                }) : null}
              <Typography fontFamily={"Playfair Display serif"}  align="center" variant="h5" component="div">
                {project.title}
                </Typography>
                <hr></hr>
                <br></br>
                <Typography color='primary'  variant="body1" component="div">
                {project.category}
                </Typography>
                <br></br>
                <Typography variant="body2" color='primary'>
                Status: {project.status}
                </Typography>
              </CardContent>
              <br></br>
              <br></br>
              <CardActions>
                <Button onClick={() => learnMore(project.id)} size="small" fullWidth variant='contained'>Learn More</Button>
                {/* <Button onClick={() => likeProject(project.id)}>Like Project</Button> */}
              </CardActions>
            </Card>
            </div>
            )
          }
          })}
      </div> 
        <Stack alignItems="center">
          <Pagination
          color='primary'
            count={countB}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChangeCat}
          />
        </Stack>
    </div>
  )}
  return (
    <div className="allViewContainer">
        <form onSubmit={handleCategory}>
          {/* category  */}
          <div style={{marginTop: 10}}>
          <Typography fontWeight={"bold"} color="primary">Search by Categories and Specialties</Typography>
          </div>
          {/* <InputLabel>Categories</InputLabel> */}
          <Select
            name="category"
            fullWidth
            // label="Category"
            value={category}
            color="primary"
            sx={{ m: 1, width: "20ch" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">
              All Projects
            </MenuItem>
            <MenuItem value={"Python Developer"}>Python Developer</MenuItem>
            <MenuItem value={"Javascript Developer"}>
              Javascript Developer{" "}
            </MenuItem>
            <MenuItem value={"HTML & CSS Developer"}>
              HTML & CSS Developer
            </MenuItem>
            <MenuItem value={"Android Developer"}>Android Developer</MenuItem>
          </Select>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </form>
    
      <Box p="5">
        <List p="10" pt="3" spacing={2}>
        <div className="allList" >  
        {_DATA.currentData().map((project) => (
          <div className='card'>
            <Link to={`/projects/${project.id}`}>
          <Card  sx={{ minWidth: 300, minHeight: 300, 
            backgroundColor:"#F5F5F5", 
            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            ':hover': {
              boxShadow: 20, // theme.shadows[20]
            },
            }}>
          <CardContent>
          <Typography fontFamily={"Playfair Display serif"}  align="center" variant="h5" component="div">
            {project.title}
            </Typography>
            <hr
            style={{border: "none", height: "1px",color: "#333",backgroundColor: "#333"}}
            ></hr>
            <br></br>
            <Typography color='primary'  variant="body1" component="div">
            {project.category}
            </Typography>
            <br></br>
            <Typography variant="body2" color='primary'>
            Status: {project.status}
            </Typography>
          </CardContent>
            <br></br>
            <br></br>
            <CardActions>
              <Button size="small" fullWidth variant='contained'>Learn More</Button>
            </CardActions>
          </Card>
        </Link>
        </div>
        ))}
        </div>
      </List>
    
      
        <Stack alignItems="center">
          <Pagination
          color='primary'
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </div>
  )
};

export default AllProjects
