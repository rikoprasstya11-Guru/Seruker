
export type ArtInterest = 'Menggambar' | 'Melukis' | 'Mematung' | 'Seni Digital' | 'Kriya';

export interface MemberData {
  fullName: string;
  class: string;
  studentId: string;
  gender: string;
  phoneNumber: string;
  reason: string;
  interests: ArtInterest[];
  portfolio: File | null;
}
