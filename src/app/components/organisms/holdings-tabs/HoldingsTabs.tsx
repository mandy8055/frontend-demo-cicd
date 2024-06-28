import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from 'src/app/components/ui/tabs';
const tabsData = [
  {
    value: 'summary',
    label: 'Summary',
  },
  {
    value: 'fixed-income-analysis',
    label: 'Fixed Income Analysis',
  },
  {
    value: 'comon-stock-analysis',
    label: 'Common Stock Analysis',
  },
  {
    value: 'annual-estimated-income',
    label: 'Annual Estimated Income',
  },
  {
    value: 'private-equity',
    label: 'Private Equity',
  },
  {
    value: 'portfolio-charecteristic',
    label: 'Portfolio Characteristic',
  },
];

function HoldingsTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.split('/')[2] || tabsData[0].value;
  const changeTabHandler = (value: string) => {
    navigate(value);
  };
  return (
    <Tabs
      defaultValue={activeTab}
      className="w-[400px] rounded-lg border-xs border-[#aaaaaa] bg-white p-px mt-6"
      onValueChange={changeTabHandler}
    >
      <TabsList className="bg-white bg-opacity-30 border-[1px] border-[#aaa] rounded-lg">
        {tabsData.map((tab) => {
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:rounded-lg data-[state=active]:border-[1px] data-[state=active]:border-[#535353] data-[state=active]:bg-[#eaeaea] data-[state=active]:text-[#1d1d1d] text-xs text-[#aaaaaa]"
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}

export default HoldingsTabs;
