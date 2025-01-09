using Microsoft.EntityFrameworkCore;
using API.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Data> Items { get; set; }
}
