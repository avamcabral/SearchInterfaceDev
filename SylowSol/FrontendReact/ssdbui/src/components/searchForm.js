import React from "react"
import { useState } from "react";
import axios from 'axios';
import Dropdown from "./Dropdown";
import Configs from "./Configs";

const SearchForm = ({ onSearchStart, onReceiveResult }) => {
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

  const handleDropdownChange = (selected) => {
    assignJson({ ...request, Category: selected[0]?.value || "" }); //set selected category
  };

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

console.log("Configs.categories:", Configs.categories);
  return (
    <form onSubmit={handleSubmit}>
      {/* Item Number */}
      <div>
        <label htmlFor="Number">
          Item Number (Exact Match):  
        </label>
      <input type="text" name="Number" placeholder="Number" onChange={handleChange} />
      </div>
      {/* Item Name(Description) */}
      <div>
        <label htmlFor="Description">
          Item Name (Description):  
        </label>
      <input type="text" name="Description" placeholder="Description" onChange={handleChange} />
      </div>
      {/* Satus: */}
      <div>
        <label htmlFor="Status">
          Status(Inactive/Active):  
        </label>
      <input type="text" name="Status" placeholder="Status" onChange={handleChange} />
      </div>
      {/* Created After: */}
      <div>
        <label htmlFor="beginDate">
          Created After:  
        </label>
      <input type="date" name="beginDate" onChange={handleChange} />
      </div>
      {/* Created Before: */}
      <div>
        <label htmlFor="endDate">
          Created Before:  
        </label>
      <input type="date" name="endDate" onChange={handleChange} />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
