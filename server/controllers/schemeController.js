import { getSchemes } from '../services/schemeService.js'; export async function listSchemes(_,res) { res.json(await getSchemes([{use:'Solar Farm'},{use:'Agriculture'}])); }
