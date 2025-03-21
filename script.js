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
    let keepGoingMessage = document.getElementById(user + "Message");

    let streak = parseInt(streakSpan.textContent);
    streak++;

    streakSpan.textContent = streak;
    statusText.textContent = "🔥 Streak is going strong!";
    statusText.classList.remove("lost-streak");

    localStorage.setItem(user + 'Streak', streak);
    localStorage.setItem('lastUpdate' + capitalize(user), new Date().toISOString());

    showCelebration();
    updateMotivation();
    //updateKeepGoingMessage(user, streak);
}

function checkStreakExpiration(user) {
    let lastUpdate = localStorage.getItem('lastUpdate' + capitalize(user));
    if (!lastUpdate) return;

    let lastUpdateDate = new Date(lastUpdate);
    let currentDate = new Date();

    let timeDiff = Math.floor((currentDate - lastUpdateDate) / (1000 * 60 * 60 * 24)); // Difference in days

    if (timeDiff >= 1) {
        document.getElementById(user + "Streak").textContent = "0";
        document.getElementById(user + "Status").textContent = "🔥 Streak lost!";
        document.getElementById(user + "Status").classList.add("lost-streak");

        localStorage.setItem(user + 'Streak', 0);
    }
}

function updateClock() {
    let now = new Date();

    let istTime = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    let pstTime = now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    document.getElementById("bhagyaClock").textContent = `🇮🇳 IST: ${istTime}`;
    document.getElementById("pragnyaClock").textContent = `🇺🇸 PST: ${pstTime}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

function showCelebration() {
    let celebration = document.getElementById("celebration");
    celebration.innerHTML = "🎉🔥 Keep Going! 🔥🎉";
    celebration.style.display = "block";

    setTimeout(() => {
        celebration.style.display = "none";
    }, 2000);
}

function updateMotivation() {
    const messages = [
        "🔥 Keep the fire alive! One step closer to greatness! 🚀",
        "💪 Don't break the streak! Consistency is key! 🔥",
        "👏 Amazing! Keep pushing forward! Your progress matters!",
        "🎯 You're crushing it! Keep up the momentum!"
    ];
    
    document.getElementById("motivationText").textContent = messages[Math.floor(Math.random() * messages.length)];
}

function updateKeepGoingMessage(user, streak) {
    const messages = [
        "💥 You're on fire! Keep it up!",
        "🔥 No stopping now! Let's go!",
        "💪 You're unstoppable! Keep pushing!",
        "🚀 Streak growing strong! Keep going!"
    ];
    
    document.getElementById(user + "Message").textContent = messages[streak % messages.length];
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
