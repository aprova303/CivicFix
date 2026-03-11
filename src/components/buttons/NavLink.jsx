"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Destructure onClick from props
const NavLink = ({ href, children, onClick }) => {
    const path = usePathname();
    
    // Ensure the active logic handles the root "/" correctly
    const isActive = path === href || (href !== "/" && path.startsWith(href));

    return (
      <Link 
        className={`${isActive ? "text-primary font-bold" : "font-medium"}`} 
        href={href}
        onClick={onClick} // This is crucial for closing the mobile menu!
      >
        {children}
      </Link>
    );
};

export default NavLink;

// "use client"



// import Link from 'next/link';

// import { usePathname } from 'next/navigation';

// import React from 'react';



// const NavLink = ({ href, children }) => {

//     const path = usePathname()

//     return (

//       <Link className={`${path.startsWith(href) && "text-primary"} font-medium`} href={href}>{children}</Link>

//     );

// };



// export default NavLink;