import Webpages from './webpages';
import ScrollTopButton from './webpages/ScrollTopButton';
import Header from './webpages/Header';

export default function App() {
    return (
        <>
            <Header cartCount={3} handleLogout={() => {}}/>
            <Webpages />
            <ScrollTopButton />
        </>
    );
}