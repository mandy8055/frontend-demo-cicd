import { Button } from '../../ui/button';
import { CardType } from './types';

export const Card = ({ data }: { data: CardType }) => {
  return (
    <div
      data-testid="card"
      className="bg-[#e8ebf0] bg-opacity-40 p-6 shadow-[0_2px_3.1px_0px_rgba(0,0,0,0.25)] w-[310px] rounded-lg border-[#e0e0e0] border-[1px]"
    >
      <p className="text-[18px] font-bold text-[#163964] mb-2">{data.title}</p>
      <p className="text-[14px] text-[#303030] mb-5">{data.body}</p>
      <Button
        className="text-[14px] font-bold text-[#0076be] inline-block px-0"
        variant="link"
        size="sm"
      >
        Click to Read More
      </Button>
    </div>
  );
};
