import React from "react";


const ResultModal = ({result, closeModal}) => {
    return (
        <div className="resultModal">
            <span>Result: {result}</span>
            <button className="modalBtn" onClick={closeModal}>Close</button>
        </div>
    )
}

export default ResultModal