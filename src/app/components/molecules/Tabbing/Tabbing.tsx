import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { tabsData } from './tabsData';

export default function Tabbing() {
  const tabs = tabsData;
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1];
  const changeValue = (value: string) => {
    navigate(`${value}`);
  };
  return (
    <Tabs defaultValue={activeTab} className="mt-5" onValueChange={changeValue}>
      <TabsList className="flex justify-start bg-transparent">
        {tabs.map((tab: any) => (
          <TabsTrigger
            className="data-[state=active]:text-black text-[#aaaaaa] data-[state=active]:border-b-2 data-[state=active]:border-[#0176be] border-b-2 border-transparent hover:border-[#0176be] tab-btn text-base data-[state=active]:font-bold rounded-none"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
