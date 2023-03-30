import { ConfigService } from '@nestjs/config';
import * as CryptoES from 'crypto-js';

const config = new ConfigService();
const encryptConfig = CryptoES.enc.Utf8;

export const encrypt = (data: string) => {
  const encryptedData = CryptoES.AES.encrypt(encryptConfig.parse(data), encryptConfig.parse(config.get('SECRET_KEY_AES')), {
    iv: encryptConfig.parse(config.get('SECRET_KEY_AES')),
    mode: CryptoES.mode.CBC,
    padding: CryptoES.pad.Pkcs7,
    format: CryptoES.format.Hex,
  });
  return encryptedData.toString();
};

export const decrypt = (data: string) => {
  const encryptedData = CryptoES.AES.decrypt(data, encryptConfig.parse(config.get('SECRET_KEY_AES')), {
    iv: encryptConfig.parse(config.get('SECRET_KEY_AES')),
    mode: CryptoES.mode.CBC,
    padding: CryptoES.pad.Pkcs7,
    format: CryptoES.format.Hex,
  });
  return encryptConfig.stringify(encryptedData);
};
