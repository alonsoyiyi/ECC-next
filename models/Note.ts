import mongoose, { Schema, Model, Document } from 'mongoose';

interface INote extends Document {
  userId: string;
  notes: string;
  createdAt: Date;  // Agregar los campos automáticamente generados
  updatedAt: Date;  // Agregar los campos automáticamente generados
}

const NoteSchema = new Schema<INote>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,  // Esto manejará 'createdAt' y 'updatedAt' automáticamente
  versionKey: false
});

// Evitar múltiples instancias del modelo durante hot reload
const Note: Model<INote> = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default Note;
