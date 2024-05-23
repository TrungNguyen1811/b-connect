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
import { getTopBanner } from 'src/api/advertisement/get-top-banner'
import { IResponseAds } from 'src/types/advertisement'
import { useCustomQueryDetail } from 'src/hooks/useCustomQueryDetail'
import { Link } from 'react-router-dom'

export default function CarouselDemo() {
  const { data } = useCustomQueryDetail<IResponseAds[]>(() => getTopBanner(), {
    refetchOnWindowFocus: false,
  })

  const bannerFix = Array.isArray(data) ? data.slice(0, 1) : []
  const bannerCarousel = Array.isArray(data) ? data.slice(2, 10) : []

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
              {bannerCarousel?.map((banner, index) => (
                <CarouselItem
                  key={index}
                  className={cn('basis-1/9', index == bannerCarousel.length - 1 ? 'w-[99.5%] pl-4' : '')}
                >
                  <Link to={`/shop/${banner.agencyId}`} className="lg:w-[28rem]">
                    <Card className="rounded-sm border-0">
                      <CardContent className="flex aspect-square justify-center p-0 sm:h-[8rem] sm:w-[22rem] md:h-[8rem] md:w-[30rem] lg:h-[16rem] lg:w-[50rem]">
                        <img
                          src={banner.bannerDir}
                          alt={banner.bannerTitle}
                          className="w-full rounded-sm object-cover shadow-md"
                        />
                      </CardContent>
                    </Card>
                  </Link>
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
              {bannerFix?.map((banner, index) => (
                <CarouselItem key={index} className={cn('p-0 sm:basis-1', index == bannerFix.length - 1 ? 'pt-2' : '')}>
                  <Link to={`/shop/${banner.agencyId}`} className="lg:w-[28rem]">
                    <Card className="p-0">
                      <CardContent className="p-0">
                        <img
                          src={banner.bannerDir}
                          alt={banner.bannerTitle}
                          className="h-[7.7rem] w-full rounded-sm object-cover"
                        />
                      </CardContent>
                    </Card>
                  </Link>
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
