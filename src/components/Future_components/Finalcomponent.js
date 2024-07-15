import React, { useContext } from "react";
import { UserContext } from '../../pages/Other/Future';

const Finalcomponent = () => {
    const count_seconds = useContext(UserContext);

    return (
      <>
        <div style={{padding: "20px", border: "2px solid black"}}>
            <h6>There is {count_seconds} seconds, too!</h6>
        </div>
      </>
    );
}

export default Finalcomponent;