import { PropsWithChildren } from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

type DropdownProps = {
  shouldShowLabel?: boolean;
  labelName?: string;
  placeholderText: string;
};

function Dropdown({
  shouldShowLabel,
  labelName,
  children,
  placeholderText,
}: PropsWithChildren<DropdownProps>) {
  return (
    <>
      {shouldShowLabel && (
        <label className="w-[117px] h-4 mt-[54px] mr-[349px] mb-4 ml-[0] font-[Roboto] text-[14px] font-bold [font-stretch:normal] not-italic leading-[1.2] tracking-[normal] text-left text-[#303030]">
          {labelName}
        </label>
      )}
      <Select>
        <SelectTrigger className="w-[345px] mb-4">
          <SelectValue placeholder={placeholderText} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </>
  );
}
export default Dropdown;
