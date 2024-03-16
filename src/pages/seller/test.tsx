import React from 'react'

export default function Test() {
  interface MangaCardProps {
    imageUrl: string
    title: string
    link: string
    description: string
  }
  const MangaCard: React.FC<MangaCardProps> = ({ imageUrl, title, description, link }) => {
    return (
      <div className="relative z-10 w-full max-w-screen-md snap-center snap-always overflow-hidden rounded-lg transition lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl">
        <div>
          <img
            src={imageUrl}
            alt={title}
            className="bg-hero absolute left-0 top-0 z-10 h-full w-full rounded-lg object-cover object-center brightness-75"
          />
        </div>
        <canvas
          width="16"
          height="9"
          className="w-full rounded-lg brightness-75 transition duration-500 md:hidden"
        ></canvas>
        <canvas
          width="32"
          height="15"
          className="hidden w-full rounded-lg brightness-75 transition duration-500 md:block"
        ></canvas>
        <div className="bg-hero absolute left-0 top-0 z-10 h-full w-full rounded-lg"></div>
        <div className="absolute bottom-0 left-0 z-10 flex w-full items-center justify-between p-3 md:p-6">
          <div className="flex w-full flex-col gap-1 overflow-hidden xl:gap-2">
            <div className="flex-0 max-w-[24rem]">
              <a href={link}>
                <h2 className="font-head overflow-hidden overflow-ellipsis whitespace-nowrap break-words text-base font-bold text-white text-opacity-75 md:overflow-auto md:whitespace-normal md:text-lg xl:text-xl">
                  {title}
                </h2>
              </a>
            </div>
            <div className="max-w-[32rem] flex-1 flex-grow">
              <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap break-words text-sm text-white text-opacity-80 md:overflow-auto md:whitespace-normal xl:text-base">
                {description}
              </p>
            </div>
          </div>
          <div className="flex-0 hidden whitespace-nowrap md:block">
            <a
              href={link}
              className="button inline-block bg-blue-600 bg-opacity-50 px-2 py-1 text-sm font-bold uppercase text-white hover:bg-blue-800 hover:bg-opacity-50 md:px-8 md:py-2"
            >
              Xem thông tin
            </a>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-10 hidden h-full w-full opacity-80 transition-all duration-1000 md:block"></div>
      </div>
    )
  }
  const mangas = [
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/724/panorama/processed-a3048ea4081847a70a36b6736be194d7.jpg',
      title: 'Versus',
      description: 'Truyện chưa được phân loại. Hãy quay lại sau',
      link: '/manga/versus/',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/74/panorama/processed-b4b5b378070d4370b01843326f9ba1f8.jpg',
      title: 'Combat Continent II',
      description: 'Truyện chưa được phân loại. Hãy quay lại sau',
      link: '/manga/combat-continent-ii/',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/724/panorama/processed-a3048ea4081847a70a36b6736be194d7.jpg',
      title: 'Versus',
      description: 'Truyện chưa được phân loại. Hãy quay lại sau',
      link: '/manga/versus/',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/74/panorama/processed-b4b5b378070d4370b01843326f9ba1f8.jpg',
      title: 'Combat Continent II',
      description: 'Truyện chưa được phân loại. Hãy quay lại sau',
      link: '/manga/combat-continent-ii/',
    },
  ]
  //
  interface MangaItemProps {
    href: string
    imageSrc: string
    alt: string
    title: string
    chapter: {
      href: string
      title: string
      date: string
    }
  }

  const MangaItem: React.FC<MangaItemProps> = ({ href, imageSrc, alt, title, chapter }) => {
    return (
      <div className="snap-stop-always snap-start">
        <div className="flex w-[13vw] flex-col">
          <a
            href={href}
            className="fine-transition h-[15rem] w-[12rem] flex-none overflow-hidden rounded-lg shadow hover:shadow-lg"
          >
            <div>
              <img
                src={imageSrc}
                alt={alt}
                loading="lazy"
                width="320"
                height="480"
                className="h-auto w-full object-cover"
              />
            </div>
          </a>
          <div className="flex w-full flex-col items-start justify-start overflow-hidden px-2 py-2 md:justify-between">
            <a href={href} className="overflow-hidden">
              <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-800">{title}</h3>
            </a>
            <h4 className="color line-clamp-1 text-xs uppercase tracking-wide text-gray-700">
              <a href={chapter.href} className="">
                <span className="font-semibold">{chapter.title}</span> - <span>{chapter.date}</span>
              </a>
            </h4>
          </div>
        </div>
      </div>
    )
  }

  const updateItemsData = [
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    {
      href: '/mangas/786',
      imageSrc:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/786/cover/processed-9ec1fdf0bdebe2459c56298160392ae5.jpg',
      alt: 'Đạo Làm Chồng Đảm (FULL HD)',
      title: 'Đạo Làm Chồng Đảm (FULL HD)',
      chapter: {
        href: '/mangas/786/chapters/32650',
        title: 'C. 91',
        date: 'một ngày trước',
      },
    },
    // Thêm các manga khác tương tự ở đây
  ]

  const UpdateList: React.FC<{ updateItemsData: MangaItemProps[] }> = ({ updateItemsData }) => {
    return (
      <div className=" snap-container grid h-full grid-flow-col grid-rows-5 gap-2 overflow-x-auto py-2 md:grid-rows-2 md:gap-4">
        {updateItemsData.map((item, index) => (
          <MangaItem
            key={index}
            href={item.href}
            imageSrc={item.imageSrc}
            alt={item.alt}
            title={item.title}
            chapter={item.chapter}
          />
        ))}
      </div>
    )
  }
  //

  interface MangaItemDataProps {
    imageUrl: string
    title: string
    mangaLink: string
    chapterLink: string
    chapterNumber: string
    timeAgo: string
    viewsCount: string
    position: number
  }

  const MangaItemData: React.FC<MangaItemDataProps> = ({
    imageUrl,
    title,
    mangaLink,
    chapterLink,
    chapterNumber,
    timeAgo,
    viewsCount,
    position,
  }) => {
    return (
      <div className="fine-transition snap-stop-always relative h-full w-72 snap-start rounded-lg bg-blue-300 px-5 py-4 hover:bg-white hover:shadow lg:w-96">
        <div className="flex h-full gap-2">
          <div className="h-full w-16 flex-none">
            <div>
              <img src={imageUrl} alt={title} loading="lazy" className="max-h-[5rem] rounded-md object-cover" />
            </div>
          </div>
          <div className="flex-grow truncate">
            <a href={mangaLink} className="mb-2 block">
              <h3 className="truncate font-extrabold text-black text-opacity-90">{title}</h3>
            </a>
            <a href={chapterLink} className=" block">
              <h4 className="truncate text-sm uppercase tracking-wide text-black text-opacity-60">
                <span className="font-semibold">{chapterNumber}</span> {' - '}
                <span className="font-semibold">{timeAgo}</span>
              </h4>
            </a>
            <div className="text-sm uppercase tracking-wide text-black text-opacity-60">{viewsCount} lượt xem</div>
          </div>
        </div>
        <div className="absolute right-0 top-0 z-20 mr-1 mt-1 select-none text-3xl font-bold text-gray-800 text-opacity-10 lg:text-4xl">
          {position}
        </div>
      </div>
    )
  }
  const mangaData: MangaListProps[] = [
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
    {
      imageUrl:
        'https://storage-ct.lrclib.net/file/cuutruyen/uploads/manga/1197/cover/processed-a6441f7a116a30f155faadf4452c4d96.jpg',
      title: 'Kakegurui',
      mangaLink: '/mangas/1197',
      chapterLink: '/mangas/1197/chapters/32473',
      chapterNumber: 'Chương 105',
      timeAgo: '8 ngày trước',
      viewsCount: ' 24',
    },
  ]

  interface MangaListProps {
    imageUrl: string
    title: string
    mangaLink: string
    chapterLink: string
    chapterNumber: string
    timeAgo: string
    viewsCount: string
  }
  const MangaList: React.FC<{ mangaData: MangaListProps[] }> = ({ mangaData }) => {
    return (
      <div className="snap-container grid h-full grid-flow-col grid-rows-3 gap-4 overflow-x-auto">
        {mangaData.map((manga, index) => (
          <MangaItemData
            key={index}
            imageUrl={manga.imageUrl}
            title={manga.title}
            mangaLink={manga.mangaLink}
            chapterLink={manga.chapterLink}
            chapterNumber={manga.chapterNumber}
            timeAgo={manga.timeAgo}
            viewsCount={manga.viewsCount}
            position={index + 1}
          />
        ))}
      </div>
    )
  }

  //
  interface UserListItemProps {
    avatarText: string
    userName: string
    mangaCount: string
    viewsCount: string
    position: number
  }
  const UserListItem: React.FC<UserListItemProps> = ({ avatarText, userName, mangaCount, viewsCount, position }) => {
    return (
      <div className="fine-transition relative mb-2 flex h-20 items-center rounded-lg bg-white bg-opacity-70 px-6 py-3 last:mb-0 hover:bg-opacity-100 hover:shadow-lg">
        <div className="avatar mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-lg text-blue-200">
          {avatarText}
        </div>
        <div>
          <a className="mb-2 block cursor-pointer font-extrabold text-gray-700">{userName}</a>
          <div className="text-sm uppercase tracking-wide text-gray-600">{mangaCount} truyện đã đăng</div>
          <div className="text-sm uppercase tracking-wide text-gray-600">{viewsCount} lượt xem</div>
        </div>
        <div className="absolute right-0 top-0 z-20 mr-1 mt-1 text-3xl font-bold text-gray-800 text-opacity-10 lg:text-4xl">
          {position}
        </div>
      </div>
    )
  }

  interface UserListProps {
    avatarText: string
    userName: string
    mangaCount: string
    viewsCount: string
  }

  const UserList: React.FC<{ userData: UserListProps[] }> = ({ userData }) => {
    return (
      <div className="common-container mb-8 flex lg:mb-16">
        <div className="flex flex-1 flex-col">
          {userData.map((user, index) => (
            <UserListItem
              key={index}
              avatarText={user.avatarText}
              userName={user.userName}
              mangaCount={user.mangaCount}
              viewsCount={user.viewsCount}
              position={index + 1}
            />
          ))}
        </div>
      </div>
    )
  }

  const userData: UserListProps[] = [
    { avatarText: 'S', userName: 'Shyobz', mangaCount: '92', viewsCount: '109.3K' },
    { avatarText: 'M', userName: 'MangaSoge', mangaCount: '24', viewsCount: '56.1K' },
    { avatarText: 'C', userName: 'Chú Thuật sư hội', mangaCount: '8', viewsCount: '41.3K' },
    { avatarText: 'G', userName: 'Gin', mangaCount: '60', viewsCount: '40.5K' },
    { avatarText: 'T', userName: 'Tuyết Vũ', mangaCount: '37', viewsCount: '39.6K' },
    { avatarText: 'V', userName: 'Vô Danh', mangaCount: '32', viewsCount: '37.8K' },
  ]

  return (
    <div id="app">
      <div className="">
        <div className="relative flex min-h-screen flex-col bg-gray-300">
          <div className="absolute left-0 top-0 h-5 w-5"></div>
          <nav className="fine-shadow fixed left-0 top-0 z-40 w-full bg-white bg-opacity-60 px-2 backdrop-blur">
            <div className="mx-auto max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
              <div className="flex items-stretch justify-between gap-4 py-2">
                <div className="hidden flex-1 items-center gap-3 lg:flex">
                  <a
                    href="https://splitter.cuutruyen.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-yellow-700 hover:text-yellow-800"
                  >
                    Cắt Webtoon
                  </a>
                  <a
                    href="https://discord.gg/W7P8JwGArg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link nav-link-light"
                  >
                    Discord
                  </a>
                  <a
                    href="https://www.facebook.com/groups/cuutruyen2vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link nav-link-light"
                  >
                    Hội kín
                  </a>
                  <a
                    href="https://m.me/cuutruyentranh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link nav-link-light"
                  >
                    Đăng truyện
                  </a>
                  <a
                    href="https://cuunews.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link nav-link-light"
                  >
                    Tin tức
                  </a>
                </div>
                <div className="flex max-w-full flex-1 items-center lg:justify-center">
                  <a
                    href="/"
                    className="font-display router-link-active flex h-11 select-none items-center rounded-full font-extrabold uppercase text-black text-opacity-60"
                    id="phrase2"
                  >
                    {' '}
                    Cứu Truyện{' '}
                  </a>
                </div>
                <div className="flex max-w-full flex-1 justify-end">
                  <div id="phrase" className="hidden">
                    effort-mournful-county-flagstick
                  </div>
                  <a
                    href="/downloads"
                    className="button-circle button-transparent-light display-none relative mr-2 h-11 w-11"
                  >
                    <svg className="h-11 w-11 -rotate-90">
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray="113.09733552923255"
                        strokeDashoffset="113.09733552923255"
                        className="text-blue-500"
                      ></circle>
                    </svg>
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                      <span
                        aria-label="Download Outline icon"
                        role="img"
                        className="material-design-icon download-outline-icon"
                      >
                        <svg
                          fill="currentColor"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="material-design-icon__svg"
                        >
                          <path d="M13,5V11H14.17L12,13.17L9.83,11H11V5H13M15,3H9V9H5L12,16L19,9H15V3M19,18H5V20H19V18Z">
                            <title>Download Outline icon</title>
                          </path>
                        </svg>
                      </span>
                    </div>
                  </a>
                  <button className="button-circle button-transparent-light mr-2 flex h-11 w-11 items-center justify-center px-3 py-2">
                    <span aria-label="Magnify icon" role="img" className="material-design-icon magnify-icon">
                      <svg
                        fill="currentColor"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="material-design-icon__svg"
                      >
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z">
                          <title>Magnify icon</title>
                        </path>
                      </svg>
                    </span>
                  </button>
                  <div className="relative">
                    <button className="button-circle button-transparent-light flex h-11 w-11 items-center justify-center px-4 py-2 uppercase">
                      <span aria-label="Menu icon" role="img" className="material-design-icon menu-icon">
                        <svg
                          fill="currentColor"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="material-design-icon__svg"
                        >
                          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z">
                            <title>Menu icon</title>
                          </path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="flex flex-grow flex-col overflow-hidden">
            <div className="flex flex-col">
              <div className="relative mb-[calc(5rem)] box-content flex justify-center md:mb-[calc(8rem)]">
                <div className="hide-scrollbar snap relative z-10 flex w-full translate-y-[calc(5rem)] select-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 md:translate-y-[calc(7rem)]">
                  {mangas.map((manga, index) => (
                    <MangaCard
                      key={index}
                      imageUrl={manga.imageUrl}
                      title={manga.title}
                      description={manga.description}
                      link={manga.link}
                    />
                  ))}
                </div>
                <div className="absolute left-0 top-0 h-[calc(5rem+80%)] w-full py-4 brightness-75 md:h-[calc(7rem+80%)]"></div>
              </div>
              <div className="mt-3 flex h-2.5 justify-center gap-1 md:h-3">
                <button className="h-2.5 w-2.5 flex-none rounded-full bg-gray-800 transition md:h-3 md:w-3"></button>
                <button className="h-2.5 w-2.5 flex-none rounded-full bg-gray-800 bg-opacity-30 transition md:h-3 md:w-3"></button>
                <button className="h-2.5 w-2.5 flex-none rounded-full bg-gray-800 bg-opacity-30 transition md:h-3 md:w-3"></button>
                <button className="h-2.5 w-2.5 flex-none rounded-full bg-gray-800 bg-opacity-30 transition md:h-3 md:w-3"></button>
                <button className="h-2.5 w-2.5 flex-none rounded-full bg-gray-800 bg-opacity-30 transition md:h-3 md:w-3"></button>
                <button className="h-2.5 w-2.5 flex-none rounded-full bg-gray-800 bg-opacity-30 transition md:h-3 md:w-3"></button>
              </div>
            </div>
            <section id="new-update" className="px-24 py-16 lg:py-24">
              <div className="common-container mb-8 lg:mb-12">
                <div className="text-xl font-bold uppercase text-gray-700">Mới cập nhật</div>
              </div>
              {/* <div  className="common-container relative w-full mb-8 lg:mb-16 py-2 display-none">
                        <div  className="hidden md:block md:h-[37rem] lg:h-[43rem]"></div>
                        <div  className="h-[28.25rem] md:hidden"></div>
                        <div  className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-lg bg-gray-200">
                            <span  aria-label="Loading icon" role="img" className="material-design-icon loading-icon spin text-gray-500">
                                <svg  fill="currentColor" width="64" height="64" viewBox="0 0 24 24" className="material-design-icon__svg">
                                    <path  d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
                                        <title >Loading icon</title>
                                    </path>
                                </svg>
                            </span>
                        </div>
                    </div> */}
              <div className="common-container relative mb-4 lg:mb-6">
                <UpdateList updateItemsData={updateItemsData} />
                <button
                  data-v-0b1a57f4=""
                  className="fine-transition absolute left-0 top-0 z-10 hidden h-full w-6 cursor-default items-center justify-center bg-gradient-to-r from-gray-300 opacity-0 hover:opacity-50 focus:outline-none md:flex lg:w-11"
                >
                  <span
                    data-v-0b1a57f4=""
                    aria-label="Chevron Left icon"
                    role="img"
                    className="material-design-icon chevron-left-icon fine-transition block rounded-full bg-gray-300 p-1 text-gray-400 shadow-lg"
                  >
                    <svg
                      data-v-0b1a57f4=""
                      fill="currentColor"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="material-design-icon__svg"
                    >
                      <path data-v-0b1a57f4="" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z">
                        <title data-v-0b1a57f4="">Chevron Left icon</title>
                      </path>
                    </svg>
                  </span>
                </button>
                <button
                  data-v-0b1a57f4=""
                  className="-translate-full fine-transition absolute right-0 top-0 z-10 hidden h-full w-6 transform items-center justify-center bg-gradient-to-l from-gray-300 opacity-90 hover:opacity-100 focus:outline-none md:flex lg:w-11"
                >
                  <span
                    data-v-0b1a57f4=""
                    aria-label="Chevron Right icon"
                    role="img"
                    className="material-design-icon chevron-right-icon fine-transition block rounded-full bg-gray-200 p-1 text-gray-700 shadow-lg"
                  >
                    <svg
                      data-v-0b1a57f4=""
                      fill="currentColor"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="material-design-icon__svg"
                    >
                      <path data-v-0b1a57f4="" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z">
                        <title data-v-0b1a57f4="">Chevron Right icon</title>
                      </path>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="common-container mb-8 flex justify-end lg:mb-16">
                <a
                  href="/newest"
                  className="flex cursor-pointer items-center text-sm font-bold text-gray-600 transition hover:text-blue-600"
                >
                  <span aria-label="Chevron Right icon" role="img" className="material-design-icon chevron-right-icon">
                    <svg
                      fill="currentColor"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="material-design-icon__svg"
                    >
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z">
                        <title>Chevron Right icon</title>
                      </path>
                    </svg>
                  </span>
                  <span>Xem danh sách truyện</span>
                </a>
              </div>
            </section>
            <section id="best-mangas" className="bg-blue-500 px-24 py-16 lg:py-24">
              <div className="common-container mb-8 lg:mb-12">
                <div className="text-xl font-bold uppercase text-blue-100 ">Truyện nổi bật</div>
              </div>
              <div className="common-container flex justify-end py-8">
                <div className="flex rounded-full bg-gray-100">
                  <button className="time-range-tab-item active">Tuần</button>
                  <button className="time-range-tab-item">Tháng</button>
                  <button className="time-range-tab-item">Mọi lúc</button>
                </div>
              </div>
              {/* <div className="display-none mb-8 h-96 lg:mb-16 lg:h-96">
                <div className="common-container flex h-full w-full items-center justify-center rounded-lg bg-gray-200 bg-opacity-20">
                  <span
                    aria-label="Loading icon"
                    role="img"
                    className="material-design-icon loading-icon spin text-black text-opacity-40"
                  >
                    <svg
                      fill="currentColor"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      className="material-design-icon__svg"
                    >
                      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
                        <title>Loading icon</title>
                      </path>
                    </svg>
                  </span>
                </div>
              </div> */}
              <div className="common-container relative  mb-8 h-96 lg:mb-16 lg:h-96">
                <MangaList mangaData={mangaData} />
                <button className="fine-transition absolute left-0 top-0 z-10 hidden h-full w-6 cursor-default items-center justify-center bg-gradient-to-r from-gray-300 opacity-0 hover:opacity-50 focus:outline-none md:flex lg:w-11">
                  <span
                    aria-label="Chevron Left icon"
                    role="img"
                    className="material-design-icon chevron-left-icon fine-transition block rounded-full bg-gray-300 p-1 text-gray-400 shadow-lg"
                  >
                    <svg
                      fill="currentColor"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="material-design-icon__svg"
                    >
                      <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z">
                        <title>Chevron Left icon</title>
                      </path>
                    </svg>
                  </span>
                </button>
                <button className="-translate-full fine-transition absolute right-0 top-0 z-10 hidden h-full w-6 transform items-center justify-center bg-gradient-to-l from-gray-300 opacity-90 hover:opacity-100 focus:outline-none md:flex lg:w-11">
                  <span
                    aria-label="Chevron Right icon"
                    role="img"
                    className="material-design-icon chevron-right-icon fine-transition block rounded-full bg-gray-200 p-1 text-gray-700 shadow-lg"
                  >
                    <svg
                      fill="currentColor"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="material-design-icon__svg"
                    >
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z">
                        <title>Chevron Right icon</title>
                      </path>
                    </svg>
                  </span>
                </button>
              </div>
            </section>
            <section id="best-teams" className="px-24 py-16 lg:py-24">
              <div className="common-container mb-8 lg:mb-12">
                <div className="text-xl font-bold uppercase text-gray-700">Nhóm dịch hàng đầu</div>
              </div>
              <div className="common-container flex justify-end py-8">
                <div className="flex rounded-full bg-gray-100">
                  <button className="time-range-tab-item active">Tuần</button>
                  <button className="time-range-tab-item">Tháng</button>
                  <button className="time-range-tab-item">Mọi lúc</button>
                </div>
              </div>

              {/* <div className="display-none relative w-full">
                <div className="mb-2 h-20"></div>
                <div className="mb-2 h-20"></div>
                <div className="mb-2 h-20"></div>
                <div className="mb-2 h-20"></div>
                <div className="mb-2 h-20"></div>
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                  <span
                    aria-label="Loading icon"
                    role="img"
                    className="material-design-icon loading-icon spin text-gray-500"
                  >
                    <svg
                      fill="currentColor"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      className="material-design-icon__svg"
                    >
                      <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z">
                        <title>Loading icon</title>
                      </path>
                    </svg>
                  </span>
                </div>
              </div> */}
              <UserList userData={userData} />
            </section>
          </div>
          <footer className="border-t-2 border-gray-800 bg-gray-800 px-2 py-16">
            <div className="mx-auto max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
              <div className="flex w-full flex-col items-center text-sm text-gray-500">
                <div className="mb-6 text-center">
                  <div className="text-green-200">Contact for work, copyright and more:</div>
                  <div>
                    <a href="mailto:ad.cuutruyen@gmail.com" className="text-gray-400 hover:text-gray-300">
                      ad.cuutruyen@gmail.com
                    </a>
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <div className="mb-1">
                    <a href="https://cuutruyen.net/PrivacyPolicy" className="text-gray-400 hover:text-gray-300">
                      Điều khoản dịch vụ
                    </a>
                  </div>
                  <div className="mb-1">
                    <a href="https://cuutruyen.net/PrivacyPolicy" className="text-gray-400 hover:text-gray-300">
                      Chính sách bảo mật
                    </a>
                  </div>
                </div>
                <div> © 2023 - cuutruyen.net </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
