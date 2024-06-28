import { CustomInput } from 'src/app/components';
import { Button } from 'src/app/components/ui/button';

function ChangePasswordForm() {
  return (
    <form>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <CustomInput
          label="Old Password"
          id="old-password"
          placeholder="Enter your old password"
        />
        <CustomInput
          label="New Password"
          id="new-password"
          placeholder="Enter 8 digit password"
        />
      </div>
      <div className="w-1/2">
        <CustomInput
          label="Confirm New Password"
          id="confirm-pass"
          placeholder="Re-enter your new password"
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
export default ChangePasswordForm;
