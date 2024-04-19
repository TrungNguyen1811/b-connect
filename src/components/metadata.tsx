import { Helmet } from 'react-helmet'
type Props = {
  title?: string
  description?: string
  og?: {
    image?: string
    url?: string
    type?: string
    title?: string
  }
}

function MetaData({ title, description, og }: Props) {
  return (
    <Helmet title={title} titleTemplate={'%s • Book Connect'}>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={og?.image} />
      <meta property="og:url" content={og?.url} />
      <meta property="og:type" content={og?.type} />
      <meta property="og:title" content={og?.title} />
    </Helmet>
  )
}

export default MetaData
