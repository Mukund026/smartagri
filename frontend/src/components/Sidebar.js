import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { menuByRole } from '../data/menuConfig';

const Sidebar = () => {
  const { userRole } = useContext(AuthContext);
  const menuItems = menuByRole[userRole] || [];

  return (
    <nav className="sidebar">
      <ul>
        {menuItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
