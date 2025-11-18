
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarToggle,
  } from "flowbite-react";
import { HiChevronDown } from "react-icons/hi";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

interface DashboardNavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function DashboardNavbar({ sidebarOpen, onToggleSidebar }: DashboardNavbarProps) {

  const { user } = useAuth();

  return (
    <Navbar className="bg-transparent px-4">
      <div className={sidebarOpen ? "toggle-hidden" : ""}>
        <NavbarToggle onClick={onToggleSidebar} />
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-medium btn-blog"
        >
          Aller sur mon blog
          <HiOutlineArrowTopRightOnSquare className="w-5 h-5" />
        </a>

        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
                alt="utilisateur connecté"
              />
              <span className="hidden md:inline text-sm">{user?.firstName} { user?.lastName}</span>
              <HiChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user?.firstName} { user?.lastName}</span>
            <span className="block truncate text-sm font-medium">{user?.email} </span>
          </DropdownHeader>
          <DropdownItem>
            <Link to="/admin/profil">
              Mon profil
            </Link>              </DropdownItem>
          <DropdownDivider />
          <DropdownItem>
            Déconnexion
          </DropdownItem>
        </Dropdown>
      </div>
    </Navbar>
  );
}


  
  