//function to cut the time off of the DateTime object in the DateCreated field
//takes the results array and returns a results array, with the datetime converted to a date object (no time)
export const trimDate = (data) => {
    return data.map((result) => ({
      ...result,
      DateCreated: new Date(result.DateCreated).toISOString().split("T")[0],
    }));
  };