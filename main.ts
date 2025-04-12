// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const filePath = Deno.args[0];
  const input = await Deno.readTextFile(filePath);
  const lines = input.split(/\r?\n/);

  let dir = "";
  let x = 0;
  let y = 0;
  let isRobotPlaced = false;

  for (let i = 0; i < lines.length; i++) {
    const commands = lines[i].split(" ");

    if (commands.length === 0) continue;

    switch (commands[0]) {
      case "PLACE": {
        const args = commands[1].split(",");

        x = Number(args[0]);
        y = Number(args[1]);
        dir = args[3];
        break;
      }
      default: {
        continue;
      }
    }
  }
}
