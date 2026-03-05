import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, fetchOnePostData } from "../api/api";

const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [newPostTitle, setNewPostTitle] = useState(null);
    const [newPostContent, setNewPostContent] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await fetchOnePostData(id);
                setPost(data);
                setNewPostTitle(data.title);
                setNewPostContent(data.content);
            } catch (error) {
                console.error(error);
            }
        };
        loadPost();
    }, [id])

    if (!post) return <p>Loading...</p>

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title: newPostTitle,
            content: newPostContent
        };

        editPost(id, formData);
        navigate(`/`);

    };

    const handleTitleChange = (e) => {
        setNewPostTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setNewPostContent(e.target.value);
    };

    return (
        <div className="edit-post-page" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <h1>Edit the "{post.title}" post</h1>
            <form method="post" onSubmit={handleSubmit}>
                <label htmlFor="title">Заголовок</label><br />
                <input type="text" value={newPostTitle} onChange={handleTitleChange} /><br /><br />
                <label htmlFor="content">Содержание</label><br />
                <textarea type="text" rows={10} cols={30} value={newPostContent} onChange={handleContentChange} /><br />
                <button type="submit">Применить</button>
            </form>
        </div>

    )
}

export default EditPostPage;