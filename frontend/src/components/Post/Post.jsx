import { Link } from "react-router-dom";
import { deletePost } from "../../api/api";


const Post = ({post}) => {

    const onClickDeletePost = async () => {

        if(!confirm("Are you sure you want to delete this post?")) return;

        try {
            await deletePost(post.id);
            alert("Post have been deleted!");
            window.location.reload();
        } catch (error) {
            alert("Error while deleting post: ", error.message);
        }
    };

    return (
        <>
            <div className="post-container" style={{position: 'relative', display: 'flex', width: '50%', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                <button style={{position: 'absolute', top: 0, right: 0}} onClick={onClickDeletePost}>X</button>
                <div className="post" style={{textAlign: 'center'}}>
                    <Link to={`/post/${post.id}`}>
                        <h2>Пост №{post.id}</h2>
                    </Link>
                    <p><strong>Заголовок:</strong> {post.title}</p>
                    <div className="content" style={{maxWidth: 800, margin: 'auto'}}>
                    <p><strong>Содержимое:</strong> {post.content}</p>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Post;