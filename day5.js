// day5.js
// Advent of Code 2020 - Day 5: Binary Boarding
// Problem Understanding:
// Seat codes use binary space partitioning:
// F/L = lower half (0), B/R = upper half (1)
// First 7 chars = row (0-127), last 3 = column (0-7)
// Seat ID = row * 8 + column
// Part 1: Highest seat ID
// Part 2: Find missing seat ID (your seat) in nearly full plane
//
// Implementation:
// Replace F/B and L/R with 0/1 → parse as binary
// Sort IDs and find gap of 2
//
// Key Methods & Documentation:
// - String.replace(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// - String.slice(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
// - parseInt() with radix: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
// - Array.sort(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// - Math.max(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max

const fs = require('fs');

const passes = fs.readFileSync('input/day5.txt', 'utf8').trim().split('\n');

function getSeatID(boardingPass) {
    // Replace letters with binary digits
    const rowBinary = boardingPass
        .slice(0, 7)           // First 7 characters for row
        .replace(/F/g, '0')    // F = front = 0
        .replace(/B/g, '1');   // B = back = 1

    const colBinary = boardingPass
        .slice(7)              // Last 3 characters for column
        .replace(/L/g, '0')    // L = left = 0
        .replace(/R/g, '1');   // R = right = 1

    const row = parseInt(rowBinary, 2); // Base 2
    const col = parseInt(colBinary, 2);

    return row * 8 + col;
}

const seatIDs = passes.map(getSeatID).sort((a, b) => a - b); // Numeric sort

function part1() {
    return seatIDs[seatIDs.length - 1]; // Highest after sorting
    // Alternatively: Math.max(...seatIDs)
}

function part2() {
    // Plane is almost full → only one missing seat → find gap of 2 between consecutive IDs
    for (let i = 1; i < seatIDs.length; i++) {
        if (seatIDs[i] - seatIDs[i - 1] === 2) {
            return seatIDs[i] - 1; // The missing one
        }
    }
    return null;
}

console.log('Part 1:', part1());
console.log('Part 2:', part2());