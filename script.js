const projects = [
    {
        title: "Project 1 - 3D Platformer",
        thumb: "assets/placeholder_project.png",     // thumbnail image here 
        hover: "assets/placeholder_project.gif",     // GIF here 
        content: `
            <!--  Replace with actual GIF or image -->
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">
            <p>A 3D platformer with a </p>
        `
    },

    {
        title: "Project 2 - Networked Arcade Tennis",
        thumb: "assets/placeholder_project.png",     
        hover: "assets/placeholder_project.gif",     
        content: `
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">
            <p>Overview: A 2 player online game built on a Client-Host architecture, using Unity, Fishnet Networking, and Edgegap Relay API</p>
                //diagram showing how information is sent and recieved
            <p>- To take advantage of the host-client architecture but avoid all the issues that come with it, firewalls and router NATs, I implemented an asynchronous state machine that negotiates with an external API (edgegap) to find a relay server</p>
                //diagram showing the information sent over packets as well as psuedocode of ball
            <p>- To avoid the heavy weight of things like constantly updating the ball's position every tick, the game synchronizes the parameters of the arc upon being hit. The client using this information can then simulate the trajectory locally.</p>

            `
    },

    {
        title: "Project 3 - Modular Minigame Framework",
        thumb: "assets/placeholder_project.png",     
        hover: "assets/placeholder_project.gif",     
        content: `
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">
            <p>A modular micro-game engine that features Asynchronous Asset Streaming, interface-based polymorphism, and a data-driven configuration pipeline</p>

            <p>To prevent tight coupling between core game loop and individual minigames, i utilized the Strategy Patter. I defined a interface (IMinigame) that enforces intilization and execution logic. This way the GameManager can operate purely on abstraction.</p>

            <p>Following this pattern I also designed the framework to be designer-first. By abstracting the game perameters into ScriptableObjects, I created a plug and play workflow. New minigames can quickly be integrated into the live build by simply creating a configuration asset and registering it with the main game manager. This allows for raapid iteration and balancing.</p>
            
            <p>Built with scalability in mind I created a custom resource pipeline using Unity Addressables. Standard instantiation can bloat runtime memory, my system utilizes an asyncronous state machine to stream assets on-demand. The video demonstrates a stress test using 3D objects with heavy textures, it is built using the same bones as the minigame framework and was used to demonstrate the memory changes.</p>
        

            `
    },
 
    
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