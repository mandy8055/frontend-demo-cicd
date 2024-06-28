import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel';
import { Chart } from '../Chart/Chart';

export default function CarouselContainer({
  carouselItemClassName,
  chartOptions = [],
}: any) {
  const ciClassName = carouselItemClassName
    ? carouselItemClassName
    : 'max-h-[414px] xl:basis-1/2 p-4 2xl:basis-1/3';

  return (
    <Carousel opts={{ align: 'start' }} className="overflow-hidden">
      <CarouselContent className="mx-0 p-0">
        {chartOptions.map((item: any, index: number) => (
          <CarouselItem
            className={ciClassName}
            data-testid="carousel-items"
            key={index}
          >
            <Chart
              options={item.options}
              className={item?.className || undefined}
              id={
                item?.id ||
                `${item.options.title.text
                  .replace(/\s/g, '-')
                  .toLowerCase()}-chart`
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 h-12 w-12" />
      <CarouselNext className="right-0 h-12 w-12" />
    </Carousel>
  );
}
