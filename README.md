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

The NLM CTS2 service requires a UMLS UTS Username/Password.

This client has been tested on Internet Explorer 11, Firefox 28, Safari 6, and Chrome 34.