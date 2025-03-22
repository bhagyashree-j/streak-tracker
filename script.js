let bhagyaStreak = parseInt(localStorage.getItem('bhagyaStreak')) || 0;
let pragnyaStreak = parseInt(localStorage.getItem('pragnyaStreak')) || 0;
let lastUpdateBhagya = localStorage.getItem('lastUpdateBhagya') || null;
let lastUpdatePragnya = localStorage.getItem('lastUpdatePragnya') || null;

document.getElementById("bhagyaStreak").textContent = bhagyaStreak;
document.getElementById("pragnyaStreak").textContent = pragnyaStreak;

// Milestone definitions
const milestones = {
    5: "🎖️ 5-Day Streak: You're on a roll!",
    10: "🏆 10-Day Streak: Legendary progress!",
    30: "🔥 30-Day Streak: Unstoppable!",
    50: "💎 50-Day Streak: Elite consistency!",
    100: "🚀 100-Day Streak: A true legend!"
};

// Run expiration check on page load
checkStreakExpiration('bhagya');
checkStreakExpiration('pragnya');
updateAchievements('bhagya');
updateAchievements('pragnya');

function updateProgress(user) {
    const userCapitalized = capitalize(user);
    const streakSpan = document.getElementById(user + "Streak");
    const statusText = document.getElementById(user + "Status");
    
    // Get the user's timezone
    const userTimezone = user === "bhagya" ? "Asia/Kolkata" : "America/Los_Angeles";
    const nowUTC = new Date().toISOString();
    const lastUpdateUTC = localStorage.getItem('lastUpdate' + userCapitalized);
    
    // Check if already updated today in user's local timezone
    if (lastUpdateUTC) {
        const lastUpdateLocal = new Date(lastUpdateUTC);
        const currentLocal = new Date();
        
        // Convert both to the user's timezone for day comparison
        const lastUpdateDay = new Date(lastUpdateLocal.toLocaleString("en-US", { timeZone: userTimezone }));
        const currentDay = new Date(currentLocal.toLocaleString("en-US", { timeZone: userTimezone }));
        
        // Reset to start of day for comparison
        lastUpdateDay.setHours(0, 0, 0, 0);
        currentDay.setHours(0, 0, 0, 0);
        
        if (currentDay.getTime() === lastUpdateDay.getTime()) {
            alert("You have already updated your streak today! ✅");
            return;
        }
    }
    
    // Increment streak
    let streak = parseInt(streakSpan.textContent) + 1;
    streakSpan.textContent = streak;
    statusText.textContent = "🔥 Streak is going strong!";
    statusText.classList.remove("lost-streak");
    
    // Save to localStorage
    localStorage.setItem(user + 'Streak', streak);
    localStorage.setItem('lastUpdate' + userCapitalized, nowUTC);
    
    // Update achievements
    updateAchievements(user);
    
    // Celebration
    startConfetti();
}

function checkStreakExpiration(user) {
    const userCapitalized = capitalize(user);
    const lastUpdateUTC = localStorage.getItem('lastUpdate' + userCapitalized);
    
    if (!lastUpdateUTC) return;
    
    const userTimezone = user === "bhagya" ? "Asia/Kolkata" : "America/Los_Angeles";
    const lastUpdateDate = new Date(lastUpdateUTC);
    const currentDate = new Date();
    
    // Convert to user's local timezone
    const lastUpdateLocal = new Date(lastUpdateDate.toLocaleString("en-US", { timeZone: userTimezone }));
    const currentLocal = new Date(currentDate.toLocaleString("en-US", { timeZone: userTimezone }));
    
    // Reset hours to compare just dates
    lastUpdateLocal.setHours(0, 0, 0, 0);
    currentLocal.setHours(0, 0, 0, 0);
    
    // Check if more than one day has passed
    const oneDayMs = 24 * 60 * 60 * 1000;
    if (currentLocal.getTime() - lastUpdateLocal.getTime() > oneDayMs) {
        document.getElementById(user + "Streak").textContent = "0";
        document.getElementById(user + "Status").textContent = "🔥 Streak lost! Start again today.";
        document.getElementById(user + "Status").classList.add("lost-streak");
        
        localStorage.setItem(user + 'Streak', 0);
        localStorage.setItem('lastUpdate' + userCapitalized, null);
        
        // Clear achievements
        document.getElementById(user + "Achievements").innerHTML = "";
    }
}

function updateAchievements(user) {
    const streak = parseInt(document.getElementById(user + "Streak").textContent);
    const achievementsDiv = document.getElementById(user + "Achievements");
    achievementsDiv.innerHTML = "";
    
    // Add any earned milestones
    Object.keys(milestones).forEach(milestone => {
        if (streak >= parseInt(milestone)) {
            const badge = document.createElement("div");
            badge.className = "achievement-badge";
            badge.textContent = milestones[milestone];
            achievementsDiv.appendChild(badge);
        }
    });
}

function resetStreak(user) {
    const userCapitalized = capitalize(user);
    
    localStorage.setItem(user + 'Streak', 0);
    localStorage.setItem('lastUpdate' + userCapitalized, null);
    
    document.getElementById(user + "Streak").textContent = "0";
    document.getElementById(user + "Status").textContent = "🔥 Streak reset. Start fresh!";
    document.getElementById(user + "Status").classList.add("lost-streak");
    
    // Clear achievements
    document.getElementById(user + "Achievements").innerHTML = "";
}

function updateClock() {
    const now = new Date();
    
    const istTime = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
    const pstTime = now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour12: true });
    
    document.getElementById("bhagyaClock").textContent = `🇮🇳 IST: ${istTime}`;
    document.getElementById("pragnyaClock").textContent = `🇺🇸 PST: ${pstTime}`;
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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock();