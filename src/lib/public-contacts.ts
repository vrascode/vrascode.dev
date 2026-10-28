import { identity } from './identity';

export type ProfileContacts = { email: string | null; whatsapp: string | null };

export function buildProfileContacts(values: { email?: string; whatsapp?: string }): ProfileContacts {
  const candidateEmail = values.email?.trim() ?? '';
  const email = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/u.test(candidateEmail) ? candidateEmail : null;

  const candidateNumber = values.whatsapp?.replace(/[\s()+.\-]/gu, '') ?? '';
  const whatsapp = /^[1-9]\d{7,14}$/u.test(candidateNumber) ? candidateNumber : null;
  return { email, whatsapp };
}

export function getProfileContacts(): ProfileContacts {
  return buildProfileContacts({
    email: process.env.PORTFOLIO_EMAIL ?? identity.publicContact.email,
    whatsapp: process.env.PORTFOLIO_WHATSAPP ?? identity.publicContact.whatsapp
  });
}
