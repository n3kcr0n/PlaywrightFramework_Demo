import Cryptr from 'cryptr';
import { getEnv } from './testConfigurations';

function createCryptr(): Cryptr {
  return new Cryptr(getEnv('CRYPTR_SECRET'), { encoding: 'base64' });
}

export function encryptCredential(value: string): string {
  return createCryptr().encrypt(value);
}

export function decryptCredential(value: string): string {
  return createCryptr().decrypt(value);
}

export function getDecryptedEnv(name: string): string {
  return decryptCredential(getEnv(`${name}_ENCRYPTED`));
}
