using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options)
        : base(options)
    {
    }

    public DbSet<Data> Items { get; set; } = null!; //should map the Items table to the data class
}