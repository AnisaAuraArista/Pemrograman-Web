<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION['user_id'])) {
    require __DIR__ . '/../includes/koneksi.php';
    $pdo->prepare("UPDATE users SET remember_token = NULL WHERE id = :id")
        ->execute(['id' => $_SESSION['user_id']]);
}
setcookie('remember_me', '', ['expires' => time() - 3600, 'path' => '/']);
session_destroy();
header('Location: login.php');
exit;