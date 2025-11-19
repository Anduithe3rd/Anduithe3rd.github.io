const projects = [
    {
        title: "Project 1 - 3D Platformer",
        thumb: "assets/placeholder_project.png",     // thumbnail image here 
        hover: "assets/placeholder_project.gif",     // GIF here 
        content: `
            <!--  Replace with actual GIF or image -->
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">
            <p>Project description </p>
        `
    },

    {
        title: "Project 2 - Online 1v1 Tennis game",
        thumb: "assets/placeholder_project.png",     
        hover: "assets/placeholder_project.gif",     
        content: `
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">
            <p>Description for placeholder project #2. Add more text here later.</p>
        `
    },

    {
        title: "Project 3 - Wario Ware Inspired Minigame game",
        thumb: "assets/placeholder_project.png",     
        hover: "assets/placeholder_project.gif",     
        content: `
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">
            <p>Description for placeholder project #3. Add more text here later.</p>
        `
    },

    {
        title: "Project 4 - 2D sidescroller",
        thumb: "assets/placeholder_project.png",     
        hover: "assets/placeholder_project.gif",     
        content: `
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">
            <p>Description for placeholder project #4. Add more text here later.</p>
        `
    }
];

const grid = document.getElementById("projectGrid");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalBody");
const closeBtn = document.getElementById("closeBtn");

// Build project boxes
projects.forEach((p, index) => {
    let div = document.createElement("div");
    div.className = "project";

    div.innerHTML = `
        <!-- Placeholder images -->
        <img src="${p.thumb}" class="main-img">
        <img src="${p.hover}" class="hover-img">
    `;

    div.onclick = () => openProject(index);
    grid.appendChild(div);
});

// Modal logic
function openProject(i) {
    modalContent.innerHTML = `
        <h2>${projects[i].title}</h2>
        ${projects[i].content}
    `;
    modal.style.display = "flex";
    document.body.classList.add("modal-open");

    document.getElementById("closeBtn").onclick = closeModal;
}

function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
}

closeBtn.onclick = closeModal;

// Close if clicking outside the content box
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}