// day3.js
// Advent of Code 2020 - Day 3: Toboggan Trajectory
// Problem Understanding:
// Grid of trees (#) and open (.) that repeats horizontally.
// Start at (0,0), move right 3, down 1 each step.
// Part 1: Count trees hit on slope (3 right, 1 down)
// Part 2: Multiply trees hit on multiple slopes
//
// Implementation:
// Use modulo (%) for horizontal wrapping since pattern repeats.
// Step down by 'down' rows each time.
//
// Key Methods & Documentation:
// - Modulo operator (%): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder
// - Array access: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

const fs = require('fs');

const map = fs.readFileSync('input/day3.txt', 'utf8').trim().split('\n');
const width = map[0].length; // All rows same length

function countTrees(right, down) {
    let x = 0;       // Horizontal position
    let trees = 0;   // Tree counter
    // Start from row 'down', step by 'down' to avoid checking row 0 unnecessarily
    for (let y = down; y < map.length; y += down) {
        x = (x + right) % width; // Wrap around using modulo
        if (map[y][x] === '#') {
            trees++;
        }
    }
    return trees;
}

function part1() {
    return countTrees(3, 1);
}

function part2() {
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];
    // Multiply results using reduce with initial value 1
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    return slopes.reduce((product, [right, down]) => product * countTrees(right, down), 1);
}

console.log('Part 1:', part1());
console.log('Part 2:', part2());