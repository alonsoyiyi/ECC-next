export interface GlobalInputs {
    nombre: string;
    bonus?: string;
    pointDiscount?: string;
    [key: string]: string | undefined; // Añadimos el index signature y hacemos las propiedades opcionales
  }