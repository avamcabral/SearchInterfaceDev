using Microsoft.AspNetCore.Mvc;
using Back.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System.Data.SqlClient; 
using Newtonsoft.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Back.API.Models
{
    public class DataAccess
    {
        private readonly IConfiguration _configuration;

    public DataAccess(IConfiguration configuration)
    {
        _configuration = configuration;
    }
       
        [HttpGet]
        public string GetItems()
    {
        string connectionString = _configuration.GetConnectionString("InventoryDB");

        using (SqlConnection con = new SqlConnection(connectionString)) //set up connection object
        {
            SqlCommand cmd = new SqlCommand("Select * from Items", con); //uses connection object to send command
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            con.Open();
            adapter.Fill(dt);

            string jsonResult = JsonConvert.SerializeObject(dt);
            return jsonResult; // should return the fetched table as json data
        }
    }
}
}