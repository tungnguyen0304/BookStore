import Webpages from './webpages';
import ScrollTopButton from './webpages/ScrollTopButton';
import { GuestHeader, UserHeader, AdminHeader } from './webpages/Header';
import Footer from './webpages/Footer';
import { useState } from 'react';
import Sidebar from './webpages/Sidebar';

const container = {
    display: "flex",
    flexDirection: "row",
}
const sticky = {
    position: "sticky",
    top: 0,
    height: "100vh",
    zIndex: 1,
}
const content = {
    padding: '10px',
    flex: 1
}

export default function App() {
    const [showSideBar, setShowSideBar] = useState()

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <AdminHeader showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
            {/* <GuestHeader/> */}
            <div style={container}>
                <div style={sticky}>
                    <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
                </div>
                <div style={content}>
                    <Webpages />
                    <ScrollTopButton />
                </div>
            </div>
            <div style={{marginTop: 'auto'}}><Footer /></div>
        </div>
    );
}