<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require __DIR__ . '/../includes/koneksi.php';

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(['username' => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nama'] = $user['nama'];
    $_SESSION['role'] = $user['role'];

       if (isset($_POST['remember'])) {
        $token = bin2hex(random_bytes(32));
        $upd = $pdo->prepare("UPDATE users SET remember_token = :t WHERE id = :id");
        $upd->execute(['t' => hash('sha256', $token), 'id' => $user['id']]);
        setcookie('remember_me', $user['id'] . ':' . $token, [
            'expires'  => time() + 60 * 60 * 24 * 30,
            'path'     => '/',
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
    }

    header('Location: ../index.php');
    exit;
}

$_SESSION['gagal_login'] = ($_SESSION['gagal_login'] ?? 0) + 1;

if ($_SESSION['gagal_login'] >= 3) {
    $pesan = 'Terlalu banyak percobaan gagal (' . $_SESSION['gagal_login'] . 'x). Periksa kembali username dan password.';
} else {
    $pesan = 'Username atau password salah.';
}

$_SESSION['flash'] = ['type' => 'error', 'pesan' => $pesan];
header('Location: login.php');
exit;