### Demo

## Чтобы запустить `demo` проект

Установите сначало `json-server`
```npm install -g json-server```
Затем создайте файл `db.json` со следующим содержанием:
```{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```
Запустите сервер вводя в терменале эту команду:
```json-server --watch db.json --port 3004```

Теперь вы можете перейти на [demo](https://istamal.github.io/contacts-demo/).

### Develop

## Чтобы запустить приложение локально

Скопируйте эту ссылку https://github.com/istamal/Contacts.git
Откройте терминал и вводите `git clone` далее скопированая ссылка
Перейдите в папку `Contacts` и введите команду `npm install` начнется загрузка зависсиммостей
После загрузки запустите проект набрав `npm start`
