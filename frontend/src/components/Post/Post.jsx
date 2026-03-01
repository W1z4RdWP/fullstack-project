import { Link } from "react-router-dom";

const Post = ({post}) => {
    return (
        <div className="post" style={{textAlign: 'center'}}>
            <Link to={`/post/${post.id}`}>
                <h2>Пост №{post.id}</h2>
            </Link>
            <p><strong>Заголовок:</strong> {post.title}</p>
            <div className="content" style={{maxWidth: 800, margin: 'auto'}}>
              <p><strong>Содержимое:</strong> {post.content}</p>
            </div>
            <hr />
        </div>
    )
}

export default Post;