import React from 'react';
import AdvertiseSection from './AdvertiseSection';
import ClothesCategories from './ClothesCategories';
import HomeBanner from './HomeBanner';
import HowItWorks from './HowItWorks';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home - eKapor</title>
            </Helmet>
            <HomeBanner></HomeBanner>
            <AdvertiseSection></AdvertiseSection>
            <ClothesCategories></ClothesCategories>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;