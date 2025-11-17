// @see https://flowbite-react.com/docs/components/sidebar#multi-level-dropdown
"use client";

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { BiCategory } from "react-icons/bi";
import { HiOutlineChartPie, HiOutlineCog, HiOutlineHome, HiOutlineLogout, HiOutlineNewspaper, HiOutlineTag, HiOutlineUser} from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { MdOutlineImage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useApolloClient } from "@apollo/client/react";
import { useAuth } from "../../hooks/useAuth";

export function DashboardSidebar() {

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const client = useApolloClient();

  const handleLogout = () => {
    logout(setUser, client);
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => location.pathname.startsWith(path);
  const sidebarItemClass = "cursor-pointer active ";
  const activeClass = (path: string) => isActive(path) ? "sidebar-item-active" : "";


  return (
      <Sidebar aria-label="Sidebar with multi-level dropdown example"
      className="w-60 dashboard-sidebar bg-wild-blue"
      >
      <div className="h-screen p-0 overflow-y-auto">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem 
              icon={HiOutlineHome}
              active={isActive("/admin/dashboard")}
              className={`${sidebarItemClass} ${activeClass("/admin/dashboard")}`}
              >
              <Link to="/admin/dashboard">
                Tableau de bord
              </Link>
            </SidebarItem>
              <SidebarCollapse 
                icon={() => <HiOutlineNewspaper className="text-white" />}
                label="Mes articles" 
                className="text-sm text-white" >
              <SidebarItem  
                active={isActive("/admin/articles/mes-articles")}
                className={`${sidebarItemClass} ${activeClass("/admin/articles/mes-articles")}`}
                >
                <Link to="/admin/articles/mes-articles">
                  Tous mes articles
                </Link>              
              </SidebarItem>
              <SidebarItem 
                active={isActive("/admin/articles/creer")}
                className={`${sidebarItemClass} ${activeClass("/admin/articles/creer")}`}
                >
                <Link to="/admin/articles/creer">
                  Créer un article
                </Link>                 
              </SidebarItem>
            </SidebarCollapse>
            <SidebarItem 
              icon={BiCategory }
              active={isActive("/admin/categories")}
              className={`${sidebarItemClass} ${activeClass("/admin/categories")}`}
            >
              <Link to="/admin/categories">
                Catégories
              </Link>            
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineTag}
              active={isActive("/admin/tags")}
              className={`${sidebarItemClass} ${activeClass("/admin/tags")}`}
              >
              <Link to="/admin/tags">
                Tags
              </Link>              
            </SidebarItem>
            <SidebarItem 
              icon={MdOutlineImage}
              active={isActive("/admin/medias")}
              className={`${sidebarItemClass} ${activeClass("/admin/medias")}`}
              >
              <Link to="/admin/medias">
                Médias
              </Link>           
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineChatBubbleOvalLeftEllipsis}
              active={isActive("/admin/commentaires")}
              className={`${sidebarItemClass} ${activeClass("/admin/commentaires")}`}
              >
              <Link to="/admin/commentaires">
                Commentaires
              </Link> 
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineCog}
              active={isActive("/admin/parametres")}
              className={`${sidebarItemClass} ${activeClass("/admin/parametres")}`}
              >
              <Link to="/admin/parametres">
                Paramètres
              </Link>            
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineChartPie}
              active={isActive("/admin/statistiques")}
              className={`${sidebarItemClass} ${activeClass("/admin/statistiques")}`}
              >
              <Link to="/admin/statistiques">
                Statistiques
              </Link>           
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineUser}
              active={isActive("/admin/profil")}
              className={`${sidebarItemClass} ${activeClass("/admin/profil")}`}
              >
              <Link to="/admin/profil">
                Profil
              </Link>          
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineLogout}>
              <button onClick={handleLogout} className="w-full text-left">
                Déconnexion
              </button>
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </div>
    </Sidebar>
  );
}
