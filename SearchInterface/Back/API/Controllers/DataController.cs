using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic; 
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Back.API.Models; //imports data access object

namespace Back.API.Controllers;

[Route("api/[controller]")] //this resolves to api/data, exposing the endpoint in the URL
[ApiController]
public class DataController : ControllerBase //inherits from ControllerBase, an API controller object from ASPNET
{
    private readonly DataAccess _dataAccess;

    public DataController(DataAccess dataAccess)
    {
        _dataAccess = dataAccess; //dependency injection, connects and works with the data access object
    }

    [HttpPost]
    public IActionResult SearchResults([FromBody] JObject jsonParams) //from body prepares it to take json data, and post hides the reqeust in the URL and tells the server we're sending data
    {

    if (jsonParams == null || string.IsNullOrEmpty(jsonParams.ToString()))
    {
        return BadRequest("The jsonParams field is required."); //if nothing gets passed
    }

    try
    {
        Data queryParams = jsonParams.ToObject<Data>(); //parse the json object and instantiate data object
        

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
      
        var results = _dataAccess.Search(queryParams); //the data access object receives the parameters, processes them, and sends them off. 
        if (results == null)
            {
                return NotFound(); // return a 404 Not Found if results are null
            }
        else
            {
                return Ok(results); // returns 200 with results if successful
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
