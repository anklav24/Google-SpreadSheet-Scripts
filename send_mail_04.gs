// Скрипт с помощью которого можно просмотреть все столбцы из массива и отправить письмо при выполнении условия.

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

function Mail_Alert_4() 
{
  // id google таблицы
  var id = "13dnNr05Ix7zDU8eY3Fbra0R9w1Ht7HkGSsfP4DAsZ9w";
  // Объявляем переменную ss для var sheet
  var ss = SpreadsheetApp.openById(id);
  // Выбираем лист на который записываем данные
  var sheet = ss.getSheetByName("database");
  
  var row = 1;  // Начальная строка
  var column = 18;  // Начальная колонка
  var numRows = 12; // sheet.getLastRow(); // Позволяет определять последнюю заполненную строку как конец массива
  var numColumns= 13; // sheet.getLastColumn();  // Позволяет определять последний заполненный столбец как конец массива
    
  var dataRange = sheet.getRange(row, column,  numRows, numColumns)  // getRange(row, column, numRows, numColumns)
  var data = dataRange.getValues(); // Fetch values for each row in the Range / Получаем данные с этих ячеек
  
  for (var j = 0; j < numColumns; j++)  // Перебираем столбцы сразу в нескольких строках и получаем значения из них
  {    
      var cellNameValue = data[1][j];
      var currentProfit = data[2][j];
    
      var monthAverageValueBool = data[4][j];
      var monthAverageValue = data[5][j];
      var monthDifferents = monthAverageValue - currentProfit;
//      monthDifferents = Math.round(monthDifferents);  // Округляем число
      monthDifferents = monthDifferents.toFixed(2);  // Округляем число
    
      var halfYearAverageValueBool = data[6][j];
      var halfYearAverageValue = data[7][j];
    
      var yearAverageValueBool = data[8][j];
      var yearAverageValue = data[9][j];
    
      var allTimeAverageValueBool = data[10][j];
      var allTimeAverageValue = data[11][j];
        
      var email = "anklav24@gmail.com";  // Email адрес на который отправляем письмо
      var subject = cellNameValue + " стал дешевле средней балансовой прибыли за месяц на " + monthDifferents + "%."; // Тема письма о росте котировки
      var message = "Средняя прибыль за месяц: " + monthAverageValue + "%. Текущая прибыль: " + currentProfit + "%.";  // Текст письма, в данном случае пустой
            
      // Отправляем письмо если значения в строках столбца
      if(monthAverageValueBool)
      {
      var O = 1
      MailApp.sendEmail(email, subject, message);
      }
      else
      {
      var O = 0
      }
  }
}

   // Не забываем подключить тригер иначе не будет все работать когда таблица закрыта и скрипт не запускается вручную.