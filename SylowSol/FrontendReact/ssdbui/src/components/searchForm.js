import React from "react"
import { useState } from "react";
import axios from 'axios';
import Dropdown from "./Dropdown";
import Status from "./Status";

export default function SearchForm({ onSearchStart, onReceiveResult, resetParent, failed }){
  //const [selected, setSelected] = useState(null)

  const [request, assignJson] = useState({
    Number: "",
    Description: "",
    Category: "",
    Status: "",
    beginDate: "",
    endDate: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); //in case smth goes wrong, assign to display friendly error message to user

  const handleChange = (e) => {
    assignJson({ ...request, [e.target.name]: e.target.value }); //things should get added to the json as theyre input by user
  };

  function handleDropChange(selectedItem){ //specifically to manage changes for the dropdown select object
    console.log(selectedItem)
    if (selectedItem){
    assignJson({ ...request, Category : selectedItem.value });
    }
}

function handleStatusChange(status){ //specifically to manage changes for the status select
  console.log(status)
  if (status){
  assignJson({ ...request, Status : status.value });
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        onSearchStart(); //should callback to parent
        const response = await axios.post("http://localhost:5016/api/data", request); //axios rest call to my API controller
        console.log(response.data)
        onReceiveResult(response.data); //callback to parent to handle state
        setErrorMessage("");  //empty error message if successful
    } 
    catch (error) {
      failed(); //will remove the loading status from the screen
      if (error.response) { //if it specifies with code
        // Handle specific HTTP errors
        if (error.response.status === 400) {
            console.error('Bad Request: incorrect json input(400)');
            setErrorMessage("Improper or incomplete input. For Item Number, please enter a number, (ie, 12341). For description, please enter item names or partial names, (ie, tv).")
      }
        else if (error.response.status === 404) {
          console.error('Resource not found (404).');
          setErrorMessage("Resource you're trying to reach not found.");
    }
        else if (error.response.status === 500) {
          console.error('500, server error.');
          setErrorMessage("Something went wrong on the server side. Please try again later.")
    }
        else { //should catch anything else and post to console
          console.error(`Unexpected Error: ${error.response.status}`);
          setErrorMessage("Something went wrong, please try again.");
    }
  }
  else if (error.request) { //for connection errors, ie, if api is down, this should catch
    console.error('No response received from server.');
    setErrorMessage("Can't connect to server. Please check connection and try again.")
    
} else {//anything else
    console.error(`Error: ${error.message}`);
    setErrorMessage("An unexpected error occurred, please try again.")
}
}}
const handleReset = () => {
  //resets the form when the reset button is clicked, and because the values of each are linked to requests, the fields clear
  assignJson({
    Number: "",
    Description: "",
    Category: null,
    Status: "",
    beginDate: "",
    endDate: "",
  });
  setErrorMessage("");
  resetParent(); //call to parent to reset the table
};

//console.log("Configs.categories:", Configs.categories);
  return (
    <form onSubmit={handleSubmit}>
      {/* Item Number */}
      <div>
        <label htmlFor="Number">
          Item Number (Exact Match):  
        </label>
      <input type="text" name="Number" value = {request.Number} placeholder="Number" onChange={handleChange} />
      </div>
      {/* Item Name(Description) */}
      <div>
        <label htmlFor="Description">
          Item Name (Description):  
        </label>
      <input type="text" name="Description" value = {request.Description} placeholder="Description" onChange={handleChange} />
      </div>
      <div>
        <Dropdown sendChange={handleDropChange} value={request.Category}/>
      </div>
      <div>
      <Status sendStatus={handleStatusChange} value={request.Status}/>
      </div>
      {/* Created After: */}
      <div>
        <label htmlFor="beginDate">
          Created After:  
        </label>
      <input type="date" name="beginDate" value={request.beginDate} onChange={handleChange} />
      </div>
      {/* Created Before: */}
      <div>
        <label htmlFor="endDate">
          Created Before:  
        </label>
      <input type="date" name="endDate" value={request.endDate} onChange={handleChange} />
      </div>
      {/* Buttons */}
      <div>
        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};