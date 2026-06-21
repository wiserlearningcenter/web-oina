import crypto from "node:crypto";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(input) {
  const normalized = input.toUpperCase().replace(/=+$/, "");
  let n = 0;
  let bits = 0;
  const out = [];
  for (const ch of normalized) {
    const p = ALPHABET.indexOf(ch);
    if (p === -1) continue;
    n = (n << 5) | p;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      out.push((n >> bits) & 0xff);
    }
  }
  return Buffer.from(out);
}

function base32Encode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  let out = "";
  let v = 0;
  let bits = 0;
  for (const byte of buf) {
    v = (v << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      out += ALPHABET[(v >> bits) & 31];
    }
  }
  if (bits > 0) out += ALPHABET[(v << (5 - bits)) & 31];
  const pad = (8 - (out.length % 8)) % 8;
  return out + "=".repeat(pad);
}

export function totpGenerateSecret() {
  return base32Encode(crypto.randomBytes(10));
}

function totpAt(secretBuf, timeSlice) {
  const counter = Buffer.alloc(8);
  counter.writeUInt32BE(0, 0);
  counter.writeUInt32BE(timeSlice, 4);
  const hash = crypto.createHmac("sha1", secretBuf).update(counter).digest();
  const offset = hash[hash.length - 1] & 0x0f;
  const truncated =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);
  return String(truncated % 1_000_000).padStart(6, "0");
}

export function totpVerify(secretBase32, code, window = 1) {
  const secret = base32Decode(secretBase32);
  if (!secret.length || secret.length < 8) return false;
  const digits = String(code ?? "").replace(/\D/g, "");
  if (digits.length !== 6) return false;
  const timeSlice = Math.floor(Date.now() / 1000 / 30);
  for (let i = -window; i <= window; i++) {
    if (crypto.timingSafeEqual(Buffer.from(totpAt(secret, timeSlice + i)), Buffer.from(digits))) {
      return true;
    }
  }
  return false;
}

export function totpCurrent(secretBase32) {
  const secret = base32Decode(secretBase32);
  if (!secret.length) return "";
  return totpAt(secret, Math.floor(Date.now() / 1000 / 30));
}

export function totpUri(secret, label = "Acropolis CMS", issuer = "Acropolis") {
  const encIssuer = encodeURIComponent(issuer);
  const encLabel = encodeURIComponent(label);
  return `otpauth://totp/${encIssuer}:${encLabel}?secret=${secret}&issuer=${encIssuer}`;
}
