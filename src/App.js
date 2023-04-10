import Webpages from './webpages';
import ScrollTopButton from './webpages/ScrollTopButton';
import { GuestHeader, UserHeader, AdminHeader } from './webpages/Header';
import Footer from './webpages/Footer';
import { useState, useEffect } from 'react';
import Sidebar from './webpages/Sidebar';
import Cookies from 'js-cookie';
import axios from 'axios';

axios.defaults.withCredentials = true;

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
    const [role, setUserType] = useState(Cookies.get('role') || '');

    useEffect(() => {
      const userTypeFromCookie = Cookies.get('role');
      setUserType(userTypeFromCookie || '');
    }, []);

    const headers = {
        '0': <UserHeader />,
        '1': <AdminHeader showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
    };    
  
    const Header = headers[role] || <GuestHeader />;

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            {Header}
            <div style={container}>
                {role === '1' && (
                    <div style={sticky}>
                        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
                    </div>
                )}
                <div style={content}>
                    <Webpages />
                    <ScrollTopButton />
                </div>
            </div>
            <div style={{marginTop: 'auto'}}><Footer /></div>
        </div>
    );
}