# SearchInterfaceDev

## Table of Contents:

-[Overview](#overview)
-[Prerequisites](#prerequisites)
-[InstallationAndSetup](#installationandsetup)
-[Usage](#usage)
-[DesignNotes](#designnotes)


## Overview

This Search Interface Development project is meant to showcase skill building in using .NET to build an API, and effectively produce results from an SQL Server and display them through a user interface. The API uses .NET Core 6+ Web API, the database is an SQL Server Express database, and the frontend is a Javascript React web application. The UI allows you to enter several or no filters to search and filter items from a sample database, which are then displayed in an organized manner. 

## Prerequisites

To use, the user must have SQL Server or SQL Server Express installed, including Microsoft SQL Management Studio for database management. SQL Server will host your database, and the management studio will allow you to build and populate your sample database with the provided data. To install, go to the official Microsoft download page and follow the instructions. During installation, it will give you the opportunity to see your connection string, which you can save for later.

The user must also have .NET SDK and node.js installed. To install these, go to the respective official websites and follow download and installation instructions. 

## InstallationAndSetup

To install, clone this repository, either through Github Desktop, or through the command line using 
'''bash
    git clone https://github.com/avamcabral/SearchInterfaceDev.git

Once you have cloned the repository, you must set up the database, and make sure the connection string is correct. After establishing a connection to your master database in the SQL Management Studio, click 'new query' and run the 'DBandTablesCREATE' script found under DataBaseScripts in this repository. This will create your database, named Inventory. Next, in the top left corner, switch from 'master' to 'Inventory', click 'new query' and run the 'Insertions' script, also found under DataBaseScripts. I have found it easiest to run these separately to avoid any errors in SQL Management Studio. You can check that your database has been created properly by again selecting 'new query' and running a simple Select * from Items; Select * from Categories. This should yield both tables in the 'results' tab at the bottom of the screen.

After creating your database, we need to ensure the connection string will work. In Back\API\appsettings.Development.json, our connection string is stored and assigned to a value for use. It can be edited here. Make sure that if you changed the server name from the default that it matches in the connection string. 

Next, navigate to Back\API to resolve dependencies and start the backend. In the terminal, run 
dotnet restore
to install dependencies. Once that finishes successfully, run 
dotnet run
to start up the API. 

Finally, to start the web app, navigate to FrontendReact\ssdbui. In a new terminal window, run 
npm install
to install dependencies, and once that finishes successfully, run 
npm start
to start the web app. If it suceeds, it should launch the web app in your browser. 

## Usage

The web app will load and there will not be any results posted yet, instead it will display a prompt for you to hit search, or try entering some filters. The 'Numbers' field is a text box designed to take only integers, and will return an exact match. Items in the sample database are number 12341, 12342, 12343, and so on till it reaches double digits, then it's 12310, 12311, and so on. There are 25 entries total. 
The Description textbox is designed to take letters, it can be the entire itme name(description) or a substring. For example, entering'shelf' will return 'Wooden Bookshelf' and 'Metal Shelf'. 
The Category dropdown allows you to select a category that aligns with the item. 
The status dropdown allows you to select a status, inactive, active, or both. 
The Created Before allows you to choose a date that all entries returned will be younger than, and Created After returns all entries older than that date. Using both will select in between.
The Search button will send your query off to the database to fetch results. Clicking search with all empty search fields will return the entire database, and you can enter as many or as little filters as you like. 
The Reset button will reset all the search fields and wipe the results.

## DesignNotes

For the database design itself, a two table database is easily normalized, and they share a foreign key relationship where Category references Category ID. 

The API follows an MVC stucture, separating out the Model classes from the controller. To follow SRP, lending all classes to expandability and reusability, as well as helping keep the project organized, there is a Data class for storing data, and a Data Access class that handles the input data and actually communicates with the database. The controller, because it is a REST API, handles the flow of data and exposes the endpoint to the UI, and only handles getting data and passing it along to the Data Access object. This makes the code easy to understand, maintain, and troubleshoot, as well as allowing it to be more flexible in the event of expansion. For the SQL queries, because of the simplicity of the application, I chose to go smaller and more granular with ADO.NET., instead of using something built for larger workloads such as EF CORE. ADO.NET allowed me to build lightweight, granular, dynamic queries, and I felt I did not need the abstraction of a larger framework like EF CORE. Because of this, there's no database context that is actually used, because I felt it was not needed in this application. However, I did choose to leave the context file in, along with the commented out registration code in Program.cs, just to potentially facilitate expansion of the application. 

Furthermore, as it is a very lightweight operation being performed each time, with a small workload, the connection to the database is opened and closed with each request. This, however, would not work on a larger database and it would be better to leave the connection open when performing operations, or, have a conneciton pool.

Errors should be caught properly when experienced so as not to crash the application. Things such as improper input should be handled gracefully amd simply display a friendly error message to the user upon occurrence. In addition, textbox inputs are sanitized and verified, and while other inputs are also checked, on the frontend, the user is very limited to the correct types when submitting input. 

For the frontend, I chose Javascript with React, as it's powerful and boasts a wide variety or libraries and tools to use, for example, Axios, which is what I used for the REST calls to the API. The component based architecture lends itself well to flexibility, scalability, and reusability, and allows for separation of responsibilities in your objects and organization of the code base. It's also extremely well-suited for smaller, single page applications where information being displayed is frequently being updated. Reactivity is also extremely helpful in the development process, as you can actively see changes you make within seconds, which makes developing the web app much easier and more efficient. As for the API call, the user does not interact with the server at all, and instead makes a REST call to the API through axios, allowing the API to follow REST standards. 
