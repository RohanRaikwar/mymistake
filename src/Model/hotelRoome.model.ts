import { Schema, model, Document } from 'mongoose';

interface IRoom extends Document {
  room_type: string[];
  room_availibility: { room_type: string; rooms: number[]; no_guests: string; base_price: string }[];
  user_id: string;
  chargeble_service: string[];
  Amenities: { nameof_amenities: string; types: string[] }[];
  photos: { name: string; path: string }[];
}

const RoomSchema: Schema = new Schema(
  {
    room_type: {
      type: [String],
      required: true,
    },
    room_availibility: {
      type: [
        {
          room_type: String,
          rooms: [Number],
          no_guests: String,
          base_price: String,
        },
      ],
      default: [{ room_type: '', rooms: [], no_guests: '', base_price: '' }],
    },
    user_id: {
      type: String,
      required: true,
    },
    chargeble_service: {
      type: [String],
      default: ['housekeeping', 'spa'],
    },
    Amenities: {
      type: [
        {
          nameof_amenities: String,
          types: [String],
        },
      ],
      default: [{ nameof_amenities: 'general_amenities', types: [] }],
    },
    photos: {
      type: [
        {
          name: String,
          path: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const RoomModel = model<IRoom>('hotelRoomAvailivilitys', RoomSchema);

export default RoomModel;
