import React, { useState } from "react";
import SearchForm from "./searchForm";
import {trimDate} from "./TrimDate";
import PagTable from "./pagTab";

const Parent = () => { 
    //state management
    const [results, setResult] = useState([]); 
    const [loading, setLoading] = useState(false);

    const handleSearchResults = (data) => {
        setResult(data); //should receive the data and set the results
        setLoading(false);  //stop displaying loading
    };

    const handleSearchStart = () => {
        setLoading(true); //indicate results are now loading
        setResult([]); //clear screen
    };

    const cutDateres = trimDate(results);


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
    );
};

export default Parent;
