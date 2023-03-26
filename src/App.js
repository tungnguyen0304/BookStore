import Webpages from './webpages';
import ScrollTopButton from './webpages/ScrollTopButton';
import Header from './webpages/Header';
import Footer from './webpages/Footer';

export default function App() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header/>
            <div style={{padding: '10px'}}>
                <Webpages />
                <ScrollTopButton />
            </div>
            <div style={{marginTop: 'auto'}}><Footer /></div>
        </div>
    );
}