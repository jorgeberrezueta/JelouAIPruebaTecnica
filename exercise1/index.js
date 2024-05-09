let input;
try {
    input = JSON.parse(process.argv.slice(2).join(' '));
    if (!Array.isArray(input)) throw new Error();
    if (input.find(elem => !Number.isInteger(elem))) throw new Error();
} catch (error) {
    console.error('Invalid input. Please enter a valid JSON integer array');
    process.exit(1);
    
}
console.log("Input:", input);

function calculateScore(arr) {
    return arr.reduce((acc, elem) => {
        // Using return as a break statement
        if (elem === 5) return acc + 5;
        if (elem % 2 === 0) return acc + 1;
        if (elem % 2 !== 0) return acc + 3;
        // Other values default to no behavior (no points)
    }, 0);
}

console.log("Output:", calculateScore(input));