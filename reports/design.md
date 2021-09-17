# Introduction

This document describes the architecture and design of a single page web application that interacts with microservices via RESTful APIs.
The key elements in this document include the architecture, user interface, client components, and server classes.

This is a living document that is updated as changes are made each sprint.
The initial document describes the Base code students are given as a starting point for the semester.
Students are expected to update this document as changes are made each sprint to reflect the evolution of their application and key decisions they make.
The Base section serves as an example.


# Base

The Base is a simple application to provide the architecture to the students at the beginning of the semester.
The JavaScript code will be useful examples for students to learn from and leverage in the code they write for sprint 1.
The progressive display of information using collapsible sections and popups will serve as examples of good user interface design.
The overall design is somewhat minimalist/simple for the intended mobile device audience.

### Architecture

The Base architecture is a JavaScript single page web application in an HTML5 browser that uses RESTful APIs to access Micro-services provided by a Java server running on Linux.
The client consists of a minimal index.html file that loads and executes the bundled JavaScript application.
The client and server files are bundled into a single JAR file for execution on the Linux server at a specified port.
The browser fetches the client files from the server on the specified port.

![overview](images/BaseArchitecture.png)

The browser loads the index.html file (by default) which in turn loads the bundled JavaScript single page application bundle.js.
* The single page application makes RESTful API requests to the server on the same port using  JavaScript's asynchronous fetch.  
* A protocol document describes the JSON format for the RESTful API requests and responses.
* JSON Schemas are used to verify requests on the server side and responses on the client side.
* On the client, ReactJS renders the application using ReactStrap, Leaflet, and application defined components.
* GSON is used on the server to convert JSON requests to Java objects and Java objects to JSON responses.
* The client (ulog) and server (SLF4J) logging mechanisms control debugging output during development and production - print statements and console logging should never be used. 

The following architecture elements are not included in the Base system.
They will be added later in the semester.
* Client filesystem .
* Server SQL .
* Server concurrency.


### User Interface
![base](images/BaseUserInterface.png)

The basic screen in black shows the view on a mobile device, with a header, footer, and map.
The header contains a earth logo and the team name obtained from the server when the client was loaded.
The footer contains a connection icon along with the current server name and server URL the client is connected to.
The blue areas highlight the actions that may be performed.

Rather than buttons or icons to signify actions, we are associating actions with elements that are already on the screen to reduce the clutter.
We are using both popups and collapsible sections in this design rather than choosing to use one exclusively.
* Collapsible/Hidden sections are used for the map and about sections since they have a significant amount of content and we don't need to see them at the same time.
* A popup is used for the URL change since we want to control the interaction until the operation is completed. It seemed more natural than another collapsible section.

#### Clicking on the map places a marker.
Whenever a user clicks on the map, the client should display a marker with latitude and longitude at that location.
We only maintain a single marker at this point displaying the most recently clicked location.

#### Clicking on the team name should tell me more about the team.
Whenever a user clicks the team name in the header, a collapsible section should appear under the header with information about the team.
The collapsible map should disappear so only the about or map are displayed.
A close button / icon in the top right corner of the about will close the about and return the map to display.
A simple toggle in state should be able to control this rendering.
The about page should contain the team name as a heading, but be otherwise blank in base. 

