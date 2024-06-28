import { Mail, MessageSquareText, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { BROWN_MAIL, CONTACT_US_CONTENT } from 'src/app/common/constants';
import { Button } from 'src/app/components/ui/button';
import { Switch } from 'src/app/components/ui/switch';

function MFAForm() {
  const [switchState, setSwitchState] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('email');

  const handleSwitchChange = (state: boolean) => {
    setSwitchState(state);
    if (!state) {
      setSelectedMethod('email');
    }
  };

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <form>
      <label className="flex items-center justify-between">
        <span className="mx-2 font-bold">
          Would you like to setup this feature for your account?
        </span>
        <Switch
          role="checkbox"
          className="data-[state=checked]:bg-[#0076be]"
          checked={switchState}
          onCheckedChange={() => handleSwitchChange(!switchState)}
        />
      </label>
      {switchState && (
        <>
          <div className="border-t my-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 flex space-x-2">
              <div className="flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mb-2">
                  <Mail className="text-blue-600" />
                </div>
                <h2 className="font-bold">Email Authentication</h2>
                <p>Get verification codes over email for every login.</p>
              </div>
              <input
                type="radio"
                name="authentication"
                data-testid="email-authentication"
                className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
                onChange={() => handleMethodChange('email')}
                checked={selectedMethod === 'email'}
              />
            </div>

            <div className="border rounded-lg p-4 flex space-x-2">
              <div className="flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mb-2">
                  <MessageSquareText className="text-blue-600" />
                </div>
                <p className="font-bold">SMS Authentication</p>
                <p>
                  Get verification codes as sms on your number for every login.
                </p>
              </div>
              <input
                type="radio"
                name="authentication"
                data-testid="sms-authentication"
                className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
                onChange={() => handleMethodChange('sms')}
                checked={selectedMethod === 'sms'}
              />
            </div>

            <div className="border rounded-lg p-4 flex space-x-2">
              <div className="flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mb-2">
                  <ShieldCheck className="text-blue-600" />
                </div>
                <p className="font-bold">App Authentication</p>
                <p>
                  Get verification codes on Microsoft Authenticator app for
                  every login.
                </p>
              </div>
              <input
                type="radio"
                name="authentication"
                data-testid="app-authentication"
                className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
                onChange={() => handleMethodChange('app')}
                checked={selectedMethod === 'app'}
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="outline"
            className="border-black mt-10 text-xs font-bold hover:bg-[#0d233d] hover:text-white"
          >
            Setup MFA
          </Button>
          <div className="border-t my-4"></div>

          <p className="mr-[0] mb-[0] text-xs font-normal [font-stretch:normal] not-italic leading-[1.2] tracking-[normal] text-[#000]">
            {CONTACT_US_CONTENT}
            <a className="text-[#0076be]" href={`mailto:${BROWN_MAIL}`}>
              {BROWN_MAIL}
            </a>
            .
          </p>
        </>
      )}
    </form>
  );
}
export default MFAForm;
