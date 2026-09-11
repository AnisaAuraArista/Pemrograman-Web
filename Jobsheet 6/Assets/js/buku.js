function muatDaftarBuku() {
    return muatData("../data/buku.json", ["judul", "pengarang", "tahun", "stok", "kategori"], 5);
}

document.addEventListener("DOMContentLoaded", function () {
    muatDaftarBuku();

    const btnMuatUlang = document.getElementById("btn-muat-ulang");
    if (btnMuatUlang) {
        btnMuatUlang.addEventListener("click", muatDaftarBuku);
    }
});