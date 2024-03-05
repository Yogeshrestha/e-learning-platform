<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$Firstname = $_POST['Firstname'] ?? '';
$Lastname = $_POST['Lastname'] ?? '';

// Validate user inputs
if (empty($username) || empty($password)|| empty($Firstname)|| empty($Lastname)) {
    die("Invalid input");
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Database connection
$conn = new mysqli('localhost', 'root', '', 'login');

if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

// Prepare the query
$stmt = $conn->prepare("INSERT INTO registration (username, password, Firstname, Lastname) VALUES (?, ?, ?, ?)");

if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}

// Bind the parameters
if (!$stmt->bind_param("ssss", $username, $hashed_password, $Firstname, $Lastname)) {
    die("Binding parameters failed: " . $stmt->error);
}

// Execute the query
if (!$stmt->execute()) {
    die("Execute failed: " . $stmt->error);
}

echo "Registration successful...";

// Close the prepared statement and the connection
$stmt->close();
$conn->close();
?>