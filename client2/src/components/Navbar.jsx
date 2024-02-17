import { useEffect } from "react";
import cn from 'classnames';

// styling
import { navbarCss } from "../styling/index.js";
import { ICON_BOX, ICON_CABLE } from "../assets/icons/index.js";

const Navbar = ({ collapseNavbar, handleNavbar, ptLanguage }) => {

    useEffect(() => {
    }, [collapseNavbar])

    return (
        <div className={cn(navbarCss.navbar, collapseNavbar ? navbarCss.collapsed : navbarCss.expanded)} >
            {collapseNavbar ?
                <>
                    {/* //TODO! VERIFICAR SE É O ATIVO */}
                    <div className={cn(navbarCss.element)} onClick={handleNavbar}>
                        <ICON_CABLE />
                    </div>
                    <div className={cn(navbarCss.element)} onClick={handleNavbar}>
                        <ICON_BOX />
                    </div>
                    
                    {/* <div className={cn(navbarCss.element)} onClick={handleNavbar}>
                        <ICON_COLLECTION />
                    </div> */}
                </>
                :
                <>
                    <div className={cn(navbarCss.textElement)}>
                        <span>{ptLanguage ? 'armazem' : 'storage' }</span>
                    </div>
                    <div className={cn(navbarCss.textElement)}>
                    <span>{ptLanguage ? 'pedidos' : 'requirements' }</span>
                    </div>
                    {/* <div className={cn(navbarCss.textElement)} >
                        <span>{ptLanguage ? 'Reservas' : 'Reserves'}</span>
                    </div> */}
                </>
            }

        </div>
    )

}

export default Navbar;