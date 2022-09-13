<?php

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

  $connect = true;

}

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Работа с базами данных</title>
	</head>
  <body>

  <?php

  if ($connect) {

    $query = "SELECT * FROM `client_applications`";
    $result = $mysqli->query($query);


  	if ($result) {

      ?>

      <table border="1">

        <?php
        foreach ($result as $row) {
        ?>

        <tr>
          <td><?php echo $row['id']; ?></td>
          <td><?php echo $row['firstName']; ?></td>
          <td><?php echo $row['lastName']; ?></td>
          <td><?php echo $row['date']; ?></td>
          <td><?php echo $row['fromPoint']; ?></td>
          <td><?php echo $row['toPoint']; ?></td>
          <td><?php echo $row['userEmail']; ?></td>
          <td><?php echo $row['userTel']; ?></td>
          <td><?php echo $row['comment']; ?></td>
        </tr>

        <?php
        }
        ?>

      </table>

      <?php

    } else {

      echo 'Ошибка запроса: ' . mysqli_error($mysqli) . '<br>';
      echo 'Код ошибки: ' . mysqli_errno($mysqli);
    }
  }

  ?>

  </body>
</html>
