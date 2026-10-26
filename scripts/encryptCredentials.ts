import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { encryptCredential } from '../configurations/credentials';

async function main(): Promise<void> {
  const prompt = createInterface({ input: stdin, output: stdout });

  try {
    const username = await prompt.question('SauceDemo username: ');
    const password = await prompt.question('SauceDemo password: ');

    if (!username || !password) {
      throw new Error('Both username and password are required.');
    }

    console.log(`SAUCEDEMO_USER_ENCRYPTED=${encryptCredential(username)}`);
    console.log(`SAUCEDEMO_PASSWORD_ENCRYPTED=${encryptCredential(password)}`);
  } finally {
    prompt.close();
  }
}

void main();
