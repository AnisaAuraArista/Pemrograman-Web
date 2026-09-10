// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

// ===== Konfirmasi hapus (front-end only, belum ke server) =====
function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row ? row.querySelector("td")?.textContent : "data ini";
            const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
            if (yakin && row) {
                row.remove();
                updateFilterCounter();
            }
        });
    });
}

// ===== Filter/pencarian tabel real-time =====
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const kolomJudul = row.querySelector("td");
            const teks = kolomJudul ? kolomJudul.textContent.toLowerCase() : "";
            row.style.display = teks.includes(keyword) ? "" : "none";
        });

        updateFilterCounter();
    });
}

function updateFilterCounter() {
    const counter = document.getElementById("filter-counter");
    const table = document.querySelector(".table-responsive table");
    if (!counter || !table) return;

    const semuaBaris = table.querySelectorAll("tbody tr");
    const barisTampil = table.querySelectorAll("tbody tr:not([style*='display: none'])");
    counter.textContent = "Menampilkan " + barisTampil.length + " dari " + semuaBaris.length + " buku";
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        const fieldWajibIsi = [
            { nama: "judul", pesan: "Judul wajib diisi." },
            { nama: "pengarang", pesan: "Pengarang wajib diisi." }
        ];

        fieldWajibIsi.forEach(function (item) {
            const input = form.querySelector("[name='" + item.nama + "']");
            if (input) {
                if (input.value.trim() === "") {
                    tampilkanError(input, item.pesan);
                    valid = false;
                } else {
                    hapusError(input);
                }
            }
        });

        const tahun = form.querySelector("[name='tahun']");
        if (tahun) {
            const nilai = parseInt(tahun.value, 10);
            if (isNaN(nilai) || nilai < 1900 || nilai > 2026) {
                tampilkanError(tahun, "Tahun harus di antara 1900-2026.");
                valid = false;
            } else {
                hapusError(tahun);
            }
        }

        const stok = form.querySelector("[name='stok']");
        if (stok) {
            const nilai = parseInt(stok.value, 10);
            if (isNaN(nilai) || nilai < 0) {
                tampilkanError(stok, "Stok tidak boleh negatif.");
                valid = false;
            } else {
                hapusError(stok);
            }
        }

        const isbn = form.querySelector("[name='isbn']");
        if (isbn && isbn.value.trim() !== "") {
            const polaIsbn = /^[0-9-]+$/;
            if (!polaIsbn.test(isbn.value.trim())) {
                tampilkanError(isbn, "ISBN hanya boleh berisi angka dan tanda hubung.");
                valid = false;
            } else {
                hapusError(isbn);
            }
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
    updateFilterCounter();
});