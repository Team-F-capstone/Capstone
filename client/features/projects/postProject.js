import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectAsync } from "./allProjectsSlice";

const AddProject = () => {
  
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const clientId = useSelector((state) => state.clientAuth.clientMe.id)


  const dispatch = useDispatch();
  
  const handleAddProject = (e) => {
    e.preventDefault();
    dispatch(
      addProjectAsync({ clientId, description, category })
    )
  };

  
  return (
    <div id="addProject">
      <form onSubmit={handleAddProject}>
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="category">Category:</label>
        <input
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Edit Project</button>
      </form>
    </div>
  );
};

export default AddProject;