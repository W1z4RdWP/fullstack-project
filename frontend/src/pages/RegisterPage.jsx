import { Link } from "react-router-dom";
import RegisterForm from "../components/Register/RegisterForm";

const RegisterPage = () => {
    return (
        <>
            <RegisterForm />
            <p>Приступите к регистрации</p>
            <span>Уже зарегестрированы? <Link to='/login/'>Войти</Link></span>
        </>
    )
}

export default RegisterPage;