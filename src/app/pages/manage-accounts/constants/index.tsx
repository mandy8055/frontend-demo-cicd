import { CircleUser, Info, LockKeyholeOpen, Settings } from 'lucide-react';
import { generateUUID } from 'src/app/common/utils';
const sideNavItems = [
  {
    id: generateUUID(),
    iconComponent: <Info />,
    to: 'my-information',
    displayText: 'My Information',
    'data-testId': 'my-info',
  },
  {
    id: generateUUID(),
    iconComponent: <CircleUser />,
    to: 'change-username',
    displayText: 'Change Username',
    'data-testId': 'change-username',
  },
  {
    id: generateUUID(),
    iconComponent: <LockKeyholeOpen />,
    to: 'change-password',
    displayText: 'Change Password',
    'data-testId': 'change-password',
  },
  {
    id: generateUUID(),
    iconComponent: <Settings />,
    to: 'mfa',
    displayText: 'Multi-Factor Authentication',
    'data-testId': 'mfa-form',
  },
];

export { sideNavItems };
