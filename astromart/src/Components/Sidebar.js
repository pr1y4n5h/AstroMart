import React from 'react';
import "../App.css"

export const Sidebar = () => {
    return (
        <>
          <aside>
          <fieldset>
            <legend className="sidebar-legend"> Sort by </legend>
            <span className="sidebar-heading" >Price</span>
            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="radio" name="price" /> Low to High
            </label>
            </div>
            <div className="sort-div">
            <label className="sidebar-label">
            <input type="radio" name="price" /> High to Low
            </label>
            </div>


            <span className="sidebar-heading" >Average Rating</span>
            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="radio" name="rating" /> Low to High
            </label>
            </div>
            <div className="sort-div">
            <label className="sidebar-label">
            <input type="radio" name="rating" /> High to Low
            </label>
            </div> 


          </fieldset>

          <fieldset>
            <legend className="sidebar-legend"> Filter </legend>
            <span className="sort-heading" >Price</span>
            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="radio" name="price" /> Low to High
            </label>
            </div>
            <div className="sort-div">
            <label className="sidebar-label">
            <input type="radio" name="price" /> High to Low
            </label>
            </div>
          </fieldset>


          
          </aside>  
        </>
    )
}
