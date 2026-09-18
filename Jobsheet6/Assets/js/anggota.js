function muatDaftarAnggota() {
    return muatData("../data/anggota.json", ["no_anggota", "nama", "alamat", "no_hp"], 5);
}
document.addEventListener("DOMContentLoaded", muatDaftarAnggota);