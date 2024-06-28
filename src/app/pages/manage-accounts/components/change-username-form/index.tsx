import { CustomInput } from 'src/app/components';
import { Button } from 'src/app/components/ui/button';

function ChangeUsernameForm() {
  return (
    <form>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <CustomInput
          label="Old Username"
          id="confirm-pass"
          placeholder="Enter your old username"
        />
        <CustomInput
          label="New Username"
          type="text"
          id="new-username"
          placeholder="Enter your new username"
        />
      </div>
      <div className="w-1/2">
        <CustomInput
          label="Password"
          type="password"
          id="password"
          placeholder="Enter password"
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="border-black text-xs font-bold hover:bg-[#0d233d] hover:text-white"
      >
        Submit
      </Button>
    </form>
  );
}
export default ChangeUsernameForm;
