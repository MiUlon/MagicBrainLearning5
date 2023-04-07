import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='f3 white center'>
                {`${name}, your current entries count:`}
            </div>
            <div className='f1 white center rankRemovingEmptySpaceAbove'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;