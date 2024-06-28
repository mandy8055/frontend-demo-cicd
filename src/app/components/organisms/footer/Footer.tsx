import FooterLogoJPG from '../../../../assets/footer_logo.jpg';
import FooterLogoWebP from '../../../../assets/footer_logo.webp';
import { Image } from '../../atoms/Image';
import { Button } from '../../ui/button';

export default function Footer() {
  const links = [
    { name: 'About Us', url: '#', isActive: true },
    { name: 'Privacy Policy', url: '#', isActive: false },
    { name: 'Contact Us', url: '#', isActive: false },
    { name: 'Terms of Use', url: '#', isActive: false },
    { name: 'Disclosures', url: '#', isActive: false },
    { name: 'Help', url: '#', isActive: false },
    { name: 'FAQs', url: '#', isActive: false },
  ];
  return (
    <footer className="bottom-0 w-full bg-[#fff] h-[198px] border-t-8 border-[#eaeaea] mt-2">
      <div className="flex justify-between w-[90%] mx-auto py-10">
        <div className="flex items-center">
          <Image src={FooterLogoWebP} fallback={FooterLogoJPG} alt="BA Logo" />
        </div>
        <nav className="flex justify-between w-[50%] items-center">
          {links.map((link) => (
            <Button
              key={link.name}
              className={`text-sm px-0 ${
                link.isActive ? 'font-bold' : 'font-normal'
              }`}
              variant="link"
              size="sm"
            >
              {link.name}
            </Button>
          ))}
        </nav>
      </div>
      <div className="border-t-[1px] border-[#e8ebf0] flex items-center justify-center pt-6 pb-8">
        <p className="text-center text-[#aaa] text-base">
          ©2024 Brown Advisory Incorporated. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
