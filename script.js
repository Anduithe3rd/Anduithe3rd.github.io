const projects = [

    {
        title: "Networked Arcade Tennis",
        thumb: "assets/Arcade_Tennis_Thumbnail.png",     
        hover: "assets/Arcade_Tennis_Gameplay.gif",     
        content: `
            <img src="assets/Arcade_Tennis_Gameplay.gif" style="width:100%; border-radius:8px;">
            
            <p>Overview: A 2-player online arcade game built on a Client-Host architecture.
             Developed using Unity, FishNet Networking, and a custom application of edgegap relay.</p>
                            
            <img src="assets/Arcade_Tennis_Connection.png" style="width:100%; border-radius:8px;">
            
            <p>To resolve Client-Host connectivity challenges such as NAT traversal and firewalls,
             I created a custom connection manager. This system uses an asynchronous state machine
              to negotiate with the Edgegap API, allocating a relay server and handling the
               handshake process automatically to ensure reliable player connections</p>
                
            <img src="assets/Arcade_Tennis_Ball_Physics.gif" style="width:100%; border-radius:8px;">

            <p>To optimize network bandwidth, I replaced standard transform synchronization
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
            
            <p>Overview: A "WarioWare"-style infinite minigame game that could scale indefinitely
             without performance costs or messy code dependencies</p>

              <img src="assets/Minigame_Framework_Split.png" style="width:100%; border-radius:8px;">

            <p>For modularity purposes I didn't want the Game Manager to know the specific rules of every single minigame.
              Instead, I defined a strict IMinigame interface.
              The Manager simply initializes and starts a game, indifferent to the specific mechanics inside</p>

              <img src="assets/Minigame_Framework_Modular.gif" style="width:100%; border-radius:8px;">

            <p>To separate data from logic, I utilized ScriptableObjects. Adding a new minigame
             is as simple as creating a config asset (defining time limits, win conditions, and
              asset references) and dropping it into the game manager's list.</p>

             <img src="assets/Minigame_Framework_Stress_Test.gif" style="width:100%; border-radius:8px;">
            
            <p>Since the goal was an "infinite" loop, I couldn't load every asset at startup. I implemented
             a queue system using Unity Addressables. The system asynchronously streams the assets
              for the next few games in the queue while the player is busy playing the current one.
               Once a round is finished, those assets are immediately released.
               
               For visual representation I repurposed the game manager in a 3d project using hi res uncompressed
               textures on cubes. The graph represents the in game memory as the "mini games" are loaded and 
               unloaded via the queue system.
               </p>
        

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