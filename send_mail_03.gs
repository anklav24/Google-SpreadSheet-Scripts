// Отправка Email сообщения с проверкой указанного столбца если в нем значения удовлетворяют условию
// Sends emails with data from the current spreadsheet.
// https://developers.google.com/apps-script/articles/sending_emails
// https://github.com/gsuitedevs/apps-script-samples/blob/master/gmail/sendingEmails/sendingEmails.gs
// https://www.youtube.com/watch?v=FcnLtt-uBAk
// http://qaru.site/questions/698568/send-email-when-value-changes-in-google-spreadsheet
// https://productforums.google.com/forum/#!topic/docs/7gdrXQbME4U;context-place=topicsearchin/docs/category$3Amac%7Csort:relevance%7Cspell:false
// Тут есть разные варианты кода

  // Счет столбцов начинается с 0
  // row[0] First column A / Первый столбец A
  // row[1] Second column B / Второй столбец B
  // row[2] Third column C / Третий столбец C

function Mail_Alert_3() 
{
  // id google таблицы
  var id = "13dnNr05Ix7zDU8eY3Fbra0R9w1Ht7HkGSsfP4DAsZ9w";
  // Объявляем переменную ss для var sheet
  var ss = SpreadsheetApp.openById(id);
  // Выбираем лист на котором будем производить действия
  var sheet = ss.getSheetByName("Email");
  // First row if data to process / Первые строки с данными для обработки
  var startRow = 4;
  // Number of rows to process / Количество строк для обработки данных / Количество строк в массиве
  var numRows = 1;
  // Fetch the range of cells B4:F4 / Получаем значения ячеек B4:F4 в переменную dataRange / Получаем по сути матрицу
  // startRow, 1 = Строка в массиве 1 / Столбец в массиве 1
  // numRow, 5 = Количество строк в массиве / Столбец 6 (F)  / Считаем с 1
  var dataRange = sheet.getRange(startRow, 1,  numRows, 6)
  // Fetch values for each row in the Range / Получаем данные с этих ячеек
  var data = dataRange.getValues();
  //---------------------------------------------------------------------------------

  // Little loop / Вроде как начало цикла который проходиться по строкам
  for (var i = 0; i < data.length; ++i) 
  {
    var row = data[i];
  // Задаю переменную для считывания ячейки из массива. В данном случае Целевая цена. Строка 4 стобец F (5) считаем с 0
  var targetValue = row[5]
  
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  // Задаю переменную спред, при повышенной волатильности можно уменьшить.
  var spread = 1
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  
  // Email адрес на который отправляем письмо
    var email = "anklav24@gmail.com"; 
  // Тема письма о росте инструмента
    var subject1 = "Цена " + row[1] + " выросла до " + row[2] + " руб.";
  // Текст письма
    var message1 = " Изменение с предыдущей торговой сессии " + row[3] + "%. \n Изменение от целевой цены +" + (row[2] - targetValue) + " Руб." ;
  // Отправляем письмо если значения целевой цены больше или равно на значение спреда.
    if(row[2] >= targetValue + spread)
    {
    MailApp.sendEmail(email, subject1, message1);
    } 
  // Тема письма о обвале инструмента 
    var subject2 = "Цена " + row[1] + " упала до " + row[2] + " руб.";
  // Текст письма
    var message2 = " Изменение с предыдущей торговой сессии " + row[3] + "%. \n Изменение от целевой цены -" + (targetValue - row[2]) + " Руб." ;
  // Отправляем письмо если значения целевой цены меньше или равно на значение спреда.
     if(row[2] <= targetValue - spread)
    {
    MailApp.sendEmail(email, subject2, message2);
    }
 // После срабатывания скрипта по спреду переписываем ячейку целевой цены F4 текущим значение цены C4, так мы избавимся от спама на почту. ПОХОДУ НЕТ ВЕДЬ ТРИГЕР ПО ВРЕМЕНИ РАБОТАЕТ
 //  sheet.getRange("F4").setValue(row[2]);
   }
}
   // Не забываем подключить тригер иначе не будет все работать когда таблица закрыта и скрипт не запускается вручную.