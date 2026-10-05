<?php
$host = "localhost";
$port = "5433";
$db   = "simpus_mini";
$user = "postgres";
$pass = "27022007";

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    error_log($e->getMessage());
    die("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
}