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

export interface Product {
  attributes: {
    createdAt: string
    description: string
    name: string
    thumbnail: {
      data: {
        id: number
        attributes: {
          url: string
        }
      }
    }
    price_in_cents: number
    published_at: string
    updatedAt: string
  }
}
