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

function Mail_Alert_1() 
{
  // id google таблицы
  var id = "13dnNr05Ix7zDU8eY3Fbra0R9w1Ht7HkGSsfP4DAsZ9w";
  // Объявляем переменную ss для var sheet
  var ss = SpreadsheetApp.openById(id);
  // Выбираем лист на который записываем данные
  var sheet = ss.getSheetByName("Email");
  // First row if data to process / Первые строки с данными для обработки
  var startRow = 4;
  // Number of rows to process / Количество строк для обработки данных
  var numRows = sheet.getLastRow(); // Позволяет определять последнюю заполненную строку как конец массива
  // var numRows = 3; // Количество строк в массиве
  // Fetch the range of cells A2:C4 / Выделяем диапазон А2:B4
  // startRow, 1 = Строка 1 / Столбец 1
  // numRow = Количество строк в массиве / Столбец 4
  var dataRange = sheet.getRange(startRow, 1,  numRows, 4)
  // Fetch values for each row in the Range / Получаем данные с этих ячеек
  var data = dataRange.getValues();
  // Little loop / Вроде как начало цикла который проходиться по строкам
  for (var i = 0; i < data.length; ++i) 
  {
    var row = data[i];
  // Email адрес на который отправляем письмо
    var email = "anklav24@gmail.com"; 
  // Тема письма о росте котировки
    var subject1 = "Котировка инструмента " + row[1] + " выросла на " + row[3] + "% с предыдущей торговой сессии. Текущая цена " + row[2] + " руб.";
  // Тема письма о обвале котировки
    var subject2 = "Котировка инструмента " + row[1] + " упала на " + row[3] + "% с предыдущей торговой сессии. Текущая цена " + row[2] + " руб.";
  // Текст письма, в данном случае пустое
    var message = "";
  // Отправляем письмо если значения в строках столбца D > 3
      if(row[3] >= 3)
    {
    MailApp.sendEmail(email, subject1, message);
    } 
  // Отправляем письмо если значения в строках столбца D < -3
     if(row[3] <= -3)
    {
    MailApp.sendEmail(email, subject2, message);
    }  
   }
}
   // Не забываем подключить тригер иначе не будет все работать когда таблица закрыта и скрипт не запускается вручную.