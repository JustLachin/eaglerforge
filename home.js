ModAPI.require("player");

var houseActive = false; // Variable to track whether or not the house building mode is active

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "h") {
    houseActive = true; // Set house building mode to be active when "h" is pressed
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key.toLowerCase() === "h") {
    houseActive = false; // Set house building mode to be inactive when "h" is released
  }
});

ModAPI.addEventListener("update", () => {
  if (!houseActive) {
    return; // Exit if house building mode is not active
  }

  var playerPos = ModAPI.player.getPosition(); // Get player's position
  var world = ModAPI.getWorld(); // Get the world

  // Build a simple house with cobblestone
  for (var x = -2; x <= 2; x++) {
    for (var y = 0; y <= 2; y++) {
      for (var z = -2; z <= 2; z++) {
        world.setBlock(playerPos.x + x, playerPos.y + y, playerPos.z + z, 4); // Place cobblestone blocks
      }
    }
  }

  // Place a door
  world.setBlock(playerPos.x, playerPos.y + 1, playerPos.z + 2, 64);

  // Push changes
  ModAPI.player.reload();
});
