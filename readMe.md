***ITS 2017***
***JAVASCRIPT***
**MEMBERS: *Toqir Nasir, Pietro Chiarva, Gianluca Abate, Stefano Tortone.***

The Wheather Station
========================

The application allows you to view the stations on the site
torinometeo (via an API call), for each station there is a header
containing: the name of the station, the city, the region, the pressure,
the humidity, the wind force, the nation (image of the flag), the
temperature and relative weather.
It is possible to click on a station to open the relative body containing the
description of the station, the image of the webcam of the stazone and a link to
view the position of it.
A search system is available via textbox and selectbox, in the
textbox you can search for the station name while in the selectbox
you can filter the stations by country.
The page is refreshed every 30 seconds so as to constantly update the data
of stations, you can change the refresh time (via a
texbox and related button).
Also you can choose a past date (via the related datePicker
and relative Historicami button) to go and see the data of the stations in
that date.
Finally on the left the collection of the
most relevant information: page loading status, report of the
possible errors in the API call, last update and possible stop of the
refresh (via relative button).



**WeatherStationManager**
-----------------------

	- allData: [all data of stations, it is update at the end of every calls]
	- collapsibleOpenedIndex: [it is an index that manage the openings and the closure of a panel]
    - collapsebody: [array used to manage the body of collapse]
	- loadimageoption: [number used to the manage of image]
	- refreshtime: [the time of the refresh]
	- loadedStations: [it has the number of loaded station]
	- slugs: [it is used to give the corrispondence of slug and jsonblob calls]
	- jsonBlobCalls: [it is used for manage the jsonblobcalls]
	- standardCallActive: [it is used to the calls]
	- timeOut: [it is used to make the timeout of refresh]
	- stoprefresh: [a count of the button of stop refresh]



**MANAGEMENT OF WORK:**
-----------------------

    We split the program functions among the members of the group.
    We have collaborated together working at school and at home using the program : TeamViewer
    we have shared code with a repository online using Git.

    functions:

        - getApiData: Toqir
        - getAllStations: Gianluca
        - assignCollapsibleClick: Toqir
        - createAllCollapsiblePanel: Toqir
        - createCollapsiblePanel: Toqir
        - createPanelHeader: Toqir
        - createPanelBody: Toqir
        - getFlagNation: Toqir
        - temperatureColorUtilities: Gianluca
        - createTemperatureBox: Gianluca
        - appendTemperatureBox: Gianluca
        - loadDataOnDOM: Toqir
        - getDataFromJSONBlob: Gianluca
        - getStationFromJSONBlob: Gianluca
        - uploadJSONBlob: Gianluca
        - keepJsonBlobUpdated: Gianluca
        - findSlugFromStation: Gianluca
        - findBlobIdFromSlug: Gianluca
        - getSelectNation: Pietro
        - getSelectedValue: Pietro
        - createLinkforMaps: Tortone
        - updateImageApi: Tortone
        - managerpanelbodyimage: Tortone
        - utilitiesformanageimage: Tortone
        - loadingPercent: Gianluca
        - updateLoading: Gianluca
        - initializeLoading: Gianluca
        - isValidDate: Gianluca
        - getHistoricalData: Gianluca
        - buttonsaverefresh: Tortone
        - dateutilities: Tortone
        - PadNum: Tortone
        - filter: Pietro
        - filteringAtRefresh: Pietro
        - appendHeaderData: Pietro
        - buttonstoprefresh: Tortone
				- sortAllDataArray: Gianluca
				- getCompleteJsonFromTorinoMeteo: Gianluca
				- postNewStationOnJsonBlob: Gianluca

    other:
        - style: whole group
        - animations: whole group


**Script files Description:**
-----------------------
 - DOM_Manipulation.js: Contains all the function to manipulate the html DOM
 - historicalCall.js: Contains all the functions to show histocal meteo data
 - jsonBlobBackup.js: Contains all the functions to manage the backup calls from and to JSONBLob
 - panelBodyUtilities.js: Contains all the utilities for the creation of panel body
 - searchFilter.js: Contains all the function to filter the meteo stations
 - temperatureColorUtilities.js: Contains all the function to calculate the color of the temperature box by the temperature value
 - slugs.js: Contains the relationship between jsonBlob and Torino Meteo
 - loading.js: Contains all the functions to show the loading status of the calls
 - utilities.js: Contains some usefull functions to be called by the more specific functions
 - script.js: Main code to manage the page

**CHANGELOG:**
--------------

#
All notable changes to this project will be documented in this file.

###**[2.1.0] - 2017-07-16 // al posto di questa l'ultima data**
### Added
- getApiData: Gianluca 9/12/2017
- assignCollapsibleClick: Toqir 2/12/2017
- createAllCollapsiblePanel: Toqir 2/12/2017
- createCollapsiblePanel: Toqir 2/12/2017
- createPanelHeader: Toqir 2/12/2017
- createPanelBody: Toqir 2/12/2017
- getFlagNation: Toqir 2/12/2017
- createLinkforMaps: Tortone 4/12/2017
- updateImageApi: Tortone  7/12/2017
- managerpanelbodyimage: Tortone  7/12/2017
- utilitiesformanageimage: Tortone  7/12/2017
- dateutilities: Tortone 7/12/2017
- PadNum: Tortone 7/12/2017
- updateSlug.js: Gianluca 8/12/2017
- buttonsaverefresh: Tortone 11/12/2017
- searchFilter.js: Pietro 11/12/2017
- buttonstoprefresh: Tortone 12/12/2017

### Changed
- createCollapsiblePanel: Pietro 11/12/2017 , ho cambiato l'id del collapse(mi serviva per la ricerca)
- file structure redefined: Gianluca 14/12/2017
### Removed
