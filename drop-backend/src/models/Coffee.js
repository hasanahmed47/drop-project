import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema(
  {
    calories: Number,
    caffeine: Number,
    sugar: Number,
  },
  { _id: false }
);

const coffeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Espresso Based', 'Cold Brew', 'Specialty', 'Seasonal'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    roast: String,
    origin: String,
    strength: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    milkOptions: {
      type: [String],
      default: ['None'],
    },
    description: String,
    notes: [String],
    nutrition: nutritionSchema,
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
