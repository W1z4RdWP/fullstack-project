import { useEffect, useState } from "react";
import { fetchOnePostData } from "../api/api";
import Post from "../components/Post/Post";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


import './PostPage.css';

const PostPage = () => {

    const { id } = useParams();
    
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const getPostData = async () => {
    setLoading(true); // Включаем загрузку
    setError(null); // Сбрасываем ошибку
    try {
        console.log('Запуск fetchOnePostData...');
        const post = await fetchOnePostData(id);
        console.log('Получены данные: ', post);
        console.log('тип данных: ', typeof(post));
        console.log('Длина: ', post?.length);
        // console.log('Загружаю данные: ', ...post);
        setData(post || null);
    } catch (error) {
        console.error('Ошибка загрузки данных Post: ', error);
        setError(error.message);
        setData([]);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        library.add(faArrowLeft);
        getPostData();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!data) return <p>Нет данных</p>;



    return (
        <>
            <div className="post-page">
                <Link to='/' style={{position: 'absolute', left: 75, top: 0}}><button>
                    <FontAwesomeIcon icon="arrow-left" />
                </button></Link>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
            </div>
        </>
    )
}

export default PostPage;