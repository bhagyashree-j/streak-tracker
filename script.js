let bhagyaStreak = parseInt(localStorage.getItem('bhagyaStreak')) || 0;
let pragnyaStreak = parseInt(localStorage.getItem('pragnyaStreak')) || 0;
let lastUpdateBhagya = localStorage.getItem('lastUpdateBhagya') || null;
let lastUpdatePragnya = localStorage.getItem('lastUpdatePragnya') || null;

document.getElementById("bhagyaStreak").textContent = bhagyaStreak;
document.getElementById("pragnyaStreak").textContent = pragnyaStreak;

checkStreakExpiration('bhagya');
checkStreakExpiration('pragnya');

function updateProgress(user) {
    let streakSpan = document.getElementById(user + "Streak");
    let statusText = document.getElementById(user + "Status");

    let streak = parseInt(streakSpan.textContent);
    streak++;

    streakSpan.textContent = streak;
    statusText.textContent = "🔥 Streak is going strong!";
    statusText.classList.remove("lost-streak");

    localStorage.setItem(user + 'Streak', streak);
    localStorage.setItem('lastUpdate' + capitalize(user), new Date().toISOString());

    startConfetti(); // 🎉 Trigger Confetti Effect
}

function checkStreakExpiration(user) {
    let lastUpdate = localStorage.getItem('lastUpdate' + capitalize(user));
    if (!lastUpdate) return;

    let lastUpdateDate = new Date(lastUpdate);
    let currentDate = new Date();

    let timeDiff = Math.floor((currentDate - lastUpdateDate) / (1000 * 60 * 60 * 24));

    if (timeDiff >= 1) {
        document.getElementById(user + "Streak").textContent = "0";
        document.getElementById(user + "Status").textContent = "🔥 Streak lost!";
        document.getElementById(user + "Status").classList.add("lost-streak");

        localStorage.setItem(user + 'Streak', 0);
    }
}

function updateClock() {
    let now = new Date();

    let istTime = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
    let pstTime = now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour12: true });

    document.getElementById("bhagyaClock").textContent = `🇮🇳 IST: ${istTime}`;
    document.getElementById("pragnyaClock").textContent = `🇺🇸 PST: ${pstTime}`;
}

setInterval(updateClock, 1000);
updateClock();

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
