import mongoose from 'mongoose';
export interface GlobalInputs {
    nombre: string;
    bonus?: string;
    pointDiscount?: string;
    [key: string]: string | undefined; // Añadimos el index signature y hacemos las propiedades opcionales
  }

  declare global {
    var mongoose: {
      conn: mongoose.Connection | null;
      promise: Promise<mongoose.Mongoose> | null;
    };
  }
  export {};