
export enum UserRole {
  CLIENTE = 'cliente',
  ANFITRION = 'anfitrion',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onboardingComplete: boolean;
}

export interface OnboardingData {
    fullNameOfficial: string; ineNumber: string; maritalStatus: 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'unión libre' | ''; dateOfBirth: string; nationality: string; landlinePhone: string; cellPhone: string; gender: 'hombre' | 'mujer' | '';
    street: string; exteriorNumber: string; interiorNumber: string; neighborhood: string; postalCode: string; city: string; state: string;
    rfc: string; fiscalCertificate: File | null;
    idFront: File | null; idBack: File | null;
    addressProofType: 'luz' | 'agua' | 'teléfono' | 'internet' | 'gas' | 'predial' | ''; addressProofFile: File | null;
    propertyStreet: string; propertyExteriorNumber: string; propertyInteriorNumber: string; propertyNeighborhood: string; propertyPostalCode: string; propertyCity: string; propertyState: string; propertyDescription: string;
    propertyDeed: File | null;
    bankName: string; clabeNumber: string;
}
