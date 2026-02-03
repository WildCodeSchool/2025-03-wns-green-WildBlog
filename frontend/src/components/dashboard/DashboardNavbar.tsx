
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarToggle,
  } from "flowbite-react";
import { HiChevronDown, HiOutlineLogout } from "react-icons/hi";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useApolloClient } from "@apollo/client/react";

interface DashboardNavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function DashboardNavbar({ sidebarOpen, onToggleSidebar }: DashboardNavbarProps) {

  const { user, setUser, blog } = useAuth();
  const navigate = useNavigate();
  const client = useApolloClient();

  const blogSlug = blog?.slug;
  
  const handleLogout = () => {
    logout(setUser, client);
    navigate("/login", { replace: true });
  };

  return (
    <Navbar className="bg-transparent px-4">
      <div className={sidebarOpen ? "toggle-hidden" : ""}>
        <NavbarToggle onClick={onToggleSidebar} />
      </div>

      <div>
        {blog?.name}
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <a
          href={blogSlug ? `/blog/${blogSlug}` : undefined}
          className={`flex items-center gap-1 text-sm font-medium btn-blog ${
            !blogSlug ? "opacity-50 pointer-events-none" : ""
          }`}
          target="_blank"
          rel="noopener noreferrer"
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
              </Link>              
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem
              icon={HiOutlineLogout}
              onClick={handleLogout}
            >
              Déconnexion
            </DropdownItem>
          </Dropdown>
        </div>
    </Navbar>
  );
}


  
  