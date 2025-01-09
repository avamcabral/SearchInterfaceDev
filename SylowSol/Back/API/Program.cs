using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.UseSqlServer;

{
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// should be able to see database through the connection string from json, and dbcontext
//builder.Services.AddDbContext<Context>(options =>
//{
    //var connectionString = builder.Configuration.GetConnectionString("InventoryDB");
//options.UseSqlServer(connectionString); //specify sql server

//});
builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("InventoryDB")));

var app = builder.Build();


//majority of this basic functionality from template
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

}
