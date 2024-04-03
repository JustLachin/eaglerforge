ModAPI.require("player");
ModAPI.require("ItemID");

// Define item ID for house egg
var houseEggID = ItemID.house_egg;

Item.registerUseFunction(houseEggID, function(coords, item, block){
    var player = Player.get();
    var pos = coords.relative;

    // Check if the item is used on a solid block
    if (block.id === 1) { // 1 is the block ID for stone in Minecraft, you can change it accordingly
        buildHouse(pos.x, pos.y, pos.z);
        Player.decreaseCarriedItem(1); // Decrease item count after usage
    }
});

function buildHouse(x, y, z) {
    var world = World.getWorld();

    // Build a simple house with cobblestone
    // Foundation
    for (var i = -2; i <= 2; i++) {
        for (var j = -2; j <= 2; j++) {
            world.setBlock(x + i, y - 1, z + j, 4); // Place cobblestone blocks as foundation
        }
    }

    // Walls
    for (var i = -2; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            world.setBlock(x + i, y + j, z - 2, 4); // Place cobblestone blocks as back wall
            world.setBlock(x + i, y + j, z + 2, 4); // Place cobblestone blocks as front wall
        }
    }

    // Roof
    for (var i = -2; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            if (j === 2) {
                world.setBlock(x + i, y + j, z - 1, 4); // Place cobblestone blocks as roof
                world.setBlock(x + i, y + j, z + 1, 4); // Place cobblestone blocks as roof
            }
        }
    }

    // Door
    world.setBlock(x, y, z + 2, 64); // Place door
}
