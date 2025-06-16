# Wood Logistics Sheet Example

This document provides guidance to create a Google Sheets solution for managing wood logistics. It includes a sample CSV and Apps Script code.

## Structure
The sheet should contain the following main tabs:

1. **Prices**
   - Date
   - Region
   - Wood Type (Pinus/Eucalyptus)
   - Price per m³
   - Source

2. **Routes**
   - Origin
   - Destination
   - Distance (km)
   - Estimated Duration
   - Truck Model
   - Axles
   - Freight Price per km

3. **Calculations**
   - Total Cost = Distance × Freight Price per km
   - Automatic updates via Apps Script

## Automation
Use Google Apps Script to connect to Google Maps API and update wood prices and freight data daily. A starter script is provided in `wood_logistics_script.gs`.

Import `wood_logistics_template.csv` into Google Sheets to start.
