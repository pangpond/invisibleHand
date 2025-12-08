export interface Contact {
  mobile: string;
  email: string;
}

export interface Passport {
  document_type: string;
  issuing_state: string;
  surname: string;
  given_names: string;
  passport_number: string;
  nationality: string;
  date_of_birth: string;
  sex: string;
  date_of_expiry: string;
  raw_mrz: string;
  confidence: number;
  response_ms: number;
  face_s3_url: string;
  register_status: string | null;
}

export interface RegisterData {
  contact: Contact;
  passport: Passport;
}
