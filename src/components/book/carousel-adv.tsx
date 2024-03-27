import * as React from 'react'

import { Carousel, CarouselContent3, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '../ui/card'

export default function CarouselAdv() {
  return (
    <div className="">
      <div className="mb-4 w-full pt-4">
        <div>
          <Carousel
            className="h-[17rem] w-full"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: false,
              }),
            ]}
          >
            <CarouselContent3>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="">
                  <Card>
                    <CardContent className=" flex aspect-square h-[17rem] w-full items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent3>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
