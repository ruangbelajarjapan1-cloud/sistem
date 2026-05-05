// =========================================================
// K-Sistem Landing Page
// File: app.js
// =========================================================

// Ganti nomor WhatsApp dengan nomor Anda.
// Indonesia: 628xxxxxxxxxx
// Jepang: 8180xxxxxxxx
const WHATSAPP_NUMBER = "6281234567890"; //[cite: 1]

// Link demo produk
const DEMO_ERP_URL = "https://assunnahhekinan.org/app.html"; //[cite: 1]
const DEMO_SIGNAGE_URL = "https://digitalhekinan.vercel.app/"; //[cite: 1]

const mobileToggle = document.querySelector(".mobile-toggle"); //[cite: 1]
const mobileMenu = document.querySelector("#mobileMenu"); //[cite: 1]

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message); //[cite: 1]
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`; //[cite: 1]
  window.open(url, "_blank", "noopener,noreferrer"); //[cite: 1]
}

function openDemo(url, productName) {
  if (!url || url === "#") {
    openWhatsApp(`Halo, saya ingin minta akses demo ${productName}.`); //[cite: 1]
    return; //[cite: 1]
  }

  window.open(url, "_blank", "noopener,noreferrer"); //[cite: 1]
}

function closeMobileMenu() {
  if (!mobileMenu || !mobileToggle) return; //[cite: 1]
  mobileMenu.classList.remove("active"); //[cite: 1]
  mobileToggle.setAttribute("aria-expanded", "false"); //[cite: 1]
}

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("active"); //[cite: 1]
    mobileToggle.setAttribute("aria-expanded", String(isOpen)); //[cite: 1]
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu); //[cite: 1]
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = mobileMenu.contains(event.target); //[cite: 1]
    const clickedToggle = mobileToggle.contains(event.target); //[cite: 1]

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu(); //[cite: 1]
    }
  });
}

// WhatsApp buttons
document.querySelectorAll(".js-wa").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault(); //[cite: 1]
    const message = element.dataset.message || "Halo, saya ingin konsultasi sistem digital."; //[cite: 1]
    openWhatsApp(message); //[cite: 1]
  });
});

// Demo buttons
document.querySelectorAll(".js-demo-erp").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault(); //[cite: 1]
    openDemo(DEMO_ERP_URL, "ERP Masjid"); //[cite: 1]
  });
});

document.querySelectorAll(".js-demo-signage").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault(); //[cite: 1]
    openDemo(DEMO_SIGNAGE_URL, "Digital Signage"); //[cite: 1]
  });
});

// Contact form
const contactForm = document.querySelector("#contactForm"); //[cite: 1]

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); //[cite: 1]

    const nama = document.querySelector("#nama").value.trim(); //[cite: 1]
    const organisasi = document.querySelector("#organisasi").value.trim(); //[cite: 1]
    const kebutuhan = document.querySelector("#kebutuhan").value.trim(); //[cite: 1]
    const nomor = document.querySelector("#nomor").value.trim(); //[cite: 1]
    const pesan = document.querySelector("#pesan").value.trim(); //[cite: 1]

    const text = [
      "Halo, saya ingin konsultasi sistem digital.", //[cite: 1]
      "",
      `Nama: ${nama}`, //[cite: 1]
      `Organisasi/Lembaga: ${organisasi || "-"}`, //[cite: 1]
      `Kebutuhan: ${kebutuhan}`, //[cite: 1]
      `Nomor WhatsApp saya: ${nomor || "-"}`, //[cite: 1]
      "",
      `Pesan: ${pesan}` //[cite: 1]
    ].join("\n"); //[cite: 1]

    openWhatsApp(text); //[cite: 1]
  });
}
