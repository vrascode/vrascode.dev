import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const profilePhotoPath = '/images/matheus-sulino.png';
export const resumePath = '/documents/matheus-sulino-cv.pdf';

export function hasProfilePhoto(): boolean {
  return existsSync(join(process.cwd(), 'public', 'images', 'matheus-sulino.png'));
}

export function hasResume() {
  return existsSync(join(process.cwd(), 'public', 'documents', 'matheus-sulino-cv.pdf'));
}
