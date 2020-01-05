// Функция с помощью которой можно вписать рандомное число в ячейку таблицы
// Использовал для того чтобы вручную форсировать обновления в таблицах использующие функцию в ячейках
// =VALUE(SUBSTITUTE(IMPORTXML("https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.xml"&"?"& $A$3 &"?iss.meta=off&iss.only=marketdata&marketdata.columns=SECID,LAST";CONCATENATE("//row[@SECID='";$B9;"']/@LAST"));".";","))
// Не забываем подключить тригер иначе не будет все работать когда таблица закрыта и скрипт не запускается вручную.

function Force_ImportXML()  // Имя функции
{
  var id = "13dnNr05Ix7zDU8eY3Fbra0R9w1Ht7HkGSsfP4DAsZ9w";  // id google таблицы
  var ss = SpreadsheetApp.openById(id);  // Объявляем переменную ss для var sheet
  var sheet = ss.getSheetByName("Портфель");  // Выбираем лист на который записываем данные
  
  var numRows=sheet.getLastRow();
  var numColumns=sheet.getLastColumn();

  for (var i = 1; i < numColumns + 1; i++)  // Перебираем столбцы одной строки и записываем значения в них
  // Начинаем от единицы потому что дальше функция не примет 0
  {
  var number = Math.floor(Math.random() * 1000) + 1;  // Генерируем случайное число от 1 до 1000
  sheet.getRange(3, i, 1, 1).setValue(number);  // Set values to target cell range getRange(row, column, numRows, numColumns)
  }
}