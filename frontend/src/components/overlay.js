import React from "react";
import { PacmanLoader } from 'react-spinners'

const Overlay = ({loading}) => {

    return (
        <div className="overlay">
            <PacmanLoader loading={loading} color="gray"></PacmanLoader>
        </div>
    )
}

export default Overlay