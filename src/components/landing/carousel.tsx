import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselContent2,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Autoplay from 'embla-carousel-autoplay'

export default function CarouselDemo() {
  return (
    <div className="bg-orange-100 md:h-[10rem] lg:h-full">
      <div className="flex h-full p-4 lg:ml-[5rem]">
        <div className="h-full w-[50%]">
          <Carousel
            className="h-full w-full"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: false,
              }),
            ]}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-1/9">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 sm:h-[8rem] sm:w-[22rem] md:h-[8rem] md:w-[30rem] lg:h-[17rem] lg:w-[44rem]">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="h-full md:w-[50%] lg:w-[50%]">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: false,
              }),
            ]}
            opts={{
              align: 'start',
            }}
            orientation="vertical"
            className="h-full w-[100%]"
          >
            <CarouselContent2 className="m-0.6 w-full sm:h-[8rem]  lg:h-[17rem]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="m-0 p-1 sm:basis-1 ">
                  <div className="lg:w-[38rem]">
                    <Card>
                      <CardContent className="flex items-center justify-center p-5 sm:h-[3.5rem] sm:w-[22rem] lg:h-[8rem] lg:w-[38rem]">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent2>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
      </div>
    </div>
  )
}
