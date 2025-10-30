import { ArtInterest } from './types';

export const ART_INTERESTS: { id: ArtInterest, label: string }[] = [
  { id: 'Menggambar', label: 'Menggambar' },
  { id: 'Melukis', label: 'Melukis' },
  { id: 'Mematung', label: 'Mematung' },
  { id: 'Seni Digital', label: 'Seni Digital' },
  { id: 'Kriya', label: 'Kriya (Kerajinan Tangan)' },
];

export const GENDER_OPTIONS: { value: string, label: string }[] = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' },
    { value: 'Lainnya', label: 'Lainnya' }
];