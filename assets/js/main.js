/**
 * LaoAI Mobile Portal
 * Pure Lao Language, Light Theme Only, Mobile Optimized
 */

// Official URLs
const LAOAI_URLS = {
  web: "https://chat.laoai.la/",
  appstore: "https://apps.apple.com/us/app/laoai/id6749930140",
  playstore: "https://play.google.com/store/apps/details?id=com.caih.la.laoai&hl=en&pli=1"
};

// QR Metadata (Pure Lao)
const QR_METADATA = {
  web: {
    title: "ເວັບໄຊທ໌ LaoAI (Web)",
    sub: "chat.laoai.la",
    png: "assets/images/qr-web-branded.png",
    svg: "assets/images/qr-web.svg",
    url: LAOAI_URLS.web
  },
  appstore: {
    title: "Apple App Store (iOS)",
    sub: "ສຳລັບ iPhone & iPad",
    png: "assets/images/qr-appstore-branded.png",
    svg: "assets/images/qr-appstore.svg",
    url: LAOAI_URLS.appstore
  },
  playstore: {
    title: "Google Play Store (Android)",
    sub: "ສຳລັບ ມືຖື Android ທຸກລຸ້ນ",
    png: "assets/images/qr-playstore-branded.png",
    svg: "assets/images/qr-playstore.svg",
    url: LAOAI_URLS.playstore
  }
};

// Toast Feedback Helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;

  toastMsg.textContent = message || "ສຳເນົາລິ້ງສຳເລັດແລ້ວ!";
  toast.classList.add('show');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2300);
}

// Copy URL to Clipboard
function copyToClipboard(key) {
  const url = LAOAI_URLS[key];
  if (!url) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast("ສຳເນົາລິ້ງສຳເລັດແລ້ວ!");
    }).catch(() => {
      fallbackCopyText(url);
    });
  } else {
    fallbackCopyText(url);
  }
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast("ສຳເນົາລິ້ງສຳເລັດແລ້ວ!");
  } catch (err) {
    alert("Copy: " + text);
  }
  document.body.removeChild(textarea);
}

// QR Code Lightbox Modal
function openQrModal(key) {
  const meta = QR_METADATA[key];
  if (!meta) return;

  const modal = document.getElementById('qrModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalImg = document.getElementById('modalQrImg');
  const modalOpenBtn = document.getElementById('modalOpenUrlBtn');
  const modalDownloadPng = document.getElementById('modalDownloadPng');
  const modalDownloadSvg = document.getElementById('modalDownloadSvg');

  modalTitle.textContent = meta.title;
  modalSubtitle.textContent = meta.sub;
  modalImg.src = meta.png;
  modalImg.alt = meta.title;
  modalOpenBtn.href = meta.url;

  modalDownloadPng.onclick = () => downloadFile(meta.png, `LaoAI-QR-${key}.png`);
  modalDownloadSvg.onclick = () => downloadFile(meta.svg, `LaoAI-QR-${key}.svg`);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQrModal() {
  const modal = document.getElementById('qrModal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function downloadFile(filePath, fileName) {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("ກຳລັງດາວໂຫລດ QR Code...");
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Close modal when tapping outside content
  const modal = document.getElementById('qrModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeQrModal();
      }
    });
  }

  // Escape key for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQrModal();
    }
  });
});
