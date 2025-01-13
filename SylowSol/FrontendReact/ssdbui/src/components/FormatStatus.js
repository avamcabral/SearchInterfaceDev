//changes status in the final result to a string

export const formatStatus = (data) => {
    console.log(data.Status);
    return data.map((result) => ({
        ...result,
        Status: result.Status === true ? 'Active' : 'Inactive',
      }));
  };