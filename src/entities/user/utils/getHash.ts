import { createHash } from 'crypto';

export function getHashedPassword(password: string) {
  const hash = createHash('sha-256');
  return hash.update(password).digest('hex');
}
