import React from 'react'
import Select from "react-select";
import Configs from './Configs';
//Selector for Status

const opts = Configs.stats

export default function Status({sendStatus, value}){ 

    const stats = opts.map(o => ({ //maps out the options from the config file
        "value" : o.value,
        "label" : o.label
      }))


    const handleStatus = (status) => {
    if (status) {
        sendStatus(status) // pass selected value to searchForm
    }
};
    return (
        <div className="container">
          <div className="select-container">
            <div className="col-12">
              <label>Set Status: </label>
            </div>
          </div>
          <div className="container">
            <div className="select-container">
            <Select
                options={stats}
                value={stats.find((opt) => opt.value === value) || null} //receives this from searchform so searchform can reset it

                onChange={handleStatus}
              />
            </div>
          </div>
        </div>
      );
}