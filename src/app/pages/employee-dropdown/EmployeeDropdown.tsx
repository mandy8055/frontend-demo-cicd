import { useNavigate } from 'react-router-dom';
import { generateUUID } from 'src/app/common/utils';
import { Dropdown, PageContainer } from 'src/app/components';
import { Button } from 'src/app/components/ui/button';
import { SelectItem } from 'src/app/components/ui/select';
import { delegateOptions, touchpointProfiles } from './mockData.ts';

function EmployeeDropdownScreen() {
  const navigate = useNavigate();

  return (
    <PageContainer className="min-h-screen m-2 p-16">
      <h1 className="w-[223px] h-[30px] mt-[0] mr-[243px] mb-[12px] ml-[0] font-[Roboto] text-[25px] font-bold [font-stretch:normal] not-italic leading-[1.2] tracking-[normal] text-left text-[#1d1d1d]">
        Welcome, User Test
      </h1>
      <p className="w-[332px] h-[17px] mt-[12px] mr-[134px] mb-[54px] ml-[0] font-[Roboto] text-[14px] font-normal [font-stretch:normal] not-italic leading-[1.2] tracking-[normal] text-left text-[#303030]">
        Select TouchPoint profile and relationship to continue
      </p>
      <div className="flex">
        <div>
          <Dropdown
            placeholderText="Select relationship"
            shouldShowLabel
            labelName="TouchPoint Profile"
          >
            {delegateOptions.map((profile) => (
              <SelectItem key={generateUUID()} value={profile}>
                {profile}
              </SelectItem>
            ))}
          </Dropdown>
        </div>
        <div>
          <Dropdown
            shouldShowLabel
            labelName="Delegate Details"
            placeholderText="Select name"
          >
            {delegateOptions.map((profile) => (
              <SelectItem key={generateUUID()} value={profile}>
                {profile}
              </SelectItem>
            ))}
          </Dropdown>
          {/* <Dropdown placeholderText="Select relationship">
            {touchpointProfiles.map((profile) => (
              <SelectItem key={profile.key} value={profile.value}>
                {profile.value}
              </SelectItem>
            ))}
          </Dropdown> */}
          <Dropdown placeholderText="Select relationship">
            {touchpointProfiles.map((profile) => (
              <SelectItem key={generateUUID()} value={profile}>
                {profile}
              </SelectItem>
            ))}
          </Dropdown>
          <Button
            className="border-black text-xs w-36 mt-8 mb-4 font-bold bg-[#0d233d]"
            variant="default"
            onClick={() => navigate('/welcome')}
          >
            Continue
          </Button>
          <p className="w-[345px] h-[39px] mr-[0] mb-[0] font-[Roboto] text-[11px] font-normal [font-stretch:normal] not-italic leading-[1.2] tracking-[normal] text-left text-[#000]">
            For assistance or to provide feedback regarding your experience,
            please call +44-20-3301-8130, 1-410-537-5333, or contact us:
            <a
              className="text-[#0076be]"
              href="mailto:%62%61%73%75%70%70%6F%72%74%40%62%72%6F%77%6E%61%64%76%69%73%6F%72%79%2E%63%6F%6D"
            >
              BASupport@brownadvisory.com
            </a>
            .
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
export default EmployeeDropdownScreen;
