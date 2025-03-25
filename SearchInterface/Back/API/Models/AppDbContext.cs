using System;
using Microsoft.EntityFrameworkCore;
using Back.API.Models;

namespace Back.API.Models;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Data>? Items { get; set; }
}
