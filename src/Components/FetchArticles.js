const FetchArticles = async(blogId,shop,endCursor,articles) => {
    let query = '';
<<<<<<< HEAD
    let limit = 250;
=======
    let limit = 5;
>>>>>>> 46b516425af7c98c4c1c435beb5340875b6efeaa
    if(endCursor.length <= 0){
        query = `{
            blog(id: "gid://shopify/Blog/${blogId}") {
                articles(first: ${limit}) {
                    nodes {
                        id
                        title
                        image {
                            url
                        }
                        publishedAt
                        tags
                        handle
                        onlineStoreUrl
                    }
                    pageInfo{
                        hasNextPage
                        endCursor
                    }
                }
            }
        }`;
    }else{
        query = `{
            blog(id: "gid://shopify/Blog/${blogId}") {
                articles(first: ${limit}, after: "${endCursor}") {
                    nodes {
                        id
                        title
                        image {
                            url
                        }
                        publishedAt
                        tags
                        handle
                        onlineStoreUrl
                    }
                    pageInfo{
                        hasNextPage
                        endCursor
                    }
                }
            }
        }`;
    }
    const url = `https://${shop}/api/2022-04/graphql.json`;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'X-Shopify-Storefront-Access-Token' : 'eed462dc8a11e3a7eb3048a2e941cf3b'
        },
        body:  JSON.stringify({query:query})
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    const pageInfo = await data.data.blog.articles.pageInfo;
    const checkAgain = async () => {
        Object.keys(data.data.blog.articles.nodes).forEach((key) => articles.push(data.data.blog.articles.nodes[key]));
        if(pageInfo.hasNextPage === true){
            return await FetchArticles(blogId,shop,pageInfo.endCursor,articles);
        }else{
            return articles;
        }
    }
    return await checkAgain();
};

export default FetchArticles;