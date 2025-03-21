let bhagyaStreak = parseInt(localStorage.getItem('bhagyaStreak')) || 0;
let pragnyaStreak = parseInt(localStorage.getItem('pragnyaStreak')) || 0;
let lastUpdateBhagya = localStorage.getItem('lastUpdateBhagya') || null;
let lastUpdatePragnya = localStorage.getItem('lastUpdatePragnya') || null;

document.getElementById("bhagyaStreak").textContent = bhagyaStreak;
document.getElementById("pragnyaStreak").textContent = pragnyaStreak;

// Run expiration check on page load
checkStreakExpiration('bhagya');
checkStreakExpiration('pragnya');

const milestones = {
    5: "🎖️ 5-Day Streak: You're on a roll!",
    10: "🏆 10-Day Streak: Legendary progress!",
    30: "🔥 30-Day Streak: Unstoppable!",
    50: "💎 50-Day Streak: Elite consistency!",
    100: "🚀 100-Day Streak: A true legend!"
};

function updateProgress(user) {
    let streakSpan = document.getElementById(user + "Streak");
    let statusText = document.getElementById(user + "Status");

    let streak = parseInt(streakSpan.textContent);

    let userTimezone = user === "bhagya" ? "Asia/Kolkata" : "America/Los_Angeles";
    let nowUTC = new Date().toISOString(); 
    let lastUpdateUTC = localStorage.getItem('lastUpdate' + capitalize(user));

    if (lastUpdateUTC) {
        let lastUpdateLocal = new Date(new Date(lastUpdateUTC).toLocaleString("en-US", { timeZone: userTimezone }));
        let currentLocal = new Date(new Date().toLocaleString("en-US", { timeZone: userTimezone }));

        lastUpdateLocal.setHours(0, 0, 0, 0);
        currentLocal.setHours(0, 0, 0, 0);

        if (currentLocal.getTime() === lastUpdateLocal.getTime()) {
            alert("You have already updated your streak today! ✅");
            return;
        }
    }

    streak++;
    streakSpan.textContent = streak;
    statusText.textContent = "🔥 Streak is going strong!";
    statusText.classList.remove("lost-streak");

    localStorage.setItem(user + 'Streak', streak);
    localStorage.setItem('lastUpdate' + capitalize(user), nowUTC);

    startConfetti(); // 🎉 Trigger Confetti Effect
}

function checkStreakExpiration(user) {
    let lastUpdateUTC = localStorage.getItem('lastUpdate' + capitalize(user));
    if (!lastUpdateUTC) return;

    let userTimezone = user === "bhagya" ? "Asia/Kolkata" : "America/Los_Angeles";

    let lastUpdateLocal = new Date(new Date(lastUpdateUTC).toLocaleString("en-US", { timeZone: userTimezone }));
    let currentLocal = new Date(new Date().toLocaleString("en-US", { timeZone: userTimezone }));

    lastUpdateLocal.setHours(0, 0, 0, 0);
    currentLocal.setHours(0, 0, 0, 0);

    if (currentLocal > lastUpdateLocal) {
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

function startConfetti() {
    var duration = 3 * 1000; // 3 seconds
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
