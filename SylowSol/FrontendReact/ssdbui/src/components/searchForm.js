import React from "react"
import { useState } from "react";
import axios from 'axios';
import Dropdown from "./Dropdown";
import Status from "./Status";

export default function SearchForm({ onSearchStart, onReceiveResult, resetParent, failed }){ //searchForm gets all these as properties from 'Parent.js'

  const [request, assignJson] = useState({ //sets up the results so they can be assigned and passed to request
    Number: "",
    Description: "",
    Category: "",
    Status: "",
    beginDate: "",
    endDate: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); //in case smth goes wrong, assign to display user-friendly error message

  const handleChange = (e) => { //when the search fields are updated, responds to update request accordingly
    assignJson({ ...request, [e.target.name]: e.target.value }); //things should get added to the json as theyre input by user
  };

  function handleDropChange(selectedItem){ //specifically to manage changes for the dropdown select object
    if (selectedItem){
    assignJson({ ...request, Category : selectedItem.value }); //assigns category
    }
}

function handleStatusChange(status){ //specifically to manage changes for the status select
  if (status){
  assignJson({ ...request, Status : status.value }); //assigns status
  }
}

  const handleSubmit = async (e) => { //called when submission button is clicked to send the request
    e.preventDefault(); //prevents page refreshing
    try {
        onSearchStart(); //should callback to parent
        const response = await axios.post("http://localhost:5016/api/data", request); //axios rest call to API controller
        onReceiveResult(response.data); //callback to parent to handle state
        setErrorMessage("");  //empty error message if successful
    } 
    catch (error) {
      failed(); //will remove the loading status from the screen; callback to Parent that will handle state change
      if (error.response) { //handling for specific HTTP request related errors
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
  //resets the form when the reset button is clicked, and because the values of each are linked to requests(in searchForm), the fields clear
  assignJson({
    Number: "",
    Description: "",
    Category: null,
    Status: "",
    beginDate: "",
    endDate: "",
  });
  setErrorMessage("");
  resetParent(); //call to parent to clear the display table
};
//format the actual page dynamically:
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