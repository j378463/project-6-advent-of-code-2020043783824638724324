// day4.js
// Advent of Code 2020 - Day 4: Passport Processing
// Problem:
// Passports separated by blank lines, fields as "key:value"
// Part 1: Valid if all required fields present (cid optional)
// Part 2: Also validate field values with strict rules
//
// Implementation:
// - Split input by double newlines → passport blocks
// - Parse each block into object using reduce
// - Validate presence and values
//
// Key Methods & Documentation:
// - String.replace(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// - String.split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// - Array.every(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// - RegExp.test(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
// - Array.includes(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

const fs = require('fs');

const rawInput = fs.readFileSync('input/day4.txt', 'utf8');

// Split on blank lines (two newlines) to get passport blocks
const passportBlocks = rawInput.split('\n\n');

const passports = passportBlocks.map(block => {
    // Normalize newlines to spaces, then split on spaces
    return block
        .replace(/\n/g, ' ')           // Replace newlines with space
        .trim()
        .split(/\s+/)                  // Split on whitespace
        .reduce((obj, pair) => {
            const [key, value] = pair.split(':');
            obj[key] = value;
            return obj;
        }, {});
});

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']; // cid optional

function hasRequiredFields(passport) {
    return requiredFields.every(field => passport.hasOwnProperty(field));
    // Object.hasOwnProperty: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
}

function isValidFieldData(passport) {
    if (!hasRequiredFields(passport)) return false;

    // byr (Birth Year) - four digits; 1920-2002
    const byr = Number(passport.byr);
    if (!(byr >= 1920 && byr <= 2002)) return false;

    // iyr (Issue Year) - 2010-2020
    const iyr = Number(passport.iyr);
    if (!(iyr >= 2010 && iyr <= 2020)) return false;

    // eyr (Expiration Year) - 2020-2030
    const eyr = Number(passport.eyr);
    if (!(eyr >= 2020 && eyr <= 2030)) return false;

    // hgt (Height)
    const hgt = passport.hgt;
    if (hgt.endsWith('cm')) {
        // String.endsWith(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
        const num = Number(hgt.slice(0, -2));
        if (!(num >= 150 && num <= 193)) return false;
    } else if (hgt.endsWith('in')) {
        const num = Number(hgt.slice(0, -2));
        if (!(num >= 59 && num <= 76)) return false;
    } else {
        return false;
    }

    // hcl (Hair Color) - # followed by exactly 6 hex chars
    if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) return false;

    // ecl (Eye Color) - exact match one of these
    const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    if (!validEyeColors.includes(passport.ecl)) return false;

    // pid (Passport ID) - 9-digit number, including leading zeroes
    if (!/^\d{9}$/.test(passport.pid)) return false;

    return true;
}

console.log('Part 1:', passports.filter(hasRequiredFields).length);

console.log('Part 2:', passports.filter(isValidFieldData).length);
