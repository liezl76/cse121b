<?php
$servername = "your_mysql_servername";
$username = "your_mysql_username";
$password = "your_mysql_password";
$dbname = "daily_time_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["action"])) {
        if ($_POST["action"] == "addTask") {
            $taskName = $_POST["taskName"];
            $taskDuration = $_POST["taskDuration"];

            $stmt = $conn->prepare("INSERT INTO tasks (task_name, task_duration) VALUES (?, ?)");
            $stmt->bind_param("si", $taskName, $taskDuration);
            $stmt->execute();
            $stmt->close();
        } elseif ($_POST["action"] == "updateSignatory") {
            $preparedBy = $_POST["preparedBy"];
            $confirmBy = $_POST["confirmBy"];

            $stmt = $conn->prepare("UPDATE tasks SET prepared_by = ?, confirm_by = ? WHERE id = ?");
            $stmt->bind_param("ssi", $preparedBy, $confirmBy, $_POST["taskId"]);
            $stmt->execute();
            $stmt->close();
        }
    }
}

$conn->close();
?>
