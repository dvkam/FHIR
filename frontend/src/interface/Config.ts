export interface Patient {
    id: string;
    givenName: string;
    familyName: string;
    birthDate: string;
    gender: string;
    phone: string;
    identifier: string;
  }

export interface Entry {
    resource: {
      id: string;
      name?: Array<{
        given?: string[];
        family?: string;
      }>;
      birthDate?: string;
      gender?: string;
      telecom?: Array<{
        system: string;
        value: string;
      }>;
      identifier?: Array<{
        value: string;
      }>;
    };
  }

export interface Encounter {
    id: string;
    text: string;
    status: string;
  }
