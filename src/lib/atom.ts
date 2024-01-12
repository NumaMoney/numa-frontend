import { atom } from 'jotai';

export const connectorAtom = atom<boolean>(false);

export const rEthInputAtom = atom<string>('0');
export const numaInputAtom = atom<string>('0');

export const ethPriceAtom = atom<string | null>(null);
