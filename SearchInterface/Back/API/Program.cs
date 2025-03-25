using Back.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers() //follows MVC model
    .AddNewtonsoftJson(); //for json operations
builder.Services.AddTransient<DataAccess>();  //registers DataAccess class (transient lifetime, for lightweight use) for dependency injection

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
builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("InventoryDB")));
*/ //The above code is for registering the database context, AppDbContext, for EF CORE which is not used in this program.
//Instead, because of simplistic functionality and small workload, it uses Raw sql queries via ADO.NET for simplicity
//I did, however, leave the context file, as well as this registration code in the project to enable/jumpstart scaling up the project.

var app = builder.Build();


//app.UseHttpsRedirection(); //security measure need to enable for sensitive info

app.UseCors("AllowReactApp"); //allows react app to connect

app.UseAuthorization();

app.MapControllers();

app.Run();


