import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export function FooterHome() {
  return (
    <Footer className="flex w-full flex-col items-center justify-center gap-4 py-5 bg-white! border-t border-gray-200 text-wild-blue">
      <FooterLinkGroup className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <FooterLink href="#" className="text-center">
          Aide
        </FooterLink>
        <FooterLink href="#" className="text-center">
          Communauté
        </FooterLink>
        <FooterLink href="#" className="text-center">
          WildBlogger
        </FooterLink>
      </FooterLinkGroup>
      <FooterCopyright
        href="#"
        by="WildCodeSchool™"
        year={2025}
        className="text-center"
      />
    </Footer>
  );
}
