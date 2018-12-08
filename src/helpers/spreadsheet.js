import config from "../config";
/**
 * Load the data from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A4:T"
      })
      .then(
        response => {
          const data = response.result.values;
          const DataSets = data.map((dataSet, index) => ({
            id: index,
            manufacturer: dataSet[0],
            product: dataSet[1],
            description: dataSet[2],
            sensitivity: dataSet[3],
            tat: dataSet[4],
            regulatory: dataSet[5],
            score: dataSet[6]
          })) || [];
          callback({
            DataSets
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}