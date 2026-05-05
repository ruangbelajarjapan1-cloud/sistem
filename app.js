// =========================================================
// NataSistem Landing Page
// File: app.js
// =========================================================

// Ganti nomor WhatsApp dengan nomor Anda.
// Indonesia: 628xxxxxxxxxx
// Jepang: 8180xxxxxxxx
const WHATSAPP_NUMBER = "6281234567890";

// Link demo produk
const DEMO_ERP_URL = "https://assunnahhekinan.org/app.html";
const DEMO_SIGNAGE_URL = "https://digitalhekinan.vercel.app/";

const mobileToggle = document.querySelector(".mobile-toggle");
const mobileMenu = document.querySelector("#mobileMenu");

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function openDemo(url, productName) {
  if (!url || url === "#") {
    openWhatsApp(`Halo, saya ingin minta akses demo ${productName}.`);
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

function closeMobileMenu() {
  if (!mobileMenu || !mobileToggle) return;
  mobileMenu.classList.remove("active");
  mobileToggle.setAttribute("aria-expanded", "false");
}

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("active");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = mobileMenu.contains(event.target);
    const clickedToggle = mobileToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });
}

// WhatsApp buttons
document.querySelectorAll(".js-wa").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    const message = element.dataset.message || "Halo, saya ingin konsultasi sistem digital.";
    openWhatsApp(message);
  });
});

// Demo buttons
document.querySelectorAll(".js-demo-erp").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    openDemo(DEMO_ERP_URL, "ERP Masjid");
  });
});

document.querySelectorAll(".js-demo-signage").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    openDemo(DEMO_SIGNAGE_URL, "Digital Signage");
  });
});

// Contact form
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.querySelector("#nama").value.trim();
    const organisasi = document.querySelector("#organisasi").value.trim();
    const kebutuhan = document.querySelector("#kebutuhan").value.trim();
    const nomor = document.querySelector("#nomor").value.trim();
    const pesan = document.querySelector("#pesan").value.trim();

    const text = [
      "Halo, saya ingin konsultasi sistem digital.",
      "",
      `Nama: ${nama}`,
      `Organisasi/Lembaga: ${organisasi || "-"}`,
      `Kebutuhan: ${kebutuhan}`,
      `Nomor WhatsApp saya: ${nomor || "-"}`,
      "",
      `Pesan: ${pesan}`
    ].join("\n");

    openWhatsApp(text);
  });
}
