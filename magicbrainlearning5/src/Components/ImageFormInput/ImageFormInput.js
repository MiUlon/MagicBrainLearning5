import React from 'react';
import './ImageFormInput.css';

const ImageFormInput = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3 center imageFormInputDesign'>{'Magic Brain will detect face in your picture. Give it a try!!!'}</p>
            <div>
                <div className='center pa4 br3 shadow-5 imageFormInputMaxWidth'>
                    <input className='f4 pa2 w-70 center br3' type='text' onChange={onInputChange}></input>
                    <button className='w-30 grow f4 link ph3 pv2 dib white imageFormInputBackground br3' onClick={onButtonSubmit}>Detect!</button>
                </div>
            </div>
        </div>
    )
}

export default ImageFormInput;