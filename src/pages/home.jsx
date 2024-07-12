import React from 'react';
import {Block, Link, Navbar, NavTitle, NavTitleLarge, Page, Toolbar,} from 'framework7-react';
import Map from "@/components/Map";

const HomePage = () => (
    <Page name="home">
        <Map/>
    </Page>
);
export default HomePage;