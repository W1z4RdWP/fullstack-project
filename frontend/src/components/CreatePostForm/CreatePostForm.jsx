import { useState } from "react";
import { createPost } from "../../api/api";

const CreatePostForm = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
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
            const result = createPost(formData);
            
            // Очищаем форму после успеха
            setTitle('');
            setContent('');
        } catch (err) {
            setError(err.message || 'Ошибка при создании поста');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-form">
            <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="title">Заголовок</label>
                <input 
                    type="text" 
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder="Введите заголовок поста" 
                /> <br /><br />
                <label htmlFor="content">Содержание</label>
                <textarea 
                    name="content" 
                    value={content}
                    id="content_textarea"
                    onChange={(e) => {setContent(e.target.value)}}
                    rows="5" 
                    placeholder="Введите текст поста"
                />
                {error && <div className="error" style={{color: 'red'}}>{error}</div>}
                
                <button type="submit">
                    {loading ? 'Создание...' : 'Создать'}
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;