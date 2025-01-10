using System;   
using Back.API.Models;
//using System.DateOnly;

namespace Back.API.Models
{
public class Data 
{
    public int ID {get; set;}
    public int Number {get; set;}
    public string Description {get; set;} = string.Empty;
    public string Category {get; set;} = string.Empty;
    public string Status {get; set;} = string.Empty;
    public DateOnly DateCreated {get; set;}
}

}