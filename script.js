const projects = [

    {
        title: "Networked Arcade Tennis",
        thumb: "assets/Arcade_Tennis_Thumbnail.png",     
        hover: "assets/Arcade_Tennis_Gameplay.gif",     
        content: `
            <img src="assets/Arcade_Tennis_Gameplay.gif" style="width:100%; border-radius:8px;">
            
            <p>Overview: A 2-player online arcade game built on a Client-Host architecture. Developed using Unity,FishNet Networking, and custom application of edgegap relay.</p>
                            
            //diagram showing how information is sent and recieved
            
            <p>- To resolve Client-Host connectivity challenges such as NAT traversal and firewalls,
             I created a custom connection manager. This system uses an asynchronous state machine
              to negotiate with the Edgegap API, allocating a relay server and handling the
               handshake process automatically to ensure reliable player connections</p>
                
            <img src="assets/Arcade_Tennis_Ball_Physics.gif" style="width:100%; border-radius:8px;">

            <p>- To optimize network bandwidth, I replaced standard transform synchronization
             with a deterministic parametric model. Instead of replicating the ball's position
              every tick, the server transmits trajectory parameters (velocity, origin, timestamp)
               only upon impact. Clients use this data to locally simulate the exact same parabolic arc,
                ensuring zero desynchronization with minimal data transfer.</p>

            `
    },

    {
        title: "Modular Minigame Framework",
        thumb: "assets/Minigame_Framework_Thumbnail.png",     
        hover: "assets/Minigame_Framework_Gameplay.gif",     
        content: `
            <img src="assets/Minigame_Framework_Gameplay.gif" style="width:100%; border-radius:8px;">
            
            <p>Overview: A scalable, data-driven architecture for managing asynchronous asset streaming and decoupled game logic in Unity.</p>

            //show interface alongside snippet of game manager

            <p>I used the Strategy Pattern to decouple the core game loop from the individual minigames. 
            By defining a strict IMinigame interface, the GameManager can initialize and run any game logic
             without needing to know its specific implementation details. This makes the codebase modular and
              easy to expand.</p>

              //short gif of me adding a new game to the game manager

            <p>To improve the development workflow, I separated game data from logic using ScriptableObjects.
             New minigames are added by creating a configuration asset and registering it with the Manager.
              This allows for quick balancing and iteration without needing to modify the code itself.</p>

             <img src="assets/Minigame_Framework_Stress_Test.gif" style="width:100%; border-radius:8px;">
            
            <p>I implemented an asynchronous resource pipeline using Unity Addressables to handle
             asset streaming. Instead of loading everything at start, the system loads minigame
              assets into a queue on-demand and releases them immediately upon completion.
              The video shows a technical stress test using uncompressed high-res textures applied to 3d objects.
               It demonstrates the system successfully performing a complete memory release
                cycle between rounds, returning to a near-zero memory footprint even after handling
                 heavy data loads</p>
        

            `
    },

    {
        title: "Modular Character Controller",
        thumb: "assets/3D_Platformer_Thumbnail.png",     // thumbnail image here 
        hover: "assets/3D_Platformer_hover.gif",     // GIF here 
        content: `
            <!--  Replace with actual GIF or image -->
            <img src="assets/placeholder_project.gif" style="width:100%; border-radius:8px;">

            //update last
            <p>A 3D character controller architected to replicate the complex,
             momentum-based movement mechanics of games like super mario 64 and super mario odyssey
             </p>


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