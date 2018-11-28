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
          const accounts = data.map(account => ({
            name: account[0],
            country: account[1],
            public: account[2],
            author: account[3],
            type: account[4],
            tags: account[5]
          })) || [];
          callback({
            accounts
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}