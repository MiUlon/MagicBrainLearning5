import React from 'react';
import './DetectFace.css';

const DetectFace = ({ linkURL, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={linkURL} width='500'></img>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default DetectFace;