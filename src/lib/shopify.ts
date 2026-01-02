const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({ query, variables = {} }: { query: string; variables?: any }) {
    const endpoint = `https://${domain}/api/2024-01/graphql.json`;
    const key = storefrontAccessToken;

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key || '',
            },
            body: JSON.stringify({ query, variables }),
        });

        return {
            status: result.status,
            body: await result.json(),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 500,
            error: 'Error receiving data',
        };
    }
}

export async function getAllProducts() {
    return shopifyFetch({
        query: `{
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }`,
    });
}

export async function createCheckout(variantId: string) {
    const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

    const variables = {
        input: {
            lineItems: [{ variantId, quantity: 1 }],
        },
    };

    return shopifyFetch({ query: mutation, variables });
}
