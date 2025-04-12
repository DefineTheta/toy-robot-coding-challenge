# Toy Robot Coding Puzzle

## How to run

The program is written using `Deno` and accepts an input file as the first argument. To run the program you can use the following command:
`deno main.ts input/input_1.txt`

To run the tests you can use the command:
`deno test`

## Design decisions

- Why use Deno?

  - Native support for Typescript which enhances type safety over plain Javascript. And native support means you don't have to spend hourse setting up typescript to work properly.
  - A robust standard library that makes actions like File I/O a breeze
  - First class support for testing so you don't have to download and install any third party librarires
  - Ease of use for a quick CLI application like this

- Why use classes?

  - Makes unit testing easier
  - Easy to replicate a list of commands for different tests assert

- Why use Typescript?

  - It's the programming language I am most comfortable with
