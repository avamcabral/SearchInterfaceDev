import React from 'react'
import Select from "react-select";
import Configs from './Configs';
import "./DropStyle.css"

//the dropdown functionality

const ops = Configs.categories  //imports the categories from the Cofigs utility file

export default function Dropdown({sendChange, value}){ 

    const opts = ops.map(o => ({ //maps out the options from the config file
        "value" : o.value,
        "label" : o.label
      }))

console.log(opts)


    const handleSelect = (selectedItem) => {
    if (selectedItem) {
        sendChange(selectedItem) // pass selected value to searchForm
    }
};
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
