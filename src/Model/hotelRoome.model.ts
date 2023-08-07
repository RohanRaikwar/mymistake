import { required } from 'joi';
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
      ]
     
    },
    user_id: {
      type: String,
      required: true,
    },
    chargeble_service: {
      type: [String],
     
    },
    Amenities: [{
      nameof_amenities: {
        type:String,
        required:true
      },

      types: {
        type:[String],
        required:true
      }
    
    }],
    photos: {
      type: [
        {
          name: String,
          path: String,
        },
      ],
     
    },
  },
  {
    timestamps: true,
  }
);

const RoomModel = model<IRoom>('hotelRoomAvailivilitys', RoomSchema);

export default RoomModel;
