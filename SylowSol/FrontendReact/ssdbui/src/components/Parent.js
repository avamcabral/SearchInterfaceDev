import React, { useState } from "react";
import SearchForm from "./searchForm";
import {trimDate} from "./TrimDate";
import PagTable from "./pagTab";

const Parent = () => { 
    //state management
    const [results, setResult] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(true);

    const handleSearchResults = (data) => {
        setResult(data); //should receive the data and set the results
        setFlag(false);
        setLoading(false);  //tell return to stop displaying loading
    };

    const handleSearchStart = () => {
        setLoading(true); //tell return to display loading
        setResult([]); //clear screen
    };

    const handleReset = () => { //ATTEMPT TO MOVE RESET BUTTON HERE
        setFlag(true); // Reset to "please start a search"
        setResult([]); // Clear results
        setLoading(false); // Ensure loading is false
      };

    const cutDateres = trimDate(results); //cut the time off the date using imported function trimDate

    const pageFlow = () => {
        if (loading) {
          return <p>Loading...</p>; //shows loading
        }
        if (flag) {
          return <p>Click 'Search' to display table, or choose some filters to narrow your search first.</p>; // Message before search
        }
        if (results && results.length === 0) {
          return <p>No results were found that match your search.</p>; 
        }
        if (results && results.length > 0) {
          return (
            <div>
                    <PagTable results={cutDateres}></PagTable>

                </div> )
        } }

    



/*
    return (
        <div>
            <h1>Search and Filter Inventory</h1>
            <SearchForm
                onReceiveResult={handleSearchResults} // callback from child searchForm
                onSearchStart={handleSearchStart} //for displaying the loading state; i think i also have to make this is a callback from the child though; tbd
            />
            {loading && <p>Loading...</p>}
            {cutDateres.length > 0 ? (
                <div>
                    <PagTable results={cutDateres}></PagTable>

                </div>
            ) : (
                !loading && <p>Couldn't find any items matching your search.</p>
            )}
        </div>
        */
        return (
            <div>
            <h1>Search and Filter Inventory</h1>
            <div>
              <SearchForm
                onReceiveResult={handleSearchResults} // callback from child searchForm
                onSearchStart={handleSearchStart} //for displaying the loading state
                resetParent={handleReset}
            />
              <div>{pageFlow()}</div>
            </div>
            </div>
    );
};

export default Parent;
