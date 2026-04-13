# Google Sheets Setup

1. Открой таблицу: `https://docs.google.com/spreadsheets/d/1KUxUNeKrTM2DKtfris1Ix5QHo7PG0Q8s2p0L_Cvh3w0/edit?usp=sharing`
2. В таблице открой `Расширения -> Apps Script`.
3. Замени содержимое `Code.gs` кодом из файла [Code.gs](./Code.gs).
4. Нажми `Deploy -> New deployment -> Web app`.
5. Для доступа выбери `Anyone`.
6. Скопируй URL вида `https://script.google.com/macros/s/.../exec`.
7. Вставь этот URL в [config.js](../config.js) в поле `googleSheetsWebAppUrl`.

Что делает скрипт:

- создает лист по имени участника;
- если имя не указано, использует лист `Анонимно`;
- сохраняет одну строку на одну попытку;
- записывает ответы `q1-q36`, raw-оценки, итоговые шкалы и полный JSON payload.
