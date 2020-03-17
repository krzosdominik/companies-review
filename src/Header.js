import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
            <div className="container">
                <Link to="/" className="navbar-brand" >COMPANIES REVIEW</Link>
            </div>
        </nav>
    );
}

export default Header;