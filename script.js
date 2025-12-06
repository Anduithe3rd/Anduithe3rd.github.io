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
              to speak with the Edgegap API, allocating a relay server and handling the
               handshake process automatically to ensure reliable player connections</p>
                
            <img src="assets/Arcade_Tennis_Ball_Physics.gif" style="width:100%; border-radius:8px;">

            <p>For the sake of network bandwith, instead of replicating the ball's position
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
            
            <p>Overview: A "WarioWare"-style infinite minigame game built to scale indefinitely
             without performance costs or messy code dependencies</p>

              <img src="assets/Minigame_Framework_Split.png" style="width:100%; border-radius:8px;">

            <p>For modularity purposes I didn't want the Game Manager to know the specific rules of every single minigame.
              Instead, I defined a IMinigame interface.
              The Manager simply initializes and starts a game, indifferent to the specific mechanics inside</p>

              <img src="assets/Minigame_Framework_Modular.gif" style="width:100%; border-radius:8px;">

            <p>To separate data from logic, I utilized ScriptableObjects.
                To add a new minigame you simply have to create a config asset
                (defining time limits, win conditions, and
              game reference) and drop it into the game manager's list.</p>

             <img src="assets/Minigame_Framework_Stress_Test.gif" style="width:100%; border-radius:8px;">
            
            <p>To avoid frontloading all the assets I implemented
             a queue system using Unity Addressables. The system asynchronously streams the assets
              for the next few games in the queue while the player is busy playing the current one.
               Once a round is finished, those assets are immediately released.</p>
               
               <p>For visual representation I repurposed the game manager in a 3d project using hi-rez uncompressed
               textures on cubes. The graph represents the memory as the "mini games" are loaded and 
               unloaded via the queue system.
               </p>
        

            `
    },

    {
        title: "Modular Character Controller",
        thumb: "assets/3D_Platformer_Thumbnail.png",     // thumbnail image here 
        hover: "assets/3D_Platformer_Gameplay.gif",     // GIF here 
        content: `
            <img src="assets/3D_Platformer_Gameplay.gif" style="width:100%; border-radius:8px;">

            <p>Overview: A 3D platformer framework designed to replicate the complex, momentum-based
             movement mechanics found in some of my personal favorite 3D platformers like Super Mario Odyssey and Super Mario 64.
              Built on top of a standard Kinematic Character Controller (KCC) for robust collision
               handling, I engineered a custom, modular State Machine to handle player logic.
             </p>

             <img src="assets/3D_Platformer_Split.png" style="width:100%; border-radius:8px;">

             <p>To avoid putting everything in one very large and unorganized script, I enforced a 
             strict abstract MovementState base class. The central controller simply
              holds a Dictionary of these states, completely decoupled from specific movement logic.
               This allows new mechanics to be added as isolated scripts without
                touching the core physics engine.</p>

             <img src="assets/3D_Platformer_Config.gif" style="width:100%; border-radius:8px;">

             <p>To separate data from logic, I utilized ScriptableObjects for all physics 
             parameters. Factors like jump height, speed, and acceleration are easily editable 
             in the inspector, allowing for real-time iteration during play mode 
             without needing to recompile code.</p>




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