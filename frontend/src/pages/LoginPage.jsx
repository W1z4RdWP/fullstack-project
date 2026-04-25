import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <>
            
            <p>Авторизуйтесь</p>
            <p>Нет учетной записи? <Link to="/register/">Зарегестрироваться</Link></p>
        </>
    )
}

export default LoginPage;