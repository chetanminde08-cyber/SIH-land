import mongoose from 'mongoose';
const LandAnalysis = mongoose.model('LandAnalysis', new mongoose.Schema({ land: { type: mongoose.Schema.Types.ObjectId, ref: 'Land' }, data: Object, recommendations: Array, confidence: Object }, { timestamps: true }));
export default LandAnalysis;
