using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

[Route("api/[controller]")] //attribute routing
[ApiController]
public class DataController : ControllerBase //inherits from controller template/base for APIS here 
{
    private readonly AppDbContext _context; //DI, allows access to database

    public DataController(AppDbContext context)
    {
        _context = context;
    }

    // should resolve to api/DataController, i believe
    [HttpGet] //specifies we are handling HTTP GET requests
    public async Task<IActionResult> GetItems()
    {
        var items = await _context.Items.ToListAsync();
        return Ok(items); //should allow it to return data as JSON
    }

}
