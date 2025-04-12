// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const filePath = Deno.args[0];
  const input = await Deno.readTextFile(filePath);
  const lines = input.split(/\r?\n/);

  type direction = "NORTH" | "EAST" | "SOUTH" | "WEST";
  let dir: direction = "NORTH";
  let x = 0;
  let y = 0;
  let isRobotPlaced = false;

  const leftTurn: Record<direction, direction> = {
    NORTH: "WEST",
    EAST: "NORTH",
    SOUTH: "EAST",
    WEST: "SOUTH",
  };

  const rightTurn: Record<direction, direction> = {
    NORTH: "EAST",
    EAST: "SOUTH",
    SOUTH: "WEST",
    WEST: "NORTH",
  };

  for (let i = 0; i < lines.length; i++) {
    const commands = lines[i].split(" ");

    if (commands.length === 0) continue;

    switch (commands[0]) {
      case "PLACE": {
        const args = commands[1].split(",");

        const tmpX = Number(args[0]);
        const tmpY = Number(args[1]);

        if (tmpX < 0 || tmpX > 4 || tmpY < 0 || tmpY > 4) break;

        x = tmpX;
        y = tmpY;
        dir = args[2] as direction;
        isRobotPlaced = true;

        break;
      }
      case "MOVE": {
        if (!isRobotPlaced) break;

        if (dir === "NORTH" && y + 1 < 5) {
          y += 1;
        } else if (dir === "EAST" && x + 1 < 5) {
          x += 1;
        } else if (dir === "SOUTH" && y - 1 > -1) {
          y -= 1;
        } else if (dir === "WEST" && x - 1 > -1) {
          x -= 1;
        }

        break;
      }
      case "LEFT": {
        if (!isRobotPlaced) break;

        dir = leftTurn[dir];
        break;
      }
      case "RIGHT": {
        if (!isRobotPlaced) break;

        dir = rightTurn[dir];
        break;
      }
      case "REPORT": {
        if (!isRobotPlaced) break;

        console.log(`${x},${y},${dir}`);

        break;
      }
      default: {
        break;
      }
    }
  }
}
