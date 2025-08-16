import { Buffer } from 'buffer';

export type JWTPayload = Record<string, unknown> & {
  exp?: number;
  iat?: number;
};

export default function parseJWTPayload(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');

    let jsonString: string;

    try {
      // Prefer Buffer if available (works in RN with polyfill)
      jsonString = Buffer.from(base64, 'base64').toString('utf8');
    } catch {
      if (typeof atob === 'function') {
        const decoded = atob(base64);
        // Decode URI components in case of unicode
        jsonString = decodeURIComponent(
          decoded
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
        );
      } else {
        return null;
      }
    }

    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}
