let bhagyaStreak = parseInt(localStorage.getItem('bhagyaStreak')) || 0;
let pragnyaStreak = parseInt(localStorage.getItem('pragnyaStreak')) || 0;
let lastUpdateBhagya = localStorage.getItem('lastUpdateBhagya') || null;
let lastUpdatePragnya = localStorage.getItem('lastUpdatePragnya') || null;

document.getElementById("bhagyaStreak").textContent = bhagyaStreak;
document.getElementById("pragnyaStreak").textContent = pragnyaStreak;

checkStreakExpiration('bhagya');
checkStreakExpiration('pragnya');

function updateProgress(user) {
    let lastUpdate = localStorage.getItem('lastUpdate' + capitalize(user));
    let today = new Date().toDateString();

    if (lastUpdate && new Date(lastUpdate).toDateString() === today) {
        alert("You've already updated your streak today! Come back tomorrow.");
        return;
    }

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

    let lastRecordedDate = lastUpdateDate.toDateString();
    let today = currentDate.toDateString();

    if (lastRecordedDate !== today) {
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
function resetStreak(user) {
    localStorage.setItem(user + 'Streak', 0);
    localStorage.setItem('lastUpdate' + capitalize(user), null);

    document.getElementById(user + "Streak").textContent = "0";
    document.getElementById(user + "Status").textContent = "🔥 Streak lost!";
    document.getElementById(user + "Status").classList.add("lost-streak");
}


function startConfetti() {
    confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7}
    });
}


setInterval(updateClock, 1000);
updateClock();


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const problemData = {
    "array": ["Contains Duplicate", "Valid Anagram", "Two Sum", "Group Anagram, Top K Frequent ELements, Encode and Decode Strings, Product of Array Except Self, Longest Consecutive Squence "],
    "twoPointers": ["Valid Palindrome", "3Sum", "Container With Most Water"],
    "slidingWindow": ["Best Time to Buy and Sell Stock","Longest Substring Without Repeating", "Longest Repeating Character Replacement", "Minimum Window Substring"],
    "stack" : ["Valid Parentheses"],
    "binary" : ["Find Minimum In Rotated Sorted Array","Search In Rotated Sorted Array"],
    "linkedList" : [""]
};

const completedProblems = JSON.parse(localStorage.getItem("completedProblems")) || {};

function renderProblems() {
    Object.keys(problemData).forEach(category => {
        const problemList = document.getElementById(`${category}Problems`);
        problemList.innerHTML = "";
        
        problemData[category].forEach(problem => {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = completedProblems[problem] || false;
            checkbox.addEventListener("change", () => {
                completedProblems[problem] = checkbox.checked;
                localStorage.setItem("completedProblems", JSON.stringify(completedProblems));
            });

            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(problem));
            problemList.appendChild(li);
        });
    });
}

// Collapsible Functionality
document.querySelectorAll(".collapsible").forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        content.style.display = (content.style.display === "block") ? "none" : "block";
    });
});

renderProblems();


renderProblems();
