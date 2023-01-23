import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
      query MyQuery {
          postsConnection {
              edges {
                  node {
                      createdAt
                      author {
                          bio
                          id
                          name
                          photo {
                              url
                          }
                      }
                      slug
                      title
                      excerpt
                      featuredImage {
                          url
                      }
                      categories {
                          name
                          slug
                      }
                  }
              }
          }
      }

  `

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!){
        post(where: {slug: $slug}){
            author {
                id
                bio
                name 
                photo{
                    url
                }
            }
            createdAt 
            slug
            title
            excerpt
            featuredImage{
                url
            }
            categories{
                name 
                slug
            }
            content {
                raw
            }
        }
    }
  `

  const result = await request(graphqlAPI,query,{slug})
  return result?.post
}

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI,query)
    return result.posts
}

export const getSimilarPosts = async (categories,slug) => {
    const query = gql`
        query GetPostDetails($slug: String!,$categories: [String!]){
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI,query,{categories,slug})
    return result.posts
}

export const getCategories = async () => {
    const query = gql`
        query getCategories{
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI,query);
    return result?.categories
}

export const submitComment = async (obj) => {
    console.log(obj.name)
  const result = await fetch('/api/comments',{
      method: "POST",
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify(obj)
  })

  return result.json();
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
        comments(where: {post: {slug: $slug}}){
            name
            createdAt
            comment
        }
    }
  `

  const result = await request(graphqlAPI,query, {slug})
  return result?.comments
}


//todo----------------------- blaknotingga yozishing kk ----------------------
export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!){
            postsConnection(where: {categories_some: {slug: $slug}}){
                edges {
                    node {
                        createdAt
                        author {
                            bio
                            id
                            name
                            photo {
                                url
                            }
                        }
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI,query,{slug});
    return result?.postsConnection?.edges
}


//todo----------------------- blaknotingga yozishing kk ----------------------
export const getFeaturedPosts = async () => {
    const query = gql`
        query GetCategoryPost {
            posts(where: {featuredPost: true}) {
                author{
                    name
                    photo{
                        url
                    }
                }
                featuredImage{
                    url
                }
                title
                slug
                createdAt
            }
        }
    `

    const result = await request(graphqlAPI,query)
    return result?.posts
}