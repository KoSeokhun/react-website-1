import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BottomNavbar.css';

function BottomNavbar() {
    const [click, setClick] = useState(1);
    console.log(click);

    const clickedButton = (id) => setClick(id);

    return (
        <>
            <nav className='bottom-navbar'>
                <div className='bottom-navbar-container'>
                    <ul className={click ? 'bottom-nav-menu active' : 'bottom-nav-menu'}>
                        <li className='bottom-nav-item'>
                            <Link to='/' className='bottom-nav-links' onClick={() => { clickedButton('1'); }}>
                                <i className="fa-solid fa-house" />
                            </Link>
                        </li>
                        <li className='bottom-nav-item'>
                            <Link to='/community' className='bottom-nav-links' onClick={() => { clickedButton('2'); }}>
                                <i className="fa-solid fa-people-group" />
                            </Link>
                        </li>
                        <li className='bottom-nav-item'>
                            <Link to='/wtg' className='bottom-nav-links' onClick={() => { clickedButton('3'); }}>
                                <i className="fa-solid fa-wifi" />&nbsp;<i className="fa-solid fa-bicycle" />&nbsp;<i className="fa-solid fa-building" />
                            </Link>
                        </li>
                        {/* 추가 */}
                        <li className='bottom-nav-item'>
                            <Link to='/store' className='bottom-nav-links' onClick={() => { clickedButton('4'); }}>
                                <i className="fa-solid fa-store" />
                            </Link>
                        </li>
                        <li className='bottom-nav-item'>
                            <Link to='/profile' className='bottom-nav-links' onClick={() => { clickedButton('5'); }}>
                                <i className="fa-solid fa-user" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default BottomNavbar;