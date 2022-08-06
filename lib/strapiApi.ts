import { Product, Products } from "../lib/types"

type GetProducts = () => Promise<Products>

export const getProducts: GetProducts = async () => {
  try {
    const req = await fetch("http://localhost:1337/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `

          fragment FileParts on UploadFileEntityResponse {
            data {
              id
              attributes {
                alternativeText
                width
                height
                mime
                url
                formats
              }
            }
          }
  
        query {
          products {
            data {
              id
              attributes {
                name
                price_in_cents
                description
                updatedAt
                createdAt
                publishedAt
                thumbnail {
                  ...FileParts
                }
               
                slug
              }
            }
            meta {
              pagination {
                pageCount
                page
                pageSize
                total
              }
            }
          }
        }
      `,
      }),
    })
    const data = await req.json()

    return data
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    } else {
      console.log(error)
    }
  }
}

export const getSingleProduct = async (slug: string) => {
  try {
    const req = await fetch("http://localhost:1337/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
          fragment FileParts on UploadFileEntityResponse {
            data {
              id
              attributes {
                alternativeText
                width
                height
                mime
                url
                formats
              }
            }

          }
          query($slug: String!) {
            products(filters: {slug: {eq: $slug}}) {
              data {
                id
                attributes {
                  name
                  price_in_cents
                  description
                  updatedAt
                  createdAt
                  publishedAt
                  thumbnail {
                    ...FileParts
                  }
                  slug
                }
              }
            }
          }




        `,
        variables: {
          slug,
        },
      }),
    })
    const data = await req.json()

    return data
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    } else {
      console.log(error)
    }
  }
}
