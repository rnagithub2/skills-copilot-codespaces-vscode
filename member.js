function skillsMember() {
    var skills = document.getElementById("skills");
    var skillsMember = document.getElementById("skillsMember");

    if (skills.style.display === "none") {
        skills.style.display = "block";
        skillsMember.style.display = "none";
    } else {
        skills.style.display = "none";
        skillsMember.style.display = "block";
    }
}
