// Get the current hour
var currentHour = new Date().getHours();

// Find the appropriate greeting based on the current hour
var greeting;
if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning,";
} else if (currentHour >= 12 && currentHour < 16) {
    greeting = "Good Afternoon,";
} else if (currentHour >=16 && currentHour<21) {
    greeting = "Good Evening,";
} else{
    greeting = "Good Night,";
}

// Update the content of the h1 element
document.getElementById("greeting").innerText = greeting;

// Get the current hour
var currentHour = new Date().getHours();
var rightContainer = document.getElementById("rightContainer");

// Remove existing time-based classes
rightContainer.classList.remove("morning", "afternoon", "evening", "night");

// Add the appropriate class based on the current time
if (currentHour >= 5 && currentHour < 12) {
    rightContainer.classList.add("morning");
} else if (currentHour >= 12 && currentHour < 16) {
    rightContainer.classList.add("afternoon");
} else if (currentHour >= 16 && currentHour < 21) {
    rightContainer.classList.add("evening");
} else {
    rightContainer.classList.add("night");
}

document.getElementById('clickableText').addEventListener('click', function() {
    // Open a new page
    window.open('loginpage.html', '_blank');
});


