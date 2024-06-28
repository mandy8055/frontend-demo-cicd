import { generateUUID } from 'src/app/common/utils';
import { Card } from '../../molecules/card';
import { CardType } from '../../molecules/card/types';
const InsightsData: CardType[] = [
  {
    title: 'The Big Picture',
    body: 'Investment Outlook 12-31-2023',
    link: 'https://info.brownadvisory.com/bigpic-q42023',
    id: generateUUID(),
  },
  {
    title: 'Equity Beat',
    body: 'Eric Gordon, Head of Equities',
    link: 'https://info.brownadvisory.com/bigpic-q42023',
    id: generateUUID(),
  },
  {
    title: '2024 Assets Allocations',
    body: 'Perspectives/Outlook',
    link: 'https://info.brownadvisory.com/bigpic-q42023',
    id: generateUUID(),
  },
];
const InsightsRenderer = () => {
  return (
    <div className="flex gap-x-3">
      {InsightsData.map((data) => {
        return <Card key={data.id} data={data} />;
      })}
    </div>
  );
};

const Insights = () => {
  return (
    <div className="pt-6 border-t-[1px] border-[#eaeaea] mb-12">
      <p className="text-base font-bold mb-3">More Insights</p>
      <InsightsRenderer />
    </div>
  );
};

export default Insights;
