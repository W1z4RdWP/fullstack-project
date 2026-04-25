import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/api";


import './CreatePostForm.css';
import CKEditorInput from "../CKEditorInput/CKEditorInput";






const CreatePostForm = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Собираем данные формы
        const formData = {
            title: title.trim(),
            content: content.trim()
        };

        if (!formData.title || !formData.content) {
            setError('Заполните все поля');
            setLoading(false);
            return;
        }

        try {
            await createPost(formData);
            
            navigate('/')
        } catch (err) {
            setError(err.message || 'Ошибка при создании поста');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-form">
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="title">Заголовок</label><br />
                <input 
                    className="create-post-from__input"
                    type="text" 
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder="Введите заголовок поста" 
                /> <br /><br />
                <label htmlFor="content">Содержание</label>
                <CKEditorInput value={content} onChange={setContent} />

                {error && <div className="error" style={{color: 'red'}}>{error}</div>}
                
                <button type="submit">
                    {loading ? 'Создание...' : 'Создать'}
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;