# SF-36 Frontend Demo

## Страницы сайта

- [Главная (промо)](https://notawhaie.github.io/sf36-frontend-demo/) — входная страница проекта с CTA для запуска теста.
- [Опрос](https://notawhaie.github.io/sf36-frontend-demo/test/) — пошаговое прохождение SF-36 (9 экранов, 36 вопросов).
- [Результат](https://notawhaie.github.io/sf36-frontend-demo/test/result/) — итоговый профиль по шкалам SF-36 и действия (скачивание/открытие таблицы/повторное прохождение).

Прямые адреса для копирования в браузер:

```text
https://notawhaie.github.io/sf36-frontend-demo/
https://notawhaie.github.io/sf36-frontend-demo/test/
https://notawhaie.github.io/sf36-frontend-demo/test/result/
```

Статический учебный сайт с пошаговой веб-версией опросника `SF-36`.

## Что уже реализовано

- 36 вопросов в формате многоэкранного wizard-интерфейса
- расчет 8 шкал прямо в браузере
- компактный экран результата с radar-диаграммой
- локальный черновик в `localStorage`
- необязательное поле `ФИО` на старте
- скачивание результата в `JSON`
- готовая интеграция с `Google Sheets` через `Google Apps Script`

## Структура

- [index.html](./index.html) — оболочка страницы
- [config.js](./config.js) — конфиг подключения к Google Sheets
- [app.js](./app.js) — логика интерфейса, расчета и отправки результата
- [styles.css](./styles.css) — оформление
- [google-apps-script/Code.gs](./google-apps-script/Code.gs) — серверная часть для Google Sheets

## Локальный запуск

Можно открыть `index.html` напрямую в браузере, но для комфортной проверки лучше поднять простой статический сервер:

```powershell
python -m http.server 8080
```

После этого сайт будет доступен по адресу:

```text
http://localhost:8080
```

## Google Sheets

Прямо по URL таблицы сайт записывать строки не может, поэтому используется `Google Apps Script` как веб-приложение.

Что уже подготовлено:

- фронтенд отправляет результат в `Google Sheets Web App`
- payload содержит `ФИО`, ответы `q1-q36`, raw-оценки и итоговые шкалы
- скрипт создает лист по имени участника
- если имя пустое, используется лист `Анонимно`

Как включить:

1. Открой [google-apps-script/Code.gs](./google-apps-script/Code.gs).
2. Вставь его в `Extensions -> Apps Script` у своей таблицы.
3. Опубликуй как `Web app`.
4. Вставь URL веб-приложения в [config.js](./config.js) в поле `googleSheetsWebAppUrl`.
