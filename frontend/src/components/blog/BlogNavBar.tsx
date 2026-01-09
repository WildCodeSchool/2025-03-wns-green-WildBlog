import { Link } from "react-router-dom";

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { useBlog } from "../../hooks/useBlog";


export function BlogNavbar() {

  const { blog } = useBlog();

  return (
    <Navbar fluid rounded 
        className="fixed top-0 left-0 right-0 z-50 bg-white blog"
        >
        <NavbarBrand href={`/blog/${blog?.slug}`}>
          {blog?.logo && (
            <img src={blog.logo} className="mr-3 h-6 sm:h-9" alt={blog.name} />
          )}        
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{blog?.name}</span>
      </NavbarBrand>
      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}




  
  