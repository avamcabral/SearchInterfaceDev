using System;   
using Back.API.Models;
//using System.DateOnly;

namespace Back.API.Models
{
public class Data //sets up class for mapping and storing data received and for sending.
{
    public int? Number {get; set;}
    public string Description {get; set;} = string.Empty;
    public string Category {get; set;} = string.Empty;
    public int? Status {get; set;}
    public DateTime? beginDate {get; set;}

    public DateTime? endDate {get; set;}
}

}