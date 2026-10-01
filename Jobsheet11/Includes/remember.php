<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id']) && !empty($_COOKIE['remember_me'])) {
    $rmParts = explode(':', $_COOKIE['remember_me'], 2);
    if (count($rmParts) === 2) {
        require __DIR__ . '/koneksi.php';
        $rmStmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
        $rmStmt->execute(['id' => (int) $rmParts[0]]);
        $rmUser = $rmStmt->fetch(PDO::FETCH_ASSOC);

        if ($rmUser && $rmUser['remember_token']
            && hash_equals($rmUser['remember_token'], hash('sha256', $rmParts[1]))) {
            $_SESSION['user_id'] = $rmUser['id'];
            $_SESSION['nama'] = $rmUser['nama'];
            $_SESSION['role'] = $rmUser['role'];
        }
    }
}