using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System.Data.SqlClient; 
using Newtonsoft.Json;
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


    [HttpGet]
    public IActionResult Fetch()
    {
        var items = _dataAccess.GetItems();
        return Ok(items);
    }

}