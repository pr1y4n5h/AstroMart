import React from 'react'
import "../App.css"

export const Empty = ({component}) => {
    return (
        <div className="empty-container">
            <h1> Your {component} is Empty </h1>
            <button className="secondary-btn-1"> Start Adding </button>
        </div>
    )
}
