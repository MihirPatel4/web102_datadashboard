import { Outlet, Link } from 'react-router';

const Nav = () => {
  return (
    <div>
        <nav>
          <h3 id="title">🔍 Brewery Finder</h3>
          <ul className="links">
            <li className="nav-item"><Link className="dash-button" to="/">Dashboard</Link></li>
          </ul>
        </nav>
        <Outlet />
    </div>
  ); 
};

export default Nav;