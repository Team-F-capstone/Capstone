import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom"
import { selectSingleProject } from "../projects/singleProjectSlice";
import { fetchSingleProjectAsync } from "../projects/singleProjectSlice";
import  EditProject  from "../projects/editProjectForm"
import { deleteSingleProjectAsync } from "./allProjectsSlice";
import ClientRequests from "../requests/ClientRequests";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

import AddRating from "../ratings/AddRating";
import FreelancerRequests from "../requests/FreelancerRequests";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}






const SingleProject = () => {
const [error, setError] = useState("")
const navigate = useNavigate()

  const clientIsLoggedIn = useSelector((state) => !!state.clientAuth.clientMe.id);
  const freelancerIsLoggedIn = useSelector((state) => !!state.freelancerAuth.me.id);
  const client = useSelector((state) => state.clientAuth.clientMe.id)
  
  
  const freelancer = useSelector((state) => state.freelancerAuth.me)

  const project = useSelector(selectSingleProject);
  
  const  { projectId }  = useParams()

  const dispatch = useDispatch()


  const clickMessage = () => {
    navigate(`/messages/${project.singleProject.clientId}`)
  }  

  useEffect(() => {
    dispatch(fetchSingleProjectAsync(projectId));
  }, [dispatch]);

  const handleDelete = (projectId) => {

    dispatch(deleteSingleProjectAsync(projectId)).then(()=>navigate('/home')) 
  };

  
  const handleCheckForProposal = async ()=>{
    const request = await axios.get(`/api/requests/${projectId}/${freelancer.id}`)
    request.data[0] ? 
    setError("You already sent a proposal to this project")
    : navigate(`/projects/${projectId}/addrequest`)
  }
  
  //MUI for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
 
  
  

  return (
<div>
<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Project Info" {...a11yProps(0)} />
          {clientIsLoggedIn ? (
          <Tab label="Edit Project" {...a11yProps(1)} />
          ): null}
          {clientIsLoggedIn ? (
          <Tab label="Add Review" {...a11yProps(2)} />
          ): null}
          {clientIsLoggedIn ? (
          <Tab label="Requests" {...a11yProps(3)} />
          ): null}
          
        </Tabs>
      </Box>
    <div className="singleView">

    <TabPanel value={value} index={0}>
      <div className="card">
        <Card sx={{ maxWidth: 600, maxHeight: 700, minHeight: 500 }}>
          <CardContent>
          <Typography color='primary'  variant="h3" component="div">
            {project.singleProject.title}
            </Typography>
          <Typography color='primary'  variant="h6" component="div">
             Description:    {project.singleProject.description}
            </Typography>
            <Typography color='primary'  variant="h5" component="div">
            {project.singleProject.category}
            </Typography>
            <Typography variant="body2" color='primary'>
          Status:  {project.singleProject.status}
            </Typography>
          </CardContent>
          <Typography variant="h5" color='primary'>
            posted by:
            {project.singleProject.id ? (
              <Link to={`/client-profile/${project.singleProject.client.id}`}>
                <Typography
                  color='primary'
                  variant="h5"
                  sx={{ display: "inline",}}
                >
                  {" "}
                  {project.singleProject.client.firstName}{" "}
                  {project.singleProject.client.lastName}
                </Typography>
              </Link>
            ) : null}
          </Typography>

            { client === project.singleProject.clientId ? <Button onClick={() => handleDelete(project.singleProject.id)} size="small">Delete Project</Button> : null }
            <Button onClick={clickMessage} type="small" variant='contained'>Message</Button>
        </Card>
        </div>
        {clientIsLoggedIn || freelancerIsLoggedIn ? (
        <div className='editForm'>
          {/* {project.singleProject.freelancerId === null ? (
            <div>
          <EditProject projectId={projectId} projectClientId={project.singleProject.clientId} projectFreelancerId={project.singleProject.freelancerId} />
          </div>
          ): null} */}
          {/* <div>
          <AddRating projectId={projectId} projectClientId={project.singleProject.clientId} projectFreelancerId={project.singleProject.freelancerId} />
          </div> */}
        </div>
        ): null}

        {/* { client === project.singleProject.clientId ? <ClientRequests clientId={client} projectClientId={project.singleProject.clientId} freelancerId={project.singleProject.freelancerId} projectId={project.singleProject.id}/> : null} */}
       {freelancerIsLoggedIn ? <button onClick={()=>handleCheckForProposal()}>Submit a Proposal</button>: null}
        <h1>{error}</h1>

</TabPanel>
        <TabPanel value={value} index={1}>

        {project.singleProject.freelancerId === null ? (
            <div>
          <EditProject projectId={projectId} projectClientId={project.singleProject.clientId} projectFreelancerId={project.singleProject.freelancerId} />
          </div>
          ): "You can't edit a project after you've assigned a freelancer to it"}
      </TabPanel>
      <TabPanel value={value} index={2}>
      <AddRating projectId={projectId} projectClientId={project.singleProject.clientId} projectFreelancerId={project.singleProject.freelancerId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
      { client === project.singleProject.clientId ? <ClientRequests clientId={client} projectClientId={project.singleProject.clientId} freelancerId={project.singleProject.freelancerId} projectId={project.singleProject.id}/> : null}
       {freelancerIsLoggedIn ? <FreelancerRequests/> : null}
        <h1>{error}</h1>
      </TabPanel>
        </div>
        </div>
  )
};

export default SingleProject

