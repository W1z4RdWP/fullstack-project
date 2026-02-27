import { useEffect, useState } from 'react';
import { fetchPostData } from './../api/api';
import Post from '../components/Post/Post';


const HomePage = () => {

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const getPostData = async () => {
    setLoading(true); // Включаем загрузку
    setError(null); // Сбрасываем ошибку
    try {
        console.log('Запуск fetchPostData...');
        const posts = await fetchPostData();
        console.log('Получены данные: ', posts);
        console.log('тип данных: ', typeof(posts));
        console.log('Длина: ', posts?.length);
        console.log('Загружаю данные: ', ...posts);
        setData(posts || []);
    } catch (error) {
        console.error('Ошибка загрузки данных Post: ', error);
        setError(error.message);
        setData([]);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
    getPostData();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!data) return <p>Нет данных</p>;

    return (
        <>
            {
            data.map((post) => {
                return (
                <>
                    <Post post={post}/>
                </>
                )
            }) 
            }
        </>
    )
}

export default HomePage;