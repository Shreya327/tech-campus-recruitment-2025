const fs = require("fs");
const readline = require("readline");
const path = require("path");

if (process.argv.length < 3) {
    console.error("Usage: node extract_logs.js <YYYY-MM-DD>");
    process.exit(1);
}

const targetDate = process.argv[2]; // Date to filter logs by
const logFilePath = path.join(__dirname, "logs_2024.log"); // Log file inside src
const outputDir = path.join(__dirname, "..", "output"); 
const outputFilePath = path.join(outputDir, `output_${targetDate}.txt`);


if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const readStream = fs.createReadStream(logFilePath, { encoding: "utf8" });
const writeStream = fs.createWriteStream(outputFilePath, { encoding: "utf8" });

const rl = readline.createInterface({ input: readStream });

console.log(`Extracting logs for ${targetDate}...`);

rl.on("line", (line) => {
    if (line.startsWith(targetDate)) {
        writeStream.write(line + "\n");
    }
});

rl.on("close", () => {
    console.log(`Logs for ${targetDate} saved in ${outputFilePath}`);
    writeStream.end();
});
