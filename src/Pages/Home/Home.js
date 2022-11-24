import React from 'react';
import ClothesCategories from './ClothesCategories';
import HomeBanner from './HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <ClothesCategories></ClothesCategories>
        </div>
    );
};

export default Home;