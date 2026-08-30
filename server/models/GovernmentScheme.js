import mongoose from 'mongoose';
const GovernmentScheme = mongoose.model('GovernmentScheme', new mongoose.Schema({ name: String, description: String, state: String, uses: [String], eligibility: String, benefits: String, source: String, url: String }));
export default GovernmentScheme;
