import React from 'react';
import { graphql, Link } from 'gatsby';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../utils/linkResolver';

export const query = graphql`
{
	prismic{
    allBlog_homes{
      edges{
        node{
          headline
          description
          image
        }
      }
    }
    allPosts{
      edges{
        node{
          title
          _meta{
            uid
            id
            type
          }
        }
      }
    }
  }
}
`

const RenderPosts = ({ posts }) => {
  return posts.map((item) =>
    <div>
      <Link to={linkResolver(item.node._meta)}>
        {RichText.render(item.node.title)}
      </Link>
    </div>
  )
}

export default ({ data }) => {
  const doc = data.prismic.allBlog_homes.edges[0].node;
  const blogPosts = data.prismic.allPosts.edges;
  return (
  <>
    <h1>{RichText.render(doc.headline)}</h1>
    <h2>{RichText.render(doc.description)}</h2>
    <img src={doc.image.url} />
    <RenderPosts posts={blogPosts} />
  </>
  );
}
