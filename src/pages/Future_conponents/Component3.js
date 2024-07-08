import React from 'react';
import Component4 from './Component4';

const Component3 = () => {
    return (
      <>
        <div style={{padding: "20px", border: "2px solid black"}}>
            <h4>Component 3</h4>
            <Component4 />
        </div>
      </>
    );
};

export default Component3;