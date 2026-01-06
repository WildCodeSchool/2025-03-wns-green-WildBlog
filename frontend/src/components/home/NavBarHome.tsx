import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import img from "../../assets/WildBlog2.png";
import { useNavigate } from "react-router-dom";


export function NavBarHome() {

  const navigate = useNavigate();

  return (
    <Navbar className="!bg-white border-b border-gray-200">
            <img src={img} className="mr-10 h-50 sm:h-50" alt="Logo" />
            <span className=" m-10 text-xl font-bold text-center ml:text-center text-[#0034AE]">WildBlog</span>
          <div className="flex md:order-2 gap-2 ml-0 md:ml-auto justify-between w-full md:w-auto">
            <Button className="!bg-wild-orange ms-10 ml-5" 
            onClick={() => navigate("/signup")}>
              Créer mon blog</Button>
            <NavbarToggle className="h-10 w-2.5 mr-3" />
          </div>
          <NavbarCollapse>
            <NavbarLink href="landingPage" active>
              Accueil
            </NavbarLink>
            <NavbarLink href="landingPage">Produits</NavbarLink>
            <NavbarLink href="landingPage">Fonctionnalités</NavbarLink>
          </NavbarCollapse>
        </Navbar>)
        }