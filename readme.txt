  Для запуска приложения локально необходимо установить RabbitMQ, Erland, Node.js, VS Code
  если эти приложения у вас установлены можете продолжить с 6 пункта.

  1. Установка Erlang:
     - Перейдите на официальный сайт Erlang: https://www.erlang.org/downloads
     - Следуйте инструкциям для скачивания и установки Erlang в зависимости от вашей операционной системы.

  2. Установка RabbitMQ:
     - Перейдите на официальный сайт RabbitMQ: https://www.rabbitmq.com/download.html
     - Скачайте и установите RabbitMQ в соответствии с инструкциями для вашей операционной системы.

  3. Включение плагина управления RabbitMQ на операционной системе Windows:
     - Если ваша операционная система не является Windows, следуйте инструкциям для настройки на вашей конкретной платформе.
     - Если у вас RabbitMQ был установлен по умолчанию, откройте PowerShell с правами администратора.
     - Перейдите в директорию, где находится RabbitMQ или выполните команду в консоли:
       cd "C:\Program Files\RabbitMQ Server\rabbitmq_server-3.12.2\sbin"
     - Затем в консоли выполните команду для включения плагина управления:
       .\rabbitmq-plugins.bat enable rabbitmq_management
     - Затем нужно установить Erlang cookie hash, перейдите в директорию, где находится Erlang cd "C:\Program Files\RabbitMQ Server\rabbitmq_server-3.12.2\sbin"
       выполните команду .\rabbitmqctl.bat status
       и скопируйте Erlang cookie hash 
     - Затем выполните команду 
       cd ""C:\Users\<имя вашего пользователя>""
       notepad .erlang.cookie
     - Вставьте Erlang cookie hash и сохраните файл в директории "C:\Users\<имя вашего пользователя>"
     - Перезапустите RabbitMQ cd "C:\Program Files\RabbitMQ Server\rabbitmq_server-3.12.2\sbin"
       .\rabbitmqctl.bat stop или перезагрузите ПК
     - Перейдите по адресу в браузере http://localhost:15672/
     - Введите в поля Username/Password значение guest
     - Убедитесь, что подключение успешно установлено

  4. Установка Node.js:
     - Перейдите на официальный сайт Node.js: https://nodejs.org/
     - Скачайте и установите версию Node.js, подходящую для вашей операционной системы.

  5. Установка Visual Studio Code:
  Перейдите на официальный сайт Visual Studio Code: https://code.visualstudio.com/
  Скачайте и установите Visual Studio Code в соответствии с инструкциями для вашей операционной системы.

  6.После того как первые 5 пункта выполнено успешно открываем папку проекта 
  и в корне выполняем команду npm run project

  7. Отправляем POST запрос на адрес http://localhost:1000/email в body передаем {"email": "test@test.com"}

  В ответе мы должны получить status 200 "Запрос принят" 
  и в консоли VScode получить сообщение о результатt выполнения задания из RabbitMQ

  
Ссылка на документацию RabbitMQ GitHub https://github.com/rabbitmq/rabbitmq-tutorials/tree/main/javascript-nodejs