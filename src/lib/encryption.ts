import CryptoJS from 'crypto-js';

class Encryptor {
  private encryptSecretKey: string;
  private AESkey: string;

  constructor() {
    this.encryptSecretKey = "mySecretKeyHere";
    this.AESkey = "sQeWwhHUKB3VTrwXijHsufC1S2l19upM";
  }

  encryptData(data: string): string {
    const salt = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.PBKDF2(this.encryptSecretKey, salt, {
      keySize: 8,
      iterations: 100,
    });
    const R = CryptoJS.lib.WordArray.random(16);
    const V = CryptoJS.AES.encrypt(data, key, {
      iv: R,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return CryptoJS.enc.Base64.stringify(salt.concat(R).concat(V.ciphertext));
  }

  encryptAES(data: string): string {
    return CryptoJS.AES.encrypt(data, this.AESkey).toString();
  }

  decryptAES(data: string): string | undefined {
    const decrypted = CryptoJS.AES.decrypt(data, this.AESkey);
    if (decrypted) {
      try {
        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedString.length > 0 ? decryptedString : "";
      } catch {
        return "";
      }
    }
    return undefined;
  }
  
  // Function to format date as required
  // private getdateformatora(date: Date): string {
  //   const day = ('0' + date.getDate()).slice(-2);
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   const year = date.getFullYear();
  //   return `${year}-${month}-${day}`;
  // }
}

export default Encryptor;