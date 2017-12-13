***ITS 2017***
***JAVASCRIPT***
**MEMBERS: *Toqir Nasir, Pietro Chiarva, Gianluca Abate, Stefano Tortone.***




THE Wheater Station
========================

inserire descrizione

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
}









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
        - alertTorinoMeteoError: Gianluca
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

    other:
        - post the jsonBlob backup jsons: Gianluca
        - style:
        - animations:




**CHANGELOG:**
--------------
Gianluca: c'è un po' di codice commentato in getApiData(). Più o meno ho scritto nei commenti a cosa serviva e perchè non l'ho ancora
          cancellato
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
### Removed
