import React from 'react';
import classes from './Logo.css'
import buggerLogo from '../../assests/Images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={buggerLogo} alt="MyBurger" />
    </div>
)

export default logo;