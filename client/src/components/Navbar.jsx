import { Link } from 'react-router-dom';
export default function Navbar(){ return <header className="nav"><Link className="brand" to="/"><span className="brand-mark">⌁</span><span>SMART LAND<small>planning intelligence</small></span></Link><div className="nav-note"><span className="status-dot"/> Decision support, not approval</div></header> }
