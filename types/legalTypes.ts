export interface LegalMessage {
    id: string;
    label: string;
    inputref: string[];
    message: string;
  }
  
  export interface LegalInput {
    id: string;
    label: string;
    type: 'text' | 'select';
    options?: { value: string; label: string }[];
  }
  
  export interface LegalData {
    messages: LegalMessage[];
    inputs: { [key: string]: LegalInput };
  }