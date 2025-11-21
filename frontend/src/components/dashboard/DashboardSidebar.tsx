// @see https://flowbite-react.com/docs/components/sidebar#multi-level-dropdown
"use client";

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { BiCategory } from "react-icons/bi";
import { HiOutlineChartPie, HiOutlineCog, HiOutlineHome, HiOutlineLogout, HiOutlineNewspaper, HiOutlineTag, HiOutlineUser} from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { MdOutlineImage } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useApolloClient } from "@apollo/client/react";
import { useAuth } from "../../hooks/useAuth";

export function DashboardSidebar() {

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const client = useApolloClient();

  const handleLogout = () => {
    logout(setUser, client);
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => location.pathname.startsWith(path);
  const sidebarItemClass = "cursor-pointer active ";
  const activeClass = (path: string) => isActive(path) ? "sidebar-item-active" : "";
  const openedLinkInDropDown = isActive("/admin/articles/mes-articles") || isActive("/admin/articles/creer");

  return (
      <Sidebar aria-label="Sidebar with multi-level dropdown example"
      className="w-60 dashboard-sidebar bg-wild-blue"
      >
      <div className="h-screen p-0 overflow-y-auto">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem 
              onClick={() => navigate("/admin/dashboard")}
              icon={HiOutlineHome}
              active={isActive("/admin/dashboard")}
              className={`${sidebarItemClass} ${activeClass("/admin/dashboard")}`}
              >
              Tableau de bord
            </SidebarItem>
              <SidebarCollapse 
                open={openedLinkInDropDown}
                icon={() => <HiOutlineNewspaper className="text-white" />}
                label="Mes articles" 
                className="text-sm text-white" >
              <SidebarItem  
                active={isActive("/admin/articles/mes-articles")}
                className={`${sidebarItemClass} ${activeClass("/admin/articles/mes-articles")}`}
                onClick={() => navigate("/admin/articles/mes-articles")}
                >
                  Tous mes articles
              </SidebarItem>
              <SidebarItem 
                active={isActive("/admin/articles/creer")}
                className={`${sidebarItemClass} ${activeClass("/admin/articles/creer")}`}
                onClick={() => navigate("/admin/articles/creer")}
                >
                  Créer un article
              </SidebarItem>
            </SidebarCollapse>
            <SidebarItem 
              icon={BiCategory }
              active={isActive("/admin/categories")}
              className={`${sidebarItemClass} ${activeClass("/admin/categories")}`}
              onClick={() => navigate("/admin/categories")}
            >
                Catégories
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineTag}
              active={isActive("/admin/tags")}
              className={`${sidebarItemClass} ${activeClass("/admin/tags")}`}
              onClick={() => navigate("/admin/tags")}             
              >
                Tags
            </SidebarItem>
            <SidebarItem 
              icon={MdOutlineImage}
              active={isActive("/admin/medias")}
              className={`${sidebarItemClass} ${activeClass("/admin/medias")}`}
              onClick={() => navigate("/admin/medias")}             
              >
                Médias
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineChatBubbleOvalLeftEllipsis}
              active={isActive("/admin/commentaires")}
              className={`${sidebarItemClass} ${activeClass("/admin/commentaires")}`}
              onClick={() => navigate("/admin/commentaires")}             
              >
                Commentaires
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineCog}
              active={isActive("/admin/parametres")}
              className={`${sidebarItemClass} ${activeClass("/admin/parametres")}`}
              onClick={() => navigate("/admin/parametres")}             
              >
                Paramètres
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineChartPie}
              active={isActive("/admin/statistiques")}
              className={`${sidebarItemClass} ${activeClass("/admin/statistiques")}`}
              onClick={() => navigate("/admin/statistiques")}             
              >
                Statistiques
            </SidebarItem>
            <SidebarItem 
              icon={HiOutlineUser}
              active={isActive("/admin/profil")}
              className={`${sidebarItemClass} ${activeClass("/admin/profil")}`}
              onClick={() => navigate("/admin/profil")}             
              >
                Profil
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
