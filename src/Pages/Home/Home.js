import React from 'react';
import AdvertiseSection from './AdvertiseSection';
import ClothesCategories from './ClothesCategories';
import HomeBanner from './HomeBanner';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <AdvertiseSection></AdvertiseSection>
            <ClothesCategories></ClothesCategories>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;