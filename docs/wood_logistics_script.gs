function updateLogistics() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  var range = sheet.getSheetByName('Routes').getDataRange();
  var values = range.getValues();
  for (var i = 1; i < values.length; i++) {
    var origin = values[i][0];
    var destination = values[i][1];
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + encodeURIComponent(origin) + '&destinations=' + encodeURIComponent(destination) + '&key=' + apiKey;
    var response = UrlFetchApp.fetch(url);
    var json = JSON.parse(response.getContentText());
    var element = json.rows[0].elements[0];
    if (element.status === 'OK') {
      range.getCell(i+1, 3).setValue(element.distance.value / 1000); // km
      range.getCell(i+1, 4).setValue(element.duration.value / 3600); // hours
    }
  }
}
