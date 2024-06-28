import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/common/hooks';

import { Button } from 'src/app/components/ui/button';
import { Calendar } from 'src/app/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/app/components/ui/popover';
import { selectDate, updateDate } from 'src/app/store/slices/dateSlice';
import { cn } from 'src/lib/utils';

export const DatePicker = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname.split('/')[1] === 'welcome';
  const date = useAppSelector(selectDate);
  const dispatch = useAppDispatch();
  if (isWelcomePage && date) {
    return (
      <div className="font-bold text-xs w-[100px] h-8 items-center flex">
        {format(date, 'P').replace(/\//g, '-')}
      </div>
    );
  }
  const onDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateInString = date.toLocaleDateString();
      dispatch(updateDate(dateInString));
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[100px] h-8 gap-1 p-2 font-bold text-xs',
            !date && 'text-muted-foreground',
          )}
        >
          {date ? (
            format(date, 'P').replace(/\//g, '-')
          ) : (
            <span>Pick a date</span>
          )}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(date)}
          onSelect={onDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
