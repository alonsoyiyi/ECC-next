export interface SalesDetailProps {
    template: {
      id: number;
      name: string;
      label: string;
      message: string;
      inputref: { key: string; label: string }[]; // Agrega esta propiedad
    };
    inputs: {
      [key: string]: {
        type?: string;
        label?: string;
        options?: { value: string, label: string }[];
      };
    };
  }
  