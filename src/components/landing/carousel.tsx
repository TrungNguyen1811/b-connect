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
  const carouselImages = [
    'https://scontent.xx.fbcdn.net/v/t1.15752-9/434692886_1288494035440588_7757796997669830665_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=oS5x3CyUm6UAb6xty_z&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdV-LwBbyF3wjQBzWBSR2vvxa7Xhgk-eXBYduFrFfwO5Pw&oe=663F71E2',
    'https://cf.shopee.vn/file/vn-50009109-44278e876d9607f6ad3550a2d52489d8_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-9f55e03457f53c21641e034794aa44a0_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-9f55e03457f53c21641e034794aa44a0_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-9f55e03457f53c21641e034794aa44a0_xxhdpi',
  ]
  const carouselImages2 = [
    'https://scontent.xx.fbcdn.net/v/t1.15752-9/432365839_976963107439993_3403744881561378326_n.png?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tHPJtk9_s7UAb5W2ScO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdUjNNQP2XczWFSoMYcNAnEiaHbCE7U9fL15GvVdnJEb9w&oe=663F8B0B',
    'https://cf.shopee.vn/file/vn-50009109-44278e876d9607f6ad3550a2d52489d8_xxhdpi',
    'https://cf.shopee.vn/file/vn-50009109-9f55e03457f53c21641e034794aa44a0_xxhdpi',
    'https://scontent.xx.fbcdn.net/v/t1.15752-9/432365839_976963107439993_3403744881561378326_n.png?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tHPJtk9_s7UAb5W2ScO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdUjNNQP2XczWFSoMYcNAnEiaHbCE7U9fL15GvVdnJEb9w&oe=663F8B0B',
    'https://cf.shopee.vn/file/vn-50009109-9f55e03457f53c21641e034794aa44a0_xxhdpi',
  ]

  return (
    <div className="bg-orange-50 md:h-[10rem] lg:h-full">
      <div className="flex h-full justify-center p-4">
        <div className="h-full md:w-[40%] lg:w-[44vw]">
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
                <CarouselItem key={index} className="basis-1/9">
                  <Card>
                    <CardContent className="flex aspect-square justify-center p-0 sm:h-[8rem] sm:w-[22rem] md:h-[8rem] md:w-[30rem] lg:h-[17rem] lg:w-[40rem]">
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
        <div className="h-full md:w-[40%] lg:w-[44vw]">
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
            <CarouselContent2 className="ml-1 mt-1 sm:h-[8rem] lg:h-[17rem]  lg:w-[40rem]">
              {carouselImages2.map((img, index) => (
                <CarouselItem key={index} className="p-1 pt-0.5 sm:basis-1 ">
                  <div className="lg:w-[40rem]">
                    <Card className="p-0">
                      <CardContent className="p-0">
                        <img src={img} alt="Selected Image" className="h-32 w-full   rounded-sm object-cover" />
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
