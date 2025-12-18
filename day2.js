// day2.js
// Advent of Code 2020 - Day 2: Password Philosophy
// Problem:
// Each line: "min-max letter: password"
// Part 1: Password valid if letter appears between min and max times (inclusive)
// Part 2: Toboggan policy: letter must appear at exactly ONE of position min or max (1-indexed)
//
// Implementation:
// - Use regex to parse each line into structured object
// - Part 1: Count occurrences using regex match all
// - Part 2: Check positions directly using 1-based indexing
//
// Key Methods & Documentation:
// - String.match(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
// - RegExp with 'g' flag: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
// - Array.reduce(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// - Array.length: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length

const fs = require('fs');

const input = fs.readFileSync('input/day2.txt', 'utf8').trim().split('\n');

// Parse each line using regex: captures min, max, letter, password
// Example: "1-3 a: abcde" → {min:1, max:3, letter:'a', password:'abcde'}
const entries = input.map(line => {
    const match = line.match(/^(\d+)-(\d+) (\w): (\w+)$/);
    // match[1]=min, match[2]=max, match[3]=letter, match[4]=password
    return {
        min: Number(match[1]),
        max: Number(match[2]),
        letter: match[3],
        password: match[4]
    };
});

function part1() {
    return entries.reduce((validCount, entry) => {
        // Count occurrences of letter in password
        // match returns array of matches or null → use || [] to default to empty
        const occurrences = (entry.password.match(new RegExp(entry.letter, 'g')) || []).length;
        // Check if count is within range
        return validCount + (occurrences >= entry.min && occurrences <= entry.max ? 1 : 0);
    }, 0);
}

function part2() {
    return entries.reduce((validCount, entry) => {
        // Positions are 1-indexed, so we subtract 1 for 0-indexed string access
        const pos1 = entry.password[entry.min - 1] === entry.letter;
        const pos2 = entry.password[entry.max - 1] === entry.letter;
        // Valid if exactly one position has the letter (XOR)
        return validCount + (pos1 !== pos2 ? 1 : 0);
    }, 0);
}

console.log('Part 1:', part1());

console.log('Part 2:', part2());
