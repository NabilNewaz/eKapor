import React from 'react';

const HomeSlider = () => {
    return (
        <div className='px-2 mt-1 md:mt-2'>
            <div className="carousel w-full rounded-box">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://today.umd.edu/uploads/hero/Clothing1.gif" className="w-full" alt='' />
                </div>
            </div>
        </div>
    );
};

export default HomeSlider;