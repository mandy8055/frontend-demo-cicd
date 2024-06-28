import { DISCLAIMER_PROPRIETARY } from 'src/app/common/constants';
import { AccountsTable } from 'src/app/components';

function Accounts() {
  return (
    <div className="mt-6">
      <AccountsTable />
      <p className="mt-10 text-xs">{DISCLAIMER_PROPRIETARY}</p>
    </div>
  );
}

export default Accounts;
