import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/app/common/hooks';
import { Button } from 'src/app/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/app/components/ui/popover';
import { logoutUser } from 'src/app/store/slices/authSlice';
import DownCaret from '../../../../assets/down_caret.svg?react';
import HeaderLogo from '../../../../assets/header_logo.jpg';
import HelpIcon from '../../../../assets/help_icon.svg?react';
import SettingsIcon from '../../../../assets/settings_icon.svg?react';
import TeamIcon from '../../../../assets/teams_icon.svg?react';
import { Image } from '../../atoms/Image';

export const profileData = [
  {
    linkName: 'Manage Account',
    linkTo: '/manage-account',
    comp: <SettingsIcon />,
  },
  {
    linkName: 'My Team',
    linkTo: '/my-team',
    comp: <TeamIcon />,
  },
  {
    linkName: 'Help',
    linkTo: '/help',
    comp: <HelpIcon />,
  },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const [popOverState, setPopOverState] = useState(false);

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="bg-white h-16 border-b-[1px] border-[#e8ebf0] flex items-center">
      <div className="flex justify-between w-[90%] mx-auto">
        <div className="w-min-content flex items-center">
          <Image
            src={HeaderLogo}
            fallback={HeaderLogo}
            type="image/jpeg"
            alt="BA header logo"
          />
        </div>
        <div className="flex gap-8 items-center">
          <Popover open={popOverState} onOpenChange={setPopOverState}>
            <PopoverTrigger>
              <span className="flex items-center gap-x-2">
                <span className="text-sm text-[#1e1e1e]">My Profile</span>
                <DownCaret />
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-[226px] rounded-[14px] p-0 relative right-1/4 background-[#fff]">
              {profileData.map((item) => (
                <div
                  className="border-b-[1px] p-0 pl-5 py-5"
                  key={item.linkName}
                >
                  <Link
                    onClick={() => setPopOverState(false)}
                    className="flex flex-start items-center gap-x-3"
                    to={item.linkTo}
                  >
                    {item.comp}
                    <span className="text-sm text-[#535353]">
                      {item.linkName}
                    </span>
                  </Link>
                </div>
              ))}
            </PopoverContent>
          </Popover>
          <Button
            className="border-black text-xs font-bold"
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
}
