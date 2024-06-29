import {
  BarChartBig,
  BriefcaseBusiness,
  Files,
  LogOut,
  LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/app/common/hooks';
import { updatePortfolio } from 'src/app/store/slices/portfolioSlice';
import { useGetPortfoliosQuery } from 'src/app/store/slices/updatedPortfolioSlice';
import { cn } from 'src/lib/utils';
import './styles.css';

type navItemsType = {
  name: string;
  Icon: LucideIcon;
};
type SidebarProps = {
  sideNavExpanded: boolean;
  closeSideNav: () => void;
};
export const navItems: navItemsType[] = [
  {
    name: 'Portfolio',
    Icon: BriefcaseBusiness,
  },
  {
    name: 'Documents',
    Icon: Files,
  },
  {
    name: 'My Team',
    Icon: BarChartBig,
  },
  {
    name: 'Logout',
    Icon: LogOut,
  },
];

export const portfolios: { name: string; portfolioId: number }[] = [
  { name: 'Flexible Equity Account', portfolioId: 83074 },
  { name: 'FI Account', portfolioId: 83077 },
  { name: 'Alternatives Account', portfolioId: 83078 },
];

const getNavItemId = (prefix: string) => {
  return `${prefix}_li`;
};

const SubMenu = (
  <ul className="portfolio-list space-y-4 max-h-28 overflow-y-auto">
    {portfolios.map((portfolio) => (
      <li
        key={portfolio.portfolioId}
        className="hover:text-[#0089FF] text-xs"
        data-value={portfolio.portfolioId}
      >
        {portfolio.name}
      </li>
    ))}
  </ul>
);

export default function Sidebar(props: SidebarProps) {
  const { sideNavExpanded, closeSideNav } = props;
  const queryResult = useGetPortfoliosQuery();
  const dispatch = useAppDispatch();
  const [showPortfolios, setShowPortfolios] = useState(false);
  const navItemClickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    if (sideNavExpanded) {
      e.stopPropagation();
    }
    if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
      if (e.target.closest(`#${getNavItemId('Portfolio')}`)) {
        setShowPortfolios((prev) => !prev);
      }
      if (e.target.closest(`#${getNavItemId('Logout')}`)) {
        closeSideNav();
      }
    }
  };

  const subItemClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target instanceof HTMLLIElement) {
      e.preventDefault();
      e.stopPropagation();
      const portfolioId = e.target.getAttribute('data-value');
      if (portfolioId) {
        dispatch(updatePortfolio({ selectedPortfolio: [+portfolioId] }));
      }
    }
  };

  const NavItem: React.FC<navItemsType> = (props) => {
    const { name, Icon } = props;
    const baseClass = 'flex items-start';
    const gapClass = sideNavExpanded ? 'gap-4 ml-6' : 'gap-0 justify-center';
    const isPortfolioItem = name === 'Portfolio';
    const shouldShowSubMenu =
      isPortfolioItem && showPortfolios && sideNavExpanded;
    return (
      <li id={getNavItemId(name)}>
        <Link to="#">
          <div className={cn(baseClass, gapClass)}>
            <div>{<Icon size={20} />}</div>
            {sideNavExpanded && (
              <div className="flex flex-col">
                {name}
                {shouldShowSubMenu && (
                  <div onClick={subItemClickHandler} className="mt-4">
                    {SubMenu}
                  </div>
                )}
              </div>
            )}
          </div>
        </Link>
        {/* {shouldShowSubMenu && <div className="mt-2">{SubMenu}</div>} */}
      </li>
    );
  };
  return (
    <aside className="max-w-64 h-full" aria-label="Sidebar">
      <div className="pt-14 bg-[#163963] rounded-r-lg h-full text-base text-white">
        <ul className="space-y-14" onClick={navItemClickHandler}>
          {navItems.map((item) => (
            <NavItem key={item.name} name={item.name} Icon={item.Icon} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
