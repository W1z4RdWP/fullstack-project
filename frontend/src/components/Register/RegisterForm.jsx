import './RegisterForm.css';

const RegisterForm = () => {
    
    return (
        <form className="register-form">
            <label htmlFor="name-input">Имя</label><br />
            <input type="text" name="name-input" /><br /><br />
            <label htmlFor="surname-input">Фамилия</label><br />
            <input type="text" name="surname-input" /><br /><br />
            <label htmlFor="email-input">Email</label><br />
            <input type="email" name="email-input" /><br /><br />
            <label htmlFor="password1-input">Пароль</label><br />
            <input type="password" name="password-input" /><br /><br />
            <label htmlFor="password2-input">Повторите пароль</label><br />
            <input type="password" name="password2-input" /><br /><br />
            <button type="submit">Зарегестрироваться</button>
        </form>
    )
}

export default RegisterForm;