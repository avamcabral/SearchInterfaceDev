using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System.Data.SqlClient; 
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using Back.API.Models; //should import my data access object functionality
//going to clean up unused libraries in a bit
namespace Back.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DataController : ControllerBase
{
    private readonly DataAccess _dataAccess;

    public DataController(DataAccess dataAccess)
    {
        _dataAccess = dataAccess; //injection
    }

/*
    [HttpGet]
    public IActionResult Fetch()
    {
        var items = _dataAccess.GetItems();
        return Ok(items);
    }
*/
    [HttpPost]
    public IActionResult SearchResults([FromBody] JObject jsonParams)
    {

    if (jsonParams == null || string.IsNullOrEmpty(jsonParams.ToString()))
    {
        return BadRequest("The jsonParams field is required.");
    }

    try
    {
        Data queryParams = jsonParams.ToObject<Data>(); //should parse the json object and instantiate my data object
        

        if (queryParams.Number.HasValue && queryParams.Number.GetType() != typeof(int))
            {
                throw new ArgumentException("Invalid search input for 'Number'. Please enter a number.");
            }
    
        if (queryParams.beginDate.HasValue && queryParams.beginDate.GetType() != typeof(DateTime))
            {
                Console.WriteLine(queryParams.beginDate);
                throw new ArgumentException("Invalid search input for 'Start Date'.  Please enter a date in the format yyyy-MM-dd.");
            }

        if (queryParams.endDate.HasValue && queryParams.endDate.GetType() != typeof(DateTime))
            {
                throw new ArgumentException("Invalid search input for 'End Date'.  Please enter a date in the format yyyy-MM-dd.");
            }
      
        var results = _dataAccess.Search(queryParams); //the data access object should take this object and work with it
        if (results == null)
            {
                return NotFound(); // Return a 404 Not Found if results are null
            }
        else
            {
                return Ok(results); // Return 200 with results
            }
    }
    

    catch (JsonException ex) //json specific issues
        {
            Console.WriteLine($"JSON parsing error: {ex.Message}");
            return BadRequest("Invalid JSON input.");
        }
    catch (ArgumentException ex) //any of the conditions I tried to accomodate in terms of bad input
        {
            Console.WriteLine($"Validation error: {ex.Message}");
            return BadRequest(ex.Message);
        }
    catch (Exception ex) //everything else, hopefully will be caught here
        {
            Console.WriteLine($"An unexpected error occurred: {ex.Message}");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

}
