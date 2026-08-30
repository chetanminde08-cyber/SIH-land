import mongoose from 'mongoose';
const Land = mongoose.model('Land', new mongoose.Schema({ geometry: Object, areaHectares: Number, centroid: [Number], location: Object, currentUse: String, water: String, soil: Object }, { timestamps: true }));
export default Land;
