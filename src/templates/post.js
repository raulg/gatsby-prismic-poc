import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { graphql } from 'gatsby'

export const query = graphql`
query PostQuery($uid: String) {
  prismic {
    allPosts(uid: $uid){
      edges{
        node{
          _meta{
            uid
            id
            type
          }
          title
          date         
        }
      }
    }
  }
}
`

const Post = props => {
  const doc = props.data.prismic.allPosts.edges[0].node;
  return (
    <div>
      {RichText.render(doc.title)}
    </div>
  )
}

export default Post;