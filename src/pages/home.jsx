import React from 'react';
import {Page} from 'framework7-react';
import Map from '@/components/Map';
import '../css/home.css';

const HomePage = () => (
    <Page name="home">
        <Map/>
    </Page>
);

export default HomePage;