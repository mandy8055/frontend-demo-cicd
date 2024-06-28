import { Outlet } from 'react-router-dom';
import { DatePicker } from 'src/app/components/atoms/date-picker/DatePicker';
import { PageContainer } from '../../components';
import Tabbing from '../../components/molecules/Tabbing/Tabbing';
import { Layout } from '../../components/templates/Layout';

function LandingPageLayout() {
  return (
    <PageContainer className="min-h-screen">
      <Layout>
        <div className="flex mt-6 justify-between items-center">
          <h6 className="text-[28px] font-bold">John Investment Advisory</h6>
          <DatePicker />
        </div>
        <Tabbing />
        <Outlet />
      </Layout>
    </PageContainer>
  );
}

export default LandingPageLayout;
