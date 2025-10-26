// Frontend-only simulation (no real WhatsApp API calls)
const WHATSAPP_CHANNEL_LINK = "https://whatsapp.com/channel/0029Vb6XAv0GOj9lYT2p3l1X";

const sendBtn = document.getElementById('sendBtn');
const phoneInput = document.getElementById('phoneInput');
const unbanType = document.getElementById('unbanType');
const promptSelect = document.getElementById('promptSelect');

const loaderArea = document.getElementById('loaderArea');
const resultArea = document.getElementById('resultArea');
const percentLabel = document.getElementById('percentLabel');
const resultText = document.getElementById('resultText');
const channelLink = document.getElementById('channelLink');

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  percentLabel.textContent = `${Math.round(percent)}%`;
}

function sanitizeNumber(v) {
  return v.trim() || "(no number entered)";
}

function disableForm(state) {
  sendBtn.disabled = state;
  phoneInput.disabled = state;
  unbanType.disabled = state;
  promptSelect.disabled = state;
}

sendBtn.addEventListener('click', () => {
  const phone = sanitizeNumber(phoneInput.value);
  disableForm(true);
  resultArea.classList.add('hidden');
  loaderArea.classList.remove('hidden');
  let start = Date.now();
  const duration = 60000; // 1 minute
  setProgress(0);

  const interval = setInterval(() => {
    const elapsed = Date.now() - start;
    const pct = Math.min(100, (elapsed / duration) * 100);
    setProgress(pct);

    if (pct >= 100) {
      clearInterval(interval);
      loaderArea.classList.add('hidden');
      const typeText = unbanType.options[unbanType.selectedIndex].text;
      const promptText = promptSelect.options[promptSelect.selectedIndex].text;

      resultText.innerHTML = `
        Your WhatsApp number <strong>${phone}</strong> has been <strong>unbanned successfully</strong>.<br>
        Kindly log in to your restored account.<br>
        <small style="opacity:0.8">(${typeText} — ${promptText})</small>
      `;

      channelLink.href = WHATSAPP_CHANNEL_LINK;
      resultArea.classList.remove('hidden');
      disableForm(false);
      setTimeout(() => setProgress(0), 500);
    }
  }, 100);
});
