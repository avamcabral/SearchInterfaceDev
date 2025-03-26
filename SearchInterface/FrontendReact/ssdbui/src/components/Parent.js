import React, { useState } from "react";
import SearchForm from "./searchForm";
import {trimDate} from "./TrimDate";
import { formatStatus } from "./FormatStatus";
import PagTable from "./pagTab";
import LoadingDots from "./LoadingDots";

const Parent = () => { //set up all our states that need to change dynamically
    const [results, setResult] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(true);
    const [fail, setFail] = useState(false);

    const handleSearchResults = (data) => {
        setFail(false);
        setResult(data); //receives the data and set the results
        setFlag(false);
        setLoading(false);  //tell return to stop displaying loading
    };

    const handleSearchStart = () => {
        setFail(false);
        setLoading(true); //tell return to display loading
        setResult([]); //clear screen
    };


    const handleReset = () => { //resets the search fields and the display
        setFlag(true); //reset to "please start a search"
        setResult([]); //clear results
        setLoading(false); //ensure loading is false
        setFail(false); //clears secondary error message
      };
    
    function tryAgain(){
        setLoading(false); //clears loading from screen
        setFail(true); //clears other messages
    }

    const cutDateres = trimDate(results); //cut the time off the date using imported function trimDate

    const finalTable = formatStatus(cutDateres); //reformats the status to a string for readability

    const pageFlow = () => { //controls dynamically what is displayed based on conditions (loading, pre-search, error, no results, success)
        if (loading && !fail) {
          return <div className="page-flow" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", 
            //height: "100vh"
          }}>Loading...
          <LoadingDots/>
          </div>; //shows loading
        }
        if (flag && !fail) {
          return <div className="page-flow">Click 'Search' to display table, or choose some filters to narrow your search first.</div>; // Message before search
        }
        if (fail && !loading){ //displayed when an error has occurred along with error message
            return <div className="page-flow"></div>
        }
        if (results && results.length === 0) {
          return <div className="page-flow">No results were found that match your search.</div>; //no matches found
        }
        if (results && results.length > 0) {
          return ( //results table if query succeeds, formatted in PagTab.js
            <div> 
                    <PagTable results={finalTable}></PagTable> 

                </div> )
        } }

        return (
            <div>
            <div className="header">Search and Filter Inventory</div>
            <div>
              <SearchForm
                onReceiveResult={handleSearchResults} // callback from child searchForm
                onSearchStart={handleSearchStart} //for displaying the loading state
                resetParent={handleReset} //resetting everything
                failed={tryAgain} //for error handling
            /> 
              <div>{pageFlow()}</div>
            </div>
            </div>
    ); //above return block will display the search form, and then underneath that, the conditional messages from PageFlow.
};

export default Parent;
