import { Product } from "../lib/types"

type GetProducts = () => Promise<Product[]>

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
