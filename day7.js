// day7.js
// Advent of Code 2020 - Day 7: Handy Haversacks
// Problem:
// Bag containment rules: "outer bags contain X inner bags"
// Part 1: How many bag colors can eventually contain a shiny gold bag?
// Part 2: How many individual bags are required inside one shiny gold bag?
//
// Implementation:
// - Parse rules into Map: outer → Map(inner > count)
// - Part 1: Build reverse graph and BFS from "shiny gold"
// - Part 2: Recursive count with memoization
//
// Key Methods & Documentation:
// - Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// - Map.set() & Map.get(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// - Queue (array as queue): shift() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
// - Recursion & memoization

const fs = require('fs');

const lines = fs.readFileSync('input/day7.txt', 'utf8').trim().split('\n');

// contains: outer bag > Map of (inner bag → count)
const contains = new Map();

for (const line of lines) {
    const [outer, contents] = line.split(' bags contain ');

    if (contents === 'no other bags.') {
        continue; // This bag contains nothing
    }

    const innerBags = contents.split(', ').map(rule => {
        const match = rule.match(/^(\d+) (.+?) bags?$/);
        // match[1] = count, match[2] = color
        return [match[2], Number(match[1])];
    });

    contains.set(outer, new Map(innerBags));
}

// Build reverse mapping for Part 1: inner → list of outers that can contain it
const canBeContainedIn = new Map();
for (const [outer, inners] of contains) {
    for (const inner of inners.keys()) {
        if (!canBeContainedIn.has(inner)) {
            canBeContainedIn.set(inner, []);
        }
        canBeContainedIn.get(inner).push(outer);
    }
}

function part1() {
    const visited = new Set();
    const queue = ['shiny gold']; // Start from target bag

    while (queue.length > 0) {
        const current = queue.shift(); // Dequeue
        const parents = canBeContainedIn.get(current) || [];

        for (const parent of parents) {
            if (!visited.has(parent)) {
                visited.add(parent);
                queue.push(parent); // Enqueue for further exploration
            }
        }
    }

    return visited.size; // Number of bags that can contain shiny gold
}

// Part 2: Count total bags inside one shiny gold bag
const memo = new Map(); // bag > total inner bags

function countBagsInside(bagColor) {
    if (memo.has(bagColor)) return memo.get(bagColor);

    const innerRules = contains.get(bagColor) || new Map();
    let total = 0;

    for (const [innerColor, count] of innerRules) {
        // Each inner bag requires 'count' of itself, plus all bags inside each of those
        total += count * (1 + countBagsInside(innerColor));
    }

    memo.set(bagColor, total);
    return total;
}

function part2() {
    return countBagsInside('shiny gold');
}

console.log('Part 1:', part1());

console.log('Part 2:', part2());
