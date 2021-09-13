import "./Empty.style.css";
import { NavLink } from "react-router-dom";

export const Empty = ({ component }) => {
  return (
    <div className="empty-page">
        <h1 className="empty-heading"> Your {component} is Empty! </h1>
        <div className="empty-page-btn"><NavLink to="/products" className="secondary-btn-1">
          Go to Products
        </NavLink></div>
    </div>
  );
};
