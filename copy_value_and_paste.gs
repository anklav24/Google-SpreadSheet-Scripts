// Функция с помощью которой можно скопировать и вставить данные на строку ниже из одной таблицы в другую или из одного листа 
// либо вставить строку и значение в нее
// в другой, также можно и на одном листе все провернуть.
// Не забываем подключить тригер иначе не будет все работать когда таблица закрыта и скрипт не запускается вручную.

function Copy_Value_And_Paste()
{       
    var sourceFrom = SpreadsheetApp.openById('13dnNr05Ix7zDU8eY3Fbra0R9w1Ht7HkGSsfP4DAsZ9w');  // Separate spreadsheet book from
    var sourceSheet = sourceFrom.getSheetByName('database');  // Sheet tab with source data
    var rowsSourceSheet=sourceSheet.getLastRow();  // Получить последнюю строку
    var colsSourceSheet=sourceSheet.getLastColumn();  // Получить последний столбец
    var sourceCellValues = sourceSheet.getRange(3, 1, 1, colsSourceSheet).getValues();  // get cell range values
    
    var sourceTo = SpreadsheetApp.openById('13dnNr05Ix7zDU8eY3Fbra0R9w1Ht7HkGSsfP4DAsZ9w');  // Separate spreadsheet book to
    var targetSheet = sourceTo.getSheetByName('database');  // Target sheet
    var rowsTargetSheet=targetSheet.getLastRow();
    var colsTargetSheet=targetSheet.getLastColumn();
    
    targetSheet.insertRowsAfter(13, 1);  // Insert one row after the thirteenth row
    targetSheet.getRange(14, 1, 1, colsTargetSheet).setValues(sourceCellValues);  // Set values to target cell range getRange(row, column, numRows, numColumns)
}