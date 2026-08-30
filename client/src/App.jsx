import { Routes, Route } from 'react-router-dom'; import HomePage from './pages/HomePage.jsx'; import LandMapPage from './pages/LandMapPage.jsx'; import ReportPage from './pages/ReportPage.jsx';
export default function App(){ return <Routes><Route path="/" element={<HomePage/>}/><Route path="/select" element={<LandMapPage/>}/><Route path="/report" element={<ReportPage/>}/></Routes>; }
