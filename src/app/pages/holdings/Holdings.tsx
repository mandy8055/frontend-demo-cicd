import { Outlet } from 'react-router-dom';
import { HoldingsTabs } from 'src/app/components';

function HoldingsScreen() {
  return (
    <div className="space-y-6">
      <HoldingsTabs />
      <Outlet />
    </div>
  );
}
export default HoldingsScreen;
