import { gunzipSync } from "zlib";

// Function to decode a Base64-encoded and gzipped string
function decodeBase64Response(base64EncodedString) {
    const decompressed = gunzipSync(Buffer.from(base64EncodedString, "base64"));
    return JSON.parse(decompressed.toString());
}

// Read input from the terminal
const args = process.argv.slice(2); // Skip the first two arguments (node and script name)

if (args.length === 0) {
    console.error("Error: No Base64 string provided. Please provide a Base64-encoded string as an argument.");
    process.exit(1);
}

const base64EncodedString = args[0];

try {
    const decodedResponse = decodeBase64Response(base64EncodedString);
    console.log("Decoded Response:", decodedResponse);
} catch (error) {
    console.error("Error decoding the Base64 string:", error.message);
    process.exit(1);
}
