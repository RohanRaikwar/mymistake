import { Schema, model, Document } from 'mongoose';

interface IHotelDetails extends Document {
  hotelname: string;
  email: string;
  contact: number;
  city: string;
  address: string;
  GSTIN: string;
  logopath?: string;
  user_id: string;
}

const HotelDetailsSchema: Schema = new Schema(
  {
    hotelname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    GSTIN: {
      type: String,
      required: true,
    },
    logopath: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HoteldataModel = model<IHotelDetails>('HoteldataModel', HotelDetailsSchema);

export default HoteldataModel;
