// Config
const PASSWORD = "glennoanya254";
const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029Vb6XAv0GOj9lYT2p3l1X";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("passwordOverlay");
  const pwInput = document.getElementById("passwordInput");
  const pwBtn = document.getElementById("passwordBtn");
  const pwMessage = document.getElementById("pwMessage");
  const mainCard = document.getElementById("mainCard");
  const sendBtn = document.getElementById("sendBtn");
  const phoneInput = document.getElementById("phoneInput");
  const statusArea = document.getElementById("statusArea");
  const channelBtn = document.getElementById("channelBtn");

  // Password gate
  pwBtn.addEventListener("click", tryPassword);
  pwInput.addEventListener("keydown", (e) => { if (e.key === "Enter") tryPassword(); });

  function tryPassword() {
    if (pwInput.value === PASSWORD) {
      overlay.style.display = "none";
      mainCard.setAttribute("aria-hidden", "false");
      pwMessage.textContent = "Access granted.";
    } else {
      pwMessage.textContent = "Wrong password. Try again.";
      pwInput.value = "";
      pwInput.focus();
    }
  }

  // Send button behavior
  sendBtn.addEventListener("click", () => {
    const phone = phoneInput.value.trim();
    if (!phone) {
      alert("Please enter your number (include +countrycode).");
      phoneInput.focus();
      return;
    }

    // Clear previous status
    statusArea.innerHTML = "";
    startLoader(phone);
  });

  // Channel button: opens the channel link in new tab
  channelBtn.addEventListener("click", () => {
    window.open(WHATSAPP_CHANNEL, "_blank");
  });

  // Start and animate loader for 60 seconds
  function startLoader(phone) {
    // create loader UI
    const loaderWrap = document.createElement("div");
    loaderWrap.className = "loaderWrap";

    const canvas = document.createElement("div");
    canvas.className = "canvas";
    canvas.innerHTML = `
      <svg width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#07380a" stroke-width="10" fill="none"></circle>
        <circle id="progressCircle" cx="50" cy="50" r="40" stroke="#00ff3c" stroke-width="10" fill="none"
          stroke-dasharray="251.2" stroke-dashoffset="251.2" stroke-linecap="round"></circle>
      </svg>
      <div class="percentText"><span id="percentLabel">0%</span></div>
    `;

    const info = document.createElement("div");
    info.innerHTML = `<div style="font-size:13px">Processing request...</div>`;

    loaderWrap.appendChild(canvas);
    loaderWrap.appendChild(info);
    statusArea.appendChild(loaderWrap);

    // timer parameters
    const totalMs = 60_000; // 60 seconds
    const start = performance.now();
    const circle = document.getElementById("progressCircle");
    const percentLabel = document.getElementById("percentLabel");
    const circumference = 2 * Math.PI * 40; // r=40 => ~251.2
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    // animation loop
    function tick(now) {
      const elapsed = Math.min(now - start, totalMs);
      const pct = Math.round((elapsed / totalMs) * 100);
      percentLabel.textContent = `${pct}%`;
      const offset = circumference - (pct / 100) * circumference;
      circle.style.strokeDashoffset = offset;

      if (elapsed < totalMs) {
        requestAnimationFrame(tick);
      } else {
        // finished
        showSuccess(phone);
      }
    }
    requestAnimationFrame(tick);
  }

  function showSuccess(phone) {
    statusArea.innerHTML = "";
    const success = document.createElement("div");
    success.className = "success";
    success.innerHTML = `
      <strong>Success!</strong>
      <div>Your WhatsApp number <em>${escapeHtml(phone)}</em> has been unbanned successfully. Kindly log in into your restored account.</div>
    `;
    statusArea.appendChild(success);

    // Make channel button visible (if it was hidden)
    // Already present; we can highlight it
    channelBtn.style.outline = "2px solid rgba(0,255,60,0.12)";
  }

  // simple helper to avoid inserted HTML problems
  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, (m) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  }
});
