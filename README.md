lexevs-cvsv
===========

LexEVS Common Value Set Viewer

## Features Include ##
- Drop down to select a CTS2 Service.
- Provide list of Value Sets available in selected service.
- Provide list of Value sets entities in a selected Value Set.
- A single value set can be downloaded into CTS2 XML format.

## CTS2 Value Set Services Client Profile ##
This viewer can connect to CTS2 services to retrieve value sets if the services meet the following requirements:

- CTS2 Version 1.0 or 1.1
- CTS2 Standard JSON
- Search: value set matchvalue must search on value set names (valueSetName)
- Value sets (in a ValueSetCatalogEntryDirectory) must have a currentDefinition defined
- Structural Profile: Value Set
    - Functional Profile: Read
    - Functional Profile: Query
    - Functional Profile: Resolution

For performance reasons, the value set viewer has put in place the following limitations:

- Searching for value sets is limited to returning the first 2000.
- Retrieving value set entries for a selected value set is limited to the first 500.
- Downloading value set entries for a selected value set is limited to the first 2000.

Known issues:

- Mayo (TLAMP HL7) service does not return value set entries for a selected value set.
- NLM (VSAC) service is encountering a login failure and will not allow the user to continue.

The NLM CTS2 service requires a UMLS UTS Username/Password.

This client has been tested on Internet Explorer 11, Firefox 28, Safari 6, and Chrome 34.


## Proxy ##
The Proxy script allows us make calls to the NLM CTS2 service (XML requests) which would otherwise be restricted by the client due the call being considered "cross-site scripting".  Because this is an XML request, we cannot use getJSON (which would resolve the "cross-site scripting" issue).

Any calls that are made from the client that begin with "http://infvsac/vsmcsecure" (the internal Informatics URL for the NLM VSAC CTS2 Service) are redirected to call "proxy.php".   When proxy.php (on Informatics) is called, it will take make the call to the original URL and pass the results back to the client.

For security reasons, only requests to the following URLs are allowed.  All others are blocked.
- http://infvsac/vsmcsecure/cts2/valuesets
- http://infvsac/vsmcsecure/cts2/valueset


