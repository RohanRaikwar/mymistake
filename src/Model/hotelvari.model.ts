import { Schema, model, Document } from 'mongoose';

interface IHotelVaridocx extends Document {
  pancard: string;
  GSTcertificate: string;
  bankaccount: string;
  user_id: string;
  typedocs?: string;
  varification_image?: string;
}

const HotelVaridocxSchema: Schema = new Schema(
  {
    pancard: {
      type: String,
      required: true,
    },
    GSTcertificate: {
      type: String,
      required: true,
    },
    bankaccount: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    typedocs: {
      type: String,
      default: '',
    },
    varification_image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const hotelvaridocx = model<IHotelVaridocx>('hotelsVarificationDocument', HotelVaridocxSchema);

export default hotelvaridocx;
