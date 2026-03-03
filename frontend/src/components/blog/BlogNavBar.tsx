import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useBlog } from "../../hooks/useBlog";
import { useAuth } from "../../hooks/useAuth";

export function BlogNavbar() {
  const { blog } = useBlog();
  const { user } = useAuth();

  return (
    <Navbar
      fluid
      rounded
      className="fixed top-0 left-0 right-0 z-50 bg-white blog"
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          {blog?.logo && (
            <img src={blog.logo} className="mr-3 h-6 sm:h-9" alt={blog.name} />
          )}
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            {user ? `${user.firstName} ${user.lastName}` : "Invité"}
          </span>
        </div>
        <NavbarBrand
          href="/admin/profil"
          className="text-sm text-wild-blue hover:underline mt-1"
        >
          ← Retour au profil
        </NavbarBrand>
      </div>
      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
