import { useEffect, useState } from 'react';
import { fetchAllPostsData } from './../api/api';
import Post from '../components/Post/Post';


const HomePage = () => {

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const getPostData = async () => {
    setLoading(true); // Включаем загрузку
    setError(null); // Сбрасываем ошибку
    try {
        const posts = await fetchAllPostsData();
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
            <div className="main-wrapper" style={{marginBottom: '60px'}}>
                {
                data.map((post) => {
                    return (
                    <>
                            <Post post={post}/>
                    </>
                    )
                }) 
                }
            </div>

        </>
    )
}

export default HomePage;