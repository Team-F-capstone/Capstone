import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClient, selectClient, updateClientAsync } from "./clientSlice";


const UpdateClient = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.clientAuth.clientMe.id)
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const client = useSelector(selectClient)


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(updateClientAsync({id: client.id, firstName, lastName, email, description, username, imageUrl }))  
    navigate('/profile')
  }

  useEffect(() => {
    const getClient = async () => {
      await dispatch(fetchClient(id))
    }
    getClient()
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email)
    setDescription(client.description)
    setUsername(client.username)
    setImageUrl(client.imageUrl)
  }, [])

  return (
    <form 
    onSubmit={handleSubmit}
    >
        <h1>Update your information</h1>

      <label>Username:</label>
      <input 
      name="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <label >First Name:</label>
      <input
        name="fisrtName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label>Last name:</label>
      <input
        name="lastname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
     
     
      <label>Email:</label>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      
      <label>Description:</label>
      <input
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Profile Image:</label>
      <input 
      name="image"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      />

      <button type="submit">Edit</button>
    </form>
  );
};

export default UpdateClient;
