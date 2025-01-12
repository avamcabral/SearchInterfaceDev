//function to cut the time off:
//takes the results array and returns a results array, with the datetime converted to a date object
export const trimDate = (data) => {
    return data.map((result) => ({
      ...result,
      DateCreated: new Date(result.DateCreated).toISOString().split("T")[0],
    }));
  };