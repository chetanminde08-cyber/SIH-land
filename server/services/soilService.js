import axios from 'axios';

const endpoint = 'https://soilhealth4.dac.gov.in/';
async function governmentSoilLabs(state, district) {
  if (!process.env.SHC_API_TOKEN || !state) return { available: false, source: 'Government of India Soil Health Card API', confidence: 'Low', message: 'Official Soil Health Card access is not configured. Add an authorised SHC_API_TOKEN to enable live test-centre lookup.' };
  const query = `query GetTestCenters($state: String, $district: String) { getTestCenters(state: $state, district: $district) { id name address phone state district } }`;
  const { data } = await axios.post(endpoint, { query, variables: { state, district } }, { headers: { Authorization: `Bearer ${process.env.SHC_API_TOKEN}` }, timeout: 15000 });
  const labs = data?.data?.getTestCenters || [];
  return { available: true, source: 'Government of India Soil Health Card API', confidence: 'High', labs: labs.slice(0, 3), message: labs.length ? `${labs.length} government soil test centre(s) found.` : 'No matching government test centre was returned.' };
}
export async function getSoil(provided = {}, location = {}) {
  if (provided?.ph) return { ...provided, source: 'User-provided laboratory values', confidence: 'High', available: true };
  try { return await governmentSoilLabs(location.state, location.district); } catch { return { available: false, source: 'Government of India Soil Health Card API', confidence: 'Low', message: 'Official soil service is temporarily unavailable. No estimated soil values were used.' }; }
}
