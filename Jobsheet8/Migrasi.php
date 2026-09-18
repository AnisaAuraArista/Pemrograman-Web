<?php
require __DIR__ . '/includes/koneksi.php';

$jsonPath = __DIR__ . '/../Jobsheet6/data/buku.json'; // sesuaikan path
$dataBuku = json_decode(file_get_contents($jsonPath), true);

$stmt = $pdo->prepare(
    "INSERT INTO buku (judul, pengarang, tahun, stok)
     VALUES (:judul, :pengarang, :tahun, :stok)"
);

foreach ($dataBuku as $buku) {
    $stmt->execute([
        'judul' => $buku['judul'],
        'pengarang' => $buku['pengarang'],
        'tahun' => $buku['tahun'],
        'stok' => $buku['stok'],
    ]);
}

echo "Migrasi selesai, " . count($dataBuku) . " buku dipindahkan.";