<?php

if (isset($_POST['submit'])) {

  $firstName = trim($_POST['user-first-name']);
  $firstName = htmlspecialchars($firstName);

  $lastName = trim($_POST['user-last-name']);
  $lastName = htmlspecialchars($lastName);

  $date = $_POST['user-datetime'];

  $from = $_POST['from-point'];

  $to = $_POST['to-point'];

  $email = trim($_POST['user-email']);
  $email = htmlspecialchars($email);

  $tel = $_POST['user-tel'];

  $comment = trim($_POST['comment-field']);
  $comment = htmlspecialchars($comment);

  if (empty($firstName)) {

    $errors[] = 'Отсутствует информация об имени пользователя!';

  } elseif (empty($lastName)) {

    $errors[] = 'Отсутствует информация о фамилии пользователя!';

  } elseif (empty($date)) {

    $errors[] = 'Отсутствует дата отправки!';

  } elseif (empty($from)) {

    $errors[] = 'Отсутствует информация о пункте отправки груза!';

  } elseif (empty($to)) {

    $errors[] = 'Отсутствует информация о пункте приема груза!';

  } elseif (empty($email)) {

    $errors[] = 'Отсутствует информация об электронной почте пользователя!';

  } elseif (empty($tel)) {

    $errors[] = 'Отсутствует информация о контактном телефоне пользователя!';

  }

  if (!empty($errors)) {
    foreach ($errors as $error) {
      echo "$error";
    }
  } else {

      $checkData = true;
  }
}

if ($checkData) {

  $host = 'h202515986.mysql';
  $user = 'h202515986_mysql';
  $password = '1eJg_tmN';
  $database = 'h202515986_db';

  $mysqli = new mysqli($host, $user, $password, $database);

  $mysqli->set_charset("utf8");

  if (!$mysqli) {

    echo 'Ошибка соединения: ' . mysqli_connect_error() . '<br>';
    echo 'Код ошибки: ' . mysqli_connect_errno();

  } else {

    $query = "INSERT INTO `client_applications`(`id`, `firstName`, `lastName`, `date`, `fromPoint`, `toPoint`, `userEmail`, `userTel`, `comment`) VALUES (NULL,'$firstName','$lastName','$date','$from','$to','$email','$tel','$comment')";
    $result = $mysqli->query($query);

  }

  if (!$result) {

    echo 'Ошибка запроса: ' . mysqli_error($mysqli) . '<br>';
    echo 'Код ошибки: ' . mysqli_errno($mysqli);

  } else {

    ?>

    <!DOCTYPE html>
    <html lang="ru" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>server</title>
      </head>
      <body>
        <table border="1">
          <thead>
            <tr>
              <th colspan="2">
                Ваша заявка оформлена. Пожалуйста, проверьте данные.
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Имя:</td>
              <td><?php echo $firstName ?></td>
            </tr>
            <tr>
              <td>Фамилия:</td>
              <td><?php echo $lastName ?></td>
            </tr>
            <tr>
              <td>Выбранная дата отправки:</td>
              <td><?php echo $date ?></td>
            </tr>
            <tr>
              <td>Пункт приёма груза:</td>
              <td><?php echo $from ?></td>
            </tr>
            <tr>
              <td>Конечный пункт доставки груза:</td>
              <td><?php echo $to ?></td>
            </tr>
            <tr>
              <td>Электронная почта:</td>
              <td><?php echo $email ?></td>
            </tr>
            <tr>
              <td>Телефон:</td>
              <td><?php echo $tel ?></td>
            </tr>
            <tr>
              <td>Комментарий:</td>
              <td><?php echo $comment ?></td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>

    <?php

  }
}

?>
