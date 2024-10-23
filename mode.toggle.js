const mode = process.argv[2];

if (!mode) {
    console.error('Mode is not specified!');
    process.exit(1);
}

process.env.VITE_MODE = mode;

console.log(`VITE_MODE is set to: ${process.env.VITE_MODE}`);