#### Clicking on the URL in the footer should let me change the server.
Whenever a user clicks on the URL a popup should open showing the team name, the URL in an input text box, and a Cancel button.
When the user modifies the URL, a Test button should appear and the server name should disappear.
When the Test button is clicked, it will attempt to connect to the server.
If not successful, nothing changes and the user may continue to make URL changes or click the Cancel button to return to the original sever (it shouldn't change).
If successful, the new server name should appear and a Save button should replace the Test button.
When the user clicks the Save button, the server connection should change and the popup closes, revealing the new servername and URL in the footer.


### Component Hierarchy
The component hierarchy for the base application depicted below shows the our top level App component with four children components.
* App renders the major components on the screen.
* Header renders an icon and a team name in the top banner.
* Footer renders the current server connection in the bottom footer.
* Atlas renders a map.
* About renders information about the team.

We do not show the many ReactStrap components in this hierarchy, even though they will appear when you are debugging on the client.

### Class Diagram
The class diagram for the base application depicted below shows the basic structure of the web server application.

The classes in blue represent the classes specific to this application.  
* WebApplication processes command line parameters and creates MicroServer.
* MicroServer start a web server on the given port, configures the server for security, static files, and APIs for different types of requests, and processes the requests as they arrive.
* JSONValidator verifies a request is properly formatted before attempting to process it using JSON Schemas.
* ConfigRequest is a specific request that allows the server to respond with its configuration to allow interoperability between clients and servers. 
* RequestHeader defines the basic components of all requests.

The classes in orange represent the external libraries used by the application.
Often there are several related classes but we've listed only one to simplify the diagram.
* GSON converts a JSON string into a Java object instance.
* Spark provides the necessary web support for our MicroServer.
* JSON provides libraries to manipulate JSON objects using the JSON Schema libraries.
* Logger provides a centralized logging facility used in all of the application classes.


# Sprint 1
### User Interface
A user will be able to see a list of places that they click on the map, with the most recent map click being located at the top of the list. The user will have the ability to clear all or indivudual click entries.  

A user will be able to see more than just latitude and longitude when clicking on the map by converting latitude/longitude into a textual description using reverse geocoding. The marker and history will also contain more information. 

A user will be able to select a different background map and remember that selected map for future sessions. 

A user will be able to find the name of the the team that the application's components are currently using by locating the team name in the browser tab/HTML title and application header/footer.

### Component Hierarchy
The components for the base application are depicted in a hierarchical depiction below.
![base component hierarchy](images/BaseComponentHierarchy.PNG)
* About page containing the team's name, mission statement, and member biographies. 
* List of most recent user map clicks with clearing abilities.
* Textual description of latitude/longitude and addituonal information on the user marker and history.
* Option for the user to select a different background map that is remembered for future sessions. 
* Team name on the header/footer and browser tab/HTML title.

### Class Diagram
![class diagram](images/BaseClassDiagram.png )

* Web Application initializes the script to create the Microserver
* Microserver reads the Json Validator and Spark configuration to initialize the resources
* Config request tests HTTPS protocols to delegate permissions
* Request Header allows access to Config Request for more independent details about the protocol
* Microserver, Json Validator, Config Request and Request Header write logs to Logger of all the processes carried out


### About Page 

To access the about page you may click the title at the top and a pop up for the about page will appear. The about page is titled with our team name, number, as well as the mission statement. Below that each of the team members will be listed with a picture that represents who they are, their name, as well as a short bio.
![about](images/About.jpg)

### Map Page
![map](images/Map.jpg)
* Users clicks get saved into list of places
* User can clear all entries with the clear button
* User can clear individual entries with the X button in the corner of an entry
# Sprint 2
### Updated Map Page
The user will now be able to search for a location, as well as show their current location
![UI](images/imgpsh_fullsize.png)
* User can click to show thier location on the map
* User can click to search for a location such as a string
* User will be able to search using latitude and longitude
# Sprint 3
### Updated Map Page
![UI](images/Distances.PNG)
* Allows user to search using words or coordinates, with a drop down button
* Shows user total trip distance, including distance back to the start from the end
* Action dropdown to allow user to remove trip, and accomodate future implementation
* Shows user distances between adjacent places within the trip

### Find Places Pop-up
![UI](images/FindPlacesPopUp.PNG)
* Once the user searches for a place by given criteria, this popup will show a list of the places
  that are found from the database
* User can then select a location from this list, and add it to the trip
 
# Sprint 4 
![UI](images/SaveTrip.PNG)
* User will be able to save a current trip in CSV or JSON
* User will be able to load a saved trip
* User will now be able to see lines connected all the places in the current trip
# Sprint 5
![UI](images/DropDown.PNG)
* User will have a new array of options to edit the trip including:
* Being able to remove a place from the trip
* Select a new starting point for the trip
* Move an individual place anywhere within the trip
* Add notes to an individual place
* Correct the place details of an individual place

![UI](images/Move.PNG)
* This is the Move pop-up that will allow the user to select where in the trip that the user wishes to move the selected place to

![UI](images/AddNotes.PNG)
* This is the Add Notes pop-up that will allow the user to add a note to the individual trip

![UI](images/Correct.PNG)
* This is the Correction pop-up that will allow the user to make a place details correction to the selected place in the trip

