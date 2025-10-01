import CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';

export function sha256Hex(str: string): string {
  return SHA256(str).toString(CryptoJS.enc.Hex);
}
