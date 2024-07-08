function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function modInverse(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1;
}

function generateRSAKeys(p, q) {
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  let e = 2;
  while (e < phi) {
    if (gcd(e, phi) === 1) break;
    e++;
  }

  const d = modInverse(e, phi);
  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
}

function encryptRSA(message, publicKey) {
  const { e, n } = publicKey;
  let encryptedMessage = "";
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    const encryptedCharCode = BigInt(charCode) ** BigInt(e) % BigInt(n);
    encryptedMessage += String.fromCharCode(Number(encryptedCharCode));
  }
  return encryptedMessage;
}

function decryptRSA(encryptedMessage, privateKey) {
  const { d, n } = privateKey;
  let decryptedMessage = "";
  for (let i = 0; i < encryptedMessage.length; i++) {
    const charCode = encryptedMessage.charCodeAt(i);
    const decryptedCharCode = BigInt(charCode) ** BigInt(d) % BigInt(n);
    decryptedMessage += String.fromCharCode(Number(decryptedCharCode));
  }
  return decryptedMessage;
}

const p = 61;
const q = 53;
const { publicKey, privateKey } = generateRSAKeys(p, q);

const message = "Hello, RSA encryption!";
const encryptedMessage = encryptRSA(message, publicKey);
const decryptedMessage = decryptRSA(encryptedMessage, privateKey);

console.log("Original message:", message);
console.log("Encrypted message:", encryptedMessage);
console.log("Decrypted message:", decryptedMessage);
