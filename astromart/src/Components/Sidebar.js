import React, { useReducer } from 'react';
import "../App.css";
import { useMainContext } from "../Contexts/MainContext"

export const Sidebar = () => {

  const { sortBy, dispatchMain, showProducts, showDeluxe, showClothing, showBooks, showGadgets, showJewellery, showOthers } = useMainContext();

    return (
        <>
          <aside>

          <fieldset className="sort-fieldset">
            <legend className="sidebar-legend"> Sort by </legend>

            <span className="sidebar-heading" >Price</span>
            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="radio" name="price" checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"} onChange={() => dispatchMain({type: "SORT", payload: "PRICE_LOW_TO_HIGH" }) } /> Low to High
            </label>
            </div>
            <div className="sort-div">
            <label className="sidebar-label">
            <input type="radio" name="price" checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"} onChange={() => dispatchMain({type: "SORT", payload: "PRICE_HIGH_TO_LOW" }) } /> High to Low
            </label>
            </div>

            


            {/* <span className="sidebar-heading" >Price</span>
            <div className="sort-div"> 
            <select className="sidebar-smh" input="text" >
              <option selected={sortBy && sortBy === "PRICE_LOW_TO_HIGH"} onChange={() => dispatchMain({type: "SORT", payload: "PRICE_LOW_TO_HIGH" })} > Low to High </option>
              <option selected={sortBy && sortBy === "PRICE_HIGH_TO_LOW"} onChange={() => dispatchMain({type: "SORT", payload: "PRICE_HIGH_TO_LOW" })} > High to Low </option>
            </select>
            </div>  */}
          </fieldset>

          <fieldset className="filter-fieldset">
            <legend className="sidebar-legend"> Filter </legend>
            <span className="sidebar-heading" >Category</span>

            {/* <label for="points">Points (between 0 and 10):</label>
<input type="range" id="points" name="points" min="0" max="10"></input> */}

            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="checkbox" checked={showClothing} onChange={() => dispatchMain({type: "TOGGLE_CLOTHING"}) } /> Clothing
            </label>
            </div>

            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="checkbox" checked={showBooks} onChange={() => dispatchMain({type: "TOGGLE_BOOKS"}) } /> Books
            </label>
            </div>

            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="checkbox" checked={showGadgets} onChange={() => dispatchMain({type: "TOGGLE_GADGETS"}) } /> Gadgets
            </label>
            </div>

            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="checkbox" checked={showJewellery} onChange={() => dispatchMain({type: "TOGGLE_JEWELLERY"}) }  /> Jewellery
            </label>
            </div>

            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="checkbox" checked={showOthers} onChange={() => dispatchMain({type: "TOGGLE_OTHERS"}) } /> Others
            </label>
            </div>


            <span className="sidebar-heading" >Availability</span>
            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="checkbox" checked={showProducts} onChange={() => dispatchMain({type: "TOGGLE_STOCK"}) } /> Include Out of Stock
            </label>
            </div>

            <span className="sidebar-heading" >Delivery</span>
            <div className="sort-div"> 
            <label className="sidebar-label">
            <input type="checkbox" checked={showDeluxe} onChange={() => dispatchMain({type: "TOGGLE_DELUXE"}) } /> Deluxe
            </label>
            </div>

          </fieldset>


          
          </aside>  
        </>
    )
}
