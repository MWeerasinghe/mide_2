import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineBook, AiOutlineSetting } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "<<" : ">>"}
      </button>
      <div className="menu-items">
        <NavLink to="/" className="menu-item">
          <AiOutlineHome className="icon" />
          {isExpanded && <span>Home</span>}
        </NavLink>
        <NavLink to="/assignments" className="menu-item">
          <AiOutlineBook className="icon" />
          {isExpanded && <span>Assignments</span>}
        </NavLink>
        <NavLink to="/settings" className="menu-item">
          <AiOutlineSetting className="icon" />
          {isExpanded && <span>Settings</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
