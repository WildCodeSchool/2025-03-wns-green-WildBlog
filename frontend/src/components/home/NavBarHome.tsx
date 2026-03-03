import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function NavBarHome() {
  const navigate = useNavigate();

  return (
    <Navbar className="bg-white! border-b border-gray-200">
      <span className=" m-10 text-xl font-bold text-center ml:text-center text-wild-blue">
        WildBlog
      </span>
      <div className="flex md:order-2 gap-2 ml-0 md:ml-auto justify-between w-full md:w-auto">
        <Button
          className="bg-wild-orange! ms-10 ml-5"
          onClick={() => navigate("/signup")}
        >
          Créer mon blog
        </Button>
        <NavbarToggle className="h-10 w-2.5 mr-3" />
      </div>
      <NavbarCollapse>
        <NavbarLink href="landingPage" active>
          Accueil
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
