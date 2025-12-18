// day1.js
// Advent of Code 2020 - Day 1: Report Repair
// Problem:
// We are given a list of expense report numbers.
// Part 1: Find 2 numbers that add up to 2020 and return their product.
// Part 2: Find 3 numbers that add up to 2020 and return their product.
//
// Implementation:
// - Part 1: Use a Set for O(1) lookup. For each number, check if (2020 - num) exists.
// - Part 2: For each pair, use a Set of remaining numbers to find the third complement.
//
// Key Methods & Documentation:
// - fs.readFileSync: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
// - String.trim(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
// - String.split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// - Array.map(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// - Number(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
// - Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// - Set.has() & Set.add(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has

const fs = require('fs');

const input = fs
    .readFileSync('input/day1.txt', 'utf8') // Synchronous file read - Node.js core
    .trim()                                 // Remove trailing newline/whitespace
    .split('\n')                            // Split into array of strings
    .map(Number);                           // Convert each string to number

function part1(numbers) {
    const seen = new Set(); // Stores numbers we've seen so far for fast lookup
    for (const num of numbers) {
        const complement = 2020 - num;
        if (seen.has(complement)) {
            // Found pair! Return product
            return num * complement;
        }
        seen.add(num); // Add current number for future checks
    }
    return null; // No pair found (though puzzle guarantees one)
}

function part2(numbers) {
    // Brute force with optimization: for each starting number, treat rest as Part 1 problem
    for (let i = 0; i < numbers.length - 2; i++) {
        const seen = new Set();
        for (let j = i + 1; j < numbers.length; j++) {
            const sumTwo = numbers[i] + numbers[j];
            const complement = 2020 - sumTwo;
            if (seen.has(complement)) {
                return numbers[i] * numbers[j] * complement;
            }
            seen.add(numbers[j]);
        }
    }
    return null;
}

console.log('Part 1:', part1(input));

console.log('Part 2:', part2(input));
