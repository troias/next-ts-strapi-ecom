// Product Types

export interface Products {
  data: {
    products: {
      data: Product[]
    }
  }
  meta: Meta
}

export interface Meta {
  pagination: {
    pageCount: number
    page: number
    pageSize: number
    total: number
  }
}

interface ImageFormat {
  url: string
  width: number
  height: number
  ext: string
  hash: string
  name: string
  size: number
  path: string
}

export interface Product {
  id: string
  attributes: {
    createdAt: string
    description: string
    name: string

    thumbnail: {
      data: {
        id: number
        attributes: {
          url: string
          width: number
          height: number
          alternativeText: string
          mime: string
          formats: {
            thumbnail: ImageFormat
            small: ImageFormat
            medium: ImageFormat
            large: ImageFormat
            original: ImageFormat
          }
        }
      }
    }
    price_in_cents: number
    published_at: string
    updatedAt: string
    slug: string
  }
}
