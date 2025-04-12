import { assertEquals } from "@std/assert";
import { Robot } from "./main.ts";

Deno.test("Place robot at positon", () => {
  const robot = new Robot();

  robot.place(2, 3, "NORTH");
  assertEquals(robot.report(), "2,3,NORTH");
});

Deno.test("Place robot too far west", () => {
  const robot = new Robot();

  robot.place(-2, 3, "NORTH");
  assertEquals(robot.report(), undefined);
});

Deno.test("Place robot too far east", () => {
  const robot = new Robot();

  robot.place(7, 3, "NORTH");
  assertEquals(robot.report(), undefined);
});

Deno.test("Place robot too far north", () => {
  const robot = new Robot();

  robot.place(2, 7, "NORTH");
  assertEquals(robot.report(), undefined);
});

Deno.test("Place robot too far south", () => {
  const robot = new Robot();

  robot.place(2, -1, "NORTH");
  assertEquals(robot.report(), undefined);
});

Deno.test("Move the robot one unit", () => {
  const robot = new Robot();

  robot.place(2, 1, "NORTH");
  robot.move();
  assertEquals(robot.report(), "2,2,NORTH");
});

Deno.test("Move the robot off west side does nothing", () => {
  const robot = new Robot();

  robot.place(0, 1, "WEST");
  robot.move();
  assertEquals(robot.report(), "0,1,WEST");
});

Deno.test("Move the robot off north side does nothing", () => {
  const robot = new Robot();

  robot.place(2, 4, "NORTH");
  robot.move();
  assertEquals(robot.report(), "2,4,NORTH");
});

Deno.test("Move the robot off east side does nothing", () => {
  const robot = new Robot();

  robot.place(4, 2, "EAST");
  robot.move();
  assertEquals(robot.report(), "4,2,EAST");
});

Deno.test("Move the robot off south side does nothing", () => {
  const robot = new Robot();

  robot.place(2, 0, "SOUTH");
  robot.move();
  assertEquals(robot.report(), "2,0,SOUTH");
});

Deno.test("Disregard all commands before placing", () => {
  const robot = new Robot();

  robot.move();
  robot.right();
  robot.left();
  robot.place(2, 3, "SOUTH");
  assertEquals(robot.report(), "2,3,SOUTH");
});

Deno.test("Rotating left turns robot left", () => {
  const robot = new Robot();

  robot.place(2, 0, "SOUTH");
  robot.left();
  assertEquals(robot.report(), "2,0,EAST");
});

Deno.test("Rotating right turns robot left", () => {
  const robot = new Robot();

  robot.place(2, 0, "SOUTH");
  robot.right();
  assertEquals(robot.report(), "2,0,WEST");
});

Deno.test("Multiple PLACE commands are valid", () => {
  const robot = new Robot();

  robot.place(2, 0, "SOUTH");
  robot.move();
  robot.right();
  robot.move();
  robot.place(4, 3, "WEST");
  robot.move();
  robot.left();

  assertEquals(robot.report(), "3,3,SOUTH");
});
