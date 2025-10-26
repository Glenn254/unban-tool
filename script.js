// Password Protection
const correctPassword = "papanast2545";
const passwordScreen = document.getElementById("password-screen");
const mainContent = document.getElementById("main-content");
const passwordBtn = document.getElementById("password-btn");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");

passwordBtn.addEventListener("click", () => {
  if (passwordInput.value === correctPassword) {
    passwordScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
  } else {
    passwordError.textContent = "Incorrect password. Try again.";
  }
});

// Unban Simulation
const unbanBtn = document.getElementById("unban-btn");
const phoneInput = document.getElementById("phone-number");
const loadingDiv = document.getElementById("loading");
const progressBar = document.getElementById("progress");
const resultText = document.getElementById("result");

unbanBtn.addEventListener("click", () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    alert("Please enter your number first.");
    return;
  }

  unbanBtn.disabled = true;
  loadingDiv.classList.remove("hidden");
  progressBar.style.width = "0%";
  resultText.textContent = "";

  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    progressBar.style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(interval);
      loadingDiv.classList.add("hidden");
      resultText.innerHTML = `✅ Your WhatsApp number <b>${phone}</b> has been unbanned successfully.<br>Kindly log in into your restored account.`;
      unbanBtn.disabled = false;
    }
  }, 600); // ~1 minute loading
});
