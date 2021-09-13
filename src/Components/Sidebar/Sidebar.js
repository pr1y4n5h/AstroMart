import "./Sidebar.style.css";
import { useMainContext } from "../../Contexts/MainContext";

export const Sidebar = () => {
  const {
    sortBy,
    dispatchMain,
    showProducts,
    showDeluxe,
  } = useMainContext();

  return (
    <>
      <aside className="sidebar-aside">
      <div className="sidebar-wrapper">

        <fieldset className="sort-fieldset">
          <legend className="sidebar-legend"> Sort by </legend>

          <span className="sidebar-heading">Price</span>
          <div className="sort-div">
            <label className="sidebar-label">
              <input className="sidebar-label-input"
                type="radio"
                name="price"
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
                onChange={() =>
                  dispatchMain({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                }
              />
              Low to High
            </label>
          </div>
          <div className="sort-div">
            <label className="sidebar-label">
              <input className="sidebar-label-input"
                type="radio"
                name="price"
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
                onChange={() =>
                  dispatchMain({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                }
              />
              High to Low
            </label>
          </div>
        </fieldset>

        <fieldset className="filter-fieldset">
          <legend className="sidebar-legend"> Filter </legend>

          <span className="sidebar-heading">Availability</span>
          <div className="sort-div">
            <label className="sidebar-label">
              <input className="sidebar-label-input"
                type="checkbox"
                checked={showProducts}
                onChange={() => dispatchMain({ type: "TOGGLE_STOCK" })}
              />
              Include Out of Stock
            </label>
          </div>

          <span className="sidebar-heading">Delivery</span>
          <div className="sort-div">
            <label className="sidebar-label">
              <input className="sidebar-label-input"
                type="checkbox"
                checked={showDeluxe}
                onChange={() => dispatchMain({ type: "TOGGLE_DELUXE" })}
              />
              Deluxe
            </label>
          </div>
        </fieldset>
        </div>
      </aside>
    </>
  );
};
