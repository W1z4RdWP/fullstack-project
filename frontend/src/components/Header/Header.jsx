import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = () => {
    const date = new Date()
    const [time, setTime] = useState(date.toLocaleTimeString());

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString());
        };

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [])


    return (
        <header className="header">
            <div className="header-top">
                <p>EPICSITE</p>
                <p>It's now: <span className='header__timer'>{time}</span></p>
            </div>
            <Navbar />
            <hr style={{width: '100%', height: '1px', backgroundColor: 'red'}}/>
        </header>
    )
}

export default Header;