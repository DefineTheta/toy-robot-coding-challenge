type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

const leftTurn: Record<Direction, Direction> = {
  NORTH: "WEST",
  EAST: "NORTH",
  SOUTH: "EAST",
  WEST: "SOUTH",
};

const rightTurn: Record<Direction, Direction> = {
  NORTH: "EAST",
  EAST: "SOUTH",
  SOUTH: "WEST",
  WEST: "NORTH",
};

export class Robot {
  dir: Direction;
  x: number;
  y: number;
  isPlaced: boolean;

  constructor() {
    this.dir = "NORTH";
    this.x = 0;
    this.y = 0;
    this.isPlaced = false;
  }

  place(x: number, y: number, dir: Direction) {
    if (x < 0 || x > 4 || y < 0 || y > 4) return;

    this.x = x;
    this.y = y;
    this.dir = dir;
    this.isPlaced = true;
  }

  move() {
    if (!this.isPlaced) return;

    if (this.dir === "NORTH" && this.y + 1 < 5) {
      this.y += 1;
    } else if (this.dir === "EAST" && this.x + 1 < 5) {
      this.x += 1;
    } else if (this.dir === "SOUTH" && this.y - 1 > -1) {
      this.y -= 1;
    } else if (this.dir === "WEST" && this.x - 1 > -1) {
      this.x -= 1;
    }
  }

  left() {
    if (!this.isPlaced) return;

    this.dir = leftTurn[this.dir];
  }

  right() {
    if (!this.isPlaced) return;

    this.dir = rightTurn[this.dir];
  }

  report() {
    if (!this.isPlaced) return;

    return `${this.x},${this.y},${this.dir}`;
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const filePath = Deno.args[0];
  const input = await Deno.readTextFile(filePath);
  const lines = input.split(/\r?\n/);

  const robot = new Robot();

  for (let i = 0; i < lines.length; i++) {
    const commands = lines[i].split(" ");

    if (commands.length === 0) continue;

    switch (commands[0]) {
      case "PLACE": {
        const args = commands[1].split(",");

        robot.place(Number(args[0]), Number(args[1]), args[2] as Direction);
        break;
      }
      case "MOVE": {
        robot.move();
        break;
      }
      case "LEFT": {
        robot.left();
        break;
      }
      case "RIGHT": {
        robot.right();
        break;
      }
      case "REPORT": {
        const pos = robot.report();

        if (pos) {
          console.log(pos);
        }
        break;
      }
      default: {
        break;
      }
    }
  }
}
