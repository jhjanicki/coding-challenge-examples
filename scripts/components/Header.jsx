import React from 'react';
import PropTypes from 'prop-types';

const Header = props =>{
  return(
    <header className={props.headerClass}>
        <div className="logo-row">
            <span>
              <div className={props.logoClass}></div>
            </span>
        </div>
        <div className="scroll" >
            <nav className={`nav ${props.scrolled?"none":"block"}`}>
                <a className="link" href="#">Scroll Down </a>
            </nav>
        </div>
    </header>
  )
}

Header.propTypes = {
  headerClass: PropTypes.string,
  logoClass: PropTypes.string

}

export default Header;
