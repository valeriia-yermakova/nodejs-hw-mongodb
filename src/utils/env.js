import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultValue) {
    const value = process.env[name];
    if (!value && defaultValue === undefined) {
      throw new Error(`Missing: process.env['${name}'].`);
    }
    return value || defaultValue;
  }