import React from 'react';
import AdvertiseSection from './AdvertiseSection';
import ClothesCategories from './ClothesCategories';
import HomeBanner from './HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <AdvertiseSection></AdvertiseSection>
            <ClothesCategories></ClothesCategories>
        </div>
    );
};

export default Home;