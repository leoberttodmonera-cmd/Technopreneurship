import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;
export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, KEY_LENGTH).toString('hex');
  return `scrypt$${salt}$${derived}`;
}
export function verifyPassword(password, stored) {
  const [algorithm, salt, expectedHex] = String(stored || '').split('$');
  if (algorithm !== 'scrypt' || !salt || !expectedHex) return false;
  try {
    const expected = Buffer.from(expectedHex, 'hex');
    const actual = scryptSync(password, salt, KEY_LENGTH);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch { return false; }
}
