import { useState, useEffect } from "react";
import cn from 'classnames';

// assets
import { ICON_HAMBURGUER_MENU, ICON_UA_LOGO, ICON_SEARCH } from "../assets/icons/index.js";

// styling
import { headerCss } from "../styling/index.js";

const Header = ({ ptLanguage, handleLanguage, handleNavbar }) => {

    return (
        <div className={cn(headerCss.header)}>
            <div className={cn(headerCss.leftSide)}>
                <div className={cn(headerCss.hamburguerMenu)} onClick={handleNavbar} >
                    <ICON_HAMBURGUER_MENU className={cn(headerCss.hamburguerMenu)} />
                </div>
                <ICON_UA_LOGO className={cn(headerCss.logoUA)} />
                <span className={cn(headerCss.peci)}>peci</span>
            </div>
            <div className={cn(headerCss.rightSide)}>
                <div className={cn(headerCss.language)} onClick={handleLanguage} >
                    {ptLanguage ? "EN" : "PT"}
                </div>
                <div className={cn(headerCss.search)}>
                <ICON_SEARCH />
                </div>
            </div>
        </div>
    )

}

export default Header;