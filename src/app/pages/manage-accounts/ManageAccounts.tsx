import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChangePasswordForm,
  ChangeUsernameForm,
  MFAForm,
  MyInformation,
} from './components';
import { sideNavItems } from './constants';

function ManageAccountPage() {
  const navigate = useNavigate();
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="flex-grow container mx-auto p-4">
      <div className="flex space-x-4">
        <aside className="w-1/4 bg-white p-4 rounded shadow-md">
          <nav className="space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="py-2 font-semibold flex items-center text-lg text-gray-800 cursor-pointer"
            >
              <ArrowLeft className="mr-2" />
              Manage Account
            </button>
            {sideNavItems.map((item) => (
              <Link
                key={item.id}
                to={`#${item.to}`}
                data-testid={item['data-testId']}
                className="flex items-center text-[#535353] hover:text-blue-500"
                onClick={(e) => handleScroll(e, item.to)}
              >
                {item.iconComponent}{' '}
                <span className="ml-2">{item.displayText}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="w-3/4">
          <section
            id="my-information"
            className="w-[780px] h-auto mt-3 mr-[0] mb-8 ml-16 pt-6 px-8 pb-8 rounded-lg [box-shadow:0_1px_6.3px_0_rgba(0,_0,_0,_0.35)]"
          >
            <h2 className="text-xl font-semibold mb-4">My Information</h2>
            <MyInformation />
          </section>
          <section
            id="change-username"
            className="w-[780px] h-auto mt-3 mr-[0] mb-8 ml-16 pt-6 px-8 pb-8 rounded-lg [box-shadow:0_1px_6.3px_0_rgba(0,_0,_0,_0.35)] bg-[#fff]"
          >
            <h2 className="text-xl font-semibold mb-8">
              Select a username that is easy for you to remember
            </h2>
            <ChangeUsernameForm />
          </section>

          <section
            id="change-password"
            className="w-[780px] h-auto mt-3 mr-[0] mb-8 ml-16 pt-6 px-8 pb-8 rounded-lg [box-shadow:0_1px_6.3px_0_rgba(0,_0,_0,_0.35)] bg-[#fff]"
          >
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <ChangePasswordForm />
          </section>

          <section
            id="mfa"
            className="w-[780px] h-auto mt-3 mr-[0] mb-8 ml-16 pt-6 px-8 pb-8 rounded-lg [box-shadow:0_1px_6.3px_0_rgba(0,_0,_0,_0.35)] bg-[#fff]"
          >
            <h2 className="text-xl font-semibold mb-4">
              Multi-Factor Authentication
            </h2>
            <p className="mb-4">
              We have rolled out Multi-factor Authentication (MFA) for our users
              and now you have an extra layer of security when you login to your
              account using MFA. Click here to learn more about it.
            </p>
            <MFAForm />
          </section>
        </main>
      </div>
    </div>
  );
}
export default ManageAccountPage;
