import React, { useState } from 'react';
import Select from "react-dropdown-select";

//a dropdown menu; separate for reusability

function Dropdown({ops, onChange}) {
    const [selected, setSelected] = useState([])

    const categories = [
        { value: "Electronics", label: "Electronics" },
        { value: "Kitchenware", label: "Furniture" },
        { value: "Furniture", label: "Furniture" },
        { value: "Cleaning Supplies", label: "Cleaning Supplies" },
        { value: "Clothing", label: "Clothing" },
      ]


    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='w-50 p-3 border rounded'>
            <Select name = 'Select' 
            ops = {ops} 
            placeholder="Select an option"
            onChange={(selected) => {
                setSelected(selected);
                onChange(selected); // Passing selected values back to parent
            }}
            >

            </Select>

            </div>

        </div>
    )
}

export default Dropdown;