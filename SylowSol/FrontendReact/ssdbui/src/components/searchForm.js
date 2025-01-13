import React from "react"
import { useState } from "react";
import axios from 'axios';
import Dropdown from "./Dropdown";
import Status from "./Status";

const SearchForm = ({ onSearchStart, onReceiveResult, resetParent }) => {
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
    console.log("Request payload:", request)
    try {
        onSearchStart(); //should callback to parent
        const response = await axios.post("http://localhost:5016/api/data", request); //axios rest call to my API controller
        console.log(response.data)
        onReceiveResult(response.data); //callback to parent to handle state
        setErrorMessage("");  //empty error message if successful
    } 
    catch (error) {
        setErrorMessage("An error occurred. Please try again.");
        console.error(error);
    }
};

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

export default SearchForm;
