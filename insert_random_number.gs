// Функция с помощью которой можно вписать рандомное число в ячейку таблицы
// Использовал для того чтобы вручную форсировать обновления в таблицах использующие функцию 
// =VALUE(SUBSTITUTE(IMPORTXML("https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.xml"&"?"& $A$3 &"?iss.meta=off&iss.only=marketdata&marketdata.columns=SECID,LAST";CONCATENATE("//row[@SECID='";$B9;"']/@LAST"));".";","))


  // Имя функции
function Force_ImportXML() 
{
  // id google таблицы
  var id = "13dnNr05Ix7zDU8eY3Fbra0R9w1Ht7HkGSsfP4DAsZ9w";
  // Объявляем переменную ss для var sheet
  var ss = SpreadsheetApp.openById(id);
  // Выбираем лист на который записываем данные
  var sheet = ss.getSheetByName("Портфель");
  // Выбираем ячейку куда запишем данные 
  // Например A3 = getRange(3, 1)
  var range = sheet.getRange(3, 1);
  // Генерируем случайное число от 1 до 1000
  for (var x = 1; x <= range.getWidth(); x++) 
  {
    for (var y = 1; y <= range.getHeight(); y++) 
    {
      var number = Math.floor(Math.random() * 1000) + 1;
      range.getCell(y, x).setValue(number);
    }
  }
}
   // Не забываем подключить тригер иначе не будет все работать когда таблица закрыта и скрипт не запускается вручную.