import React from 'react';
import Component3 from './Component3';

const Component2 = () => {
    return (
      <>
        <div style={{padding: "20px", border: "2px solid black"}}>
            <h3>Component 2</h3>
            <Component3 />
        </div>
      </>
    );
};

export default Component2;