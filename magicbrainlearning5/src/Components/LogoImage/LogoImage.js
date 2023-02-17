import React from 'react';
import magicBrain from './magicBrain.png';
import Tilt from 'react-parallax-tilt';
import './LogoImage.css';

const LogoImage = () => {
    return (
        <div className='grow' style={{ height: '150px', width: '150px'}}>
            <Tilt className='ma4 mt0 pa2 br2 shadow-2 logoImageBackground' style={{ height: '150px', width: '150px'}}>
                <div style={{ height: '150px', width: '150px'}}>
                    <img alt='Magic Brain' src={magicBrain} height='130px' width='130px' ></img>
                </div>
            </Tilt>
        </div>
    )
}

export default LogoImage;