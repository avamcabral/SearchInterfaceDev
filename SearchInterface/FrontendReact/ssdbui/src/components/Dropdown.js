import React from 'react'
import Select from "react-select";
import Configs from './Configs';
import "./DropStyle.css" //style sheet

//the dropdown functionality

const ops = Configs.categories  //imports the categories from the Cofigs utility file

export default function Dropdown({sendChange, value}){ //it is a child of SearchForm

    const opts = ops.map(o => ({ //maps out the options from the config file so they can be used in the dropdown menu
        "value" : o.value,
        "label" : o.label
      }))


    const handleSelect = (selectedItem) => {
    if (selectedItem) {
        sendChange(selectedItem) // pass selected value to searchForm when a value is selected
    }
};
//display the actual selecter
    return (
        <div className="container">
          <div className="select-container">
            <div className="col-12">
              <label>Select a Category: </label>
            </div>
          </div>
          <div className="container">
            <div className="select-container">
            <Select
                options={opts}
                value={opts.find((opt) => opt.value === value) || null} //receives this from searchform so searchform can reset it

                placeholder="Select a Category"
                onChange={handleSelect}
              />
            </div>
          </div>
        </div>
      );
}
