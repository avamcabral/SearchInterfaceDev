using Back.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;


var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers()
    .AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<DataAccess>();  //data access object so controller can see it i think

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", //make sure it knows the frontend is allowed to hit it
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
/*
// should be able to see database through the connection string from json, and dbcontext

builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("InventoryDB")));
*/ //removing database context i think, and just going with Raw sql queries via ADO.NET for simplicity

var app = builder.Build();


// basic functionality from template
//app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();


