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
      /* 
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
    } */

    [HttpPost]
    public string Search(Data queryParams)
    {
        string connectionString = _configuration.GetConnectionString("InventoryDB");

        using (SqlConnection con = new SqlConnection(connectionString)) //set up connection object

        { //base case below; should display entire table if no search terms are entered
            con.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;

            string query = "SELECT Items.Number, Items.Description, Categories.Name as Category, Items.Status, Items.DateCreated FROM Items INNER JOIN Categories ON Items.Category = Categories.ID WHERE 1=1"; 
        
            if (queryParams.Number.HasValue) 
                    {
                        int num = queryParams.Number.Value; //make sure its an int
                        cmd.Parameters.Add("@num", SqlDbType.Int).Value = num;
                        query += $" AND Number = @num"; //use a placeholder also 
                    }   

            if (!string.IsNullOrEmpty(queryParams.Description)) //assert it exists before doing anything with it
                {
                    string descrip = queryParams.Description; //cast it to a string just in case
                    cmd.Parameters.Add("@descrip", SqlDbType.VarChar).Value = descrip;
                    query += $" AND Description LIKE '%' + @descrip + '%'"; //should include all results with the entered substring
                } 

            if (!string.IsNullOrEmpty(queryParams.Category))
                {
                    string cat = queryParams.Category;
                    cmd.Parameters.Add("@cat", SqlDbType.VarChar).Value = cat;
                    query += $" AND Categories.Name = @cat";
                }

            if (!string.IsNullOrEmpty(queryParams.Status))
                {
                    string stat = queryParams.Status;
                    cmd.Parameters.Add("@stat", SqlDbType.VarChar).Value = stat;
                    query += $" AND Status = @stat";
                }


            if (queryParams.beginDate.HasValue)
                {
                    //DateOnly lowdate = queryParams.beginDate.Value;
                    DateTime lowdate = queryParams.beginDate.Value;
                    if (lowdate != null)
                    {
                    //DateTime lowDateTime = Convert.ToDateTime(lowdate); //(new TimeOnly(0, 0));//having problems with DateOnly to Date, has to be DateTime to communicate with SQL i think
                    cmd.Parameters.Add("@lowvalue", SqlDbType.Date).Value = lowdate.Date;
                    query += $" AND DateCreated >= @lowvalue";
                    }
                
                }
            if (queryParams.endDate.HasValue)
                {
                    //DateOnly highdate = queryParams.endDate.Value;
                    DateTime highdate = queryParams.endDate.Value;
                    if (highdate != null)
                    {
                    //DateTime highDateTime = Convert.ToDateTime(highdate); //(new TimeOnly(0,0));//having problems with DateOnly to Date, has to be DateTime to communicate with SQL i think
                    cmd.Parameters.Add("@highvalue", SqlDbType.Date).Value = highdate.Date;
                    query += $" AND DateCreated <= @highvalue";
                    }
                }
            
           /* if (lowdate.HasValue && highdate.HasValue)
                {
                    query += $" AND DateCreated BETWEEN @highvalue AND @lowvalue";
                }
            else if (lowdate.HasValue)
                {
                    query += $" AND DateCreated >= @lowvalue";
                }
            else if (highdate.HasValue)
                {
                    query += $" AND DateCreated <= @highvalue";
                }
*/
        
    

        cmd.CommandText = query;
        Console.WriteLine(query);

        foreach (SqlParameter param in cmd.Parameters)
{
    Console.WriteLine($"{param.ParameterName}: {param.Value}");
}

        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        adapter.Fill(dt);

        string jsonResult = JsonConvert.SerializeObject(dt);
        return jsonResult; // should return the fetched table as json data

        }
    }
}
}