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
    <div className=" bg-orange-100">
      <div className="ml-[5rem] flex p-4">
        <div>
          <Carousel
            className="h-[17rem] w-[48rem]"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: false,
              }),
            ]}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className=" basis-1/9">
                  <Card>
                    <CardContent className=" flex aspect-square h-[17rem] w-[48rem] items-center justify-center p-6">
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
        <div>
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
            className="h-[17rem] w-[4rem]"
          >
            <CarouselContent2 className="m-0.6 h-[17rem]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="m-0 p-1 md:basis-1">
                  <div className=" w-[36rem]">
                    <Card>
                      <CardContent className="flex h-[8rem] items-center justify-center p-5">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent2>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
