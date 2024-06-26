// utils/encryption.ts
import CryptoJS from 'crypto-js';

class Encryptor {
  private encryptSecretKey: string;
  private AESkey: string;

  constructor() {
    this.encryptSecretKey = 'mySecretKeyHere';
    this.AESkey = 'sQeWwhHUKB3VTrwXijHsufC1S2l19upM';
  }

  encryptData(data: string): string {
    const salt = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.PBKDF2(this.encryptSecretKey, salt, {
      keySize: 8,
      iterations: 100,
    });
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
  }
  
//   decryptData(encryptedData: string): string {
//     const encryptedHex = CryptoJS.enc.Base64.parse(encryptedData);
//     const salt = encryptedHex.clone().clone().words.slice(0, 4);
//     const iv = encryptedHex.clone().clone().words.slice(4, 8);
//     const encrypted = encryptedHex.words.slice(32);

//     const key = CryptoJS.PBKDF2(this.encryptSecretKey, salt, {
//       keySize: 8,
//       iterations: 100,
//     });

//     const decrypted = CryptoJS.AES.decrypt(
//       { ciphertext: encrypted },
//       key,
//       { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC }
//     );

//     return decrypted.toString(CryptoJS.enc.Utf8);
//   }

  encryptAES(data: string): string {
    return CryptoJS.AES.encrypt(data, this.AESkey).toString();
  }

  decryptAES(data: string): string {
    const decrypted = CryptoJS.AES.decrypt(data, this.AESkey);
    try {
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      return decryptedString.length > 0 ? decryptedString : '';
    } catch {
      return '';
    }
  }
}

export default Encryptor;
