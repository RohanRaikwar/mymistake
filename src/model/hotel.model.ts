import { Schema, model, Document } from 'mongoose';

interface IHotel extends Document {
  mobile_no: number;
  otp: number;
  role: string;
  completedstage: string;
  userverify: boolean;
}

const HotelSchema: Schema = new Schema(
  {
    mobile_no: {
      required: true,
      type: Number,
      maxlength: 10,
      unique: true,
    },
    otp: {
      type: Number,
      maxlength: 4,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    completedstage: {
      type: String,
      required: true,
      default: "not verify",
    },
    userverify: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const HotelModel = model<IHotel>('HotelModel', HotelSchema);

export default HotelModel;
