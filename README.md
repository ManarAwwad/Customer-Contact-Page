Guinness tool to serve the beneficiaries of Taibah university campus

How to create a Google sheet file and make it as a database.

VS Code:
At the beginning, you need to have a background in HTML, CSS, JS to be able to implement the following requirements:
 1. Create HTML file to identify the required input field that you need from your customer.
 2. Create CSS file to style your HTML file and make it responsive to any screen devices.
 3. Create js file to add animation such as: waiting alert and so on, use EventListener() method to make the function be executed when the event occurs (submit button has clicked).

Google Sheet:

1. Open a new Google Sheet file.
2. From menu bar choose extensions > apps script
3. Paste the following code:
   
   const sheetName = 'form data'
const scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function(header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
 4. Excute the mention code.
 5. Deploye it and generate your URL to use it in POST method in the HTML file.

 
