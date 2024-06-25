const { gunzipSync } = require('zlib');

function decodeBase64Response(base64EncodedString) {
    const decompressed = gunzipSync(Buffer.from(base64EncodedString, "base64"));
    return JSON.parse(decompressed.toString());
}

console.log(decodeBase64Response(""));