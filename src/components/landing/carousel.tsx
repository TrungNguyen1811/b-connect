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
import { cn } from 'src/lib/utils'

export default function CarouselDemo() {
  const carouselImages = [
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-31d0fdc71def6c31912233d29b922282_xxhdpi',
  ]
  const carouselImages2 = [
    'https://cf.shopee.vn/file/vn-50009109-a1e4a6328280332c4cf092dde7c6cc6c_xhdpi',
    'https://cf.shopee.vn/file/vn-50009109-a1e4a6328280332c4cf092dde7c6cc6c_xhdpi',
  ]

  return (
    <div className="bg-orange-50 md:h-[10rem] lg:h-full">
      <div className="flex h-full justify-center p-4">
        <div className="h-full md:w-[40%] lg:w-[56vw]">
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
              {carouselImages.map((img, index) => (
                <CarouselItem
                  key={index}
                  className={cn('basis-1/9', index == carouselImages.length - 1 ? 'w-[99.5%] pl-4' : '')}
                >
                  <Card className="rounded-sm border-0">
                    <CardContent className="flex aspect-square justify-center p-0 sm:h-[8rem] sm:w-[22rem] md:h-[8rem] md:w-[30rem] lg:h-[16rem] lg:w-[50rem]">
                      <img src={img} alt="Selected Image" className="w-full rounded-sm object-cover shadow-md" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="h-full md:w-[40%] lg:w-[32vw]">
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
            className="h-full w-full"
          >
            <CarouselContent2 className="mt-0.25 sm:h-[8rem] lg:h-[16rem]  lg:w-[28rem]">
              {carouselImages2.map((img, index) => (
                <CarouselItem
                  key={index}
                  className={cn('p-0 sm:basis-1', index == carouselImages2.length - 1 ? 'pt-2' : '')}
                >
                  <div className="lg:w-[28rem]">
                    <Card className="p-0">
                      <CardContent className="p-0">
                        <img src={img} alt="Selected Image" className="h-[7.7rem] w-full rounded-sm object-cover" />
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
