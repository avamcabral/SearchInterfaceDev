//container for things like the categories that need to be passed in the dropdown menu, for simplicity and reusability

const Configs = {

    categories: [
      { value: "Electronics", label: "Electronics" },
      { value: "Kitchenware", label: "Kitchenware" },
      { value: "Furniture", label: "Furniture" },
      { value: "Cleaning Supplies", label: "Cleaning Supplies" },
      { value: "Clothing", label: "Clothing" },
      {value: null, label: "No Category Selected"}
    ],

    stats: [
        {value: 0, label: "Inactive"},
        {value: 1, label: "Active"},
        {value: null, label: "Either"}
    ]
  };

  export default Configs;
  