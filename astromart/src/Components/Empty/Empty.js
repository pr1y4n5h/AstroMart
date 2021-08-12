import "./Empty.style.css";
import { NavLink } from "react-router-dom";

export const Empty = ({ component }) => {
  return (
    <div className="empty-page">
      <div className="empty-container">
        <h1> Your {component} is Empty! </h1>
        <span className="empty-page-btn"><NavLink to="/products" className="secondary-btn-1">
          Go to Products
        </NavLink></span>
      </div>
    </div>
  );
};
