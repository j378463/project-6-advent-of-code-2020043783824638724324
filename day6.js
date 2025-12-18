// day6.js
// Advent of Code 2020 - Day 6: Custom Customs
// Problem Understanding:
// Groups separated by blank lines, each person answers yes to questions (a-z)
// Part 1: Count unique questions anyone in group answered yes
// Part 2: Count questions everyone in group answered yes
//
// Implementation:
// - Part 1: Use Set on all answers combined (ignoring newlines)
// - Part 2: Intersection of each person's answers
//
// Key Methods & Documentation:
// - Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// - String.replace(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// - Set.size: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size
// - Array.filter(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// - String.includes(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes

const fs = require('fs');

const groups = fs.readFileSync('input/day6.txt', 'utf8').trim().split('\n\n');

function part1() {
    return groups.reduce((total, group) => {
        // Remove newlines and create Set of unique letters
        const uniqueAnswers = new Set(group.replace(/\n/g, '').split(''));
        return total + uniqueAnswers.size;
    }, 0);
}

function part2() {
    return groups.reduce((total, group) => {
        const people = group.trim().split('\n'); // Each person's answers
        if (people.length === 1) return total + people[0].length;

        // Start with first person's answers as initial set
        let common = new Set(people[0]);

        // Intersect with each subsequent person
        for (let i = 1; i < people.length; i++) {
            common = new Set([...common].filter(letter => people[i].includes(letter)));
        }

        return total + common.size;
    }, 0);
}

console.log('Part 1:', part1());
console.log('Part 2:', part2());