import { useState } from 'react';
import { registerUser } from '../../api/api'; // путь к вашей функции
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Простая валидация
    const { name, surname, email, password, password2 } = formData;
    if (!name || !surname || !email || !password || !password2) {
      setError('Все поля обязательны для заполнения');
      return;
    }
    if (password !== password2) {
      setError('Пароли не совпадают');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);
    try {
      // Отправляем на бэкенд данные в нужном формате
      const response = await registerUser({
        name,
        surname,
        email,
        password,
      });
      // Если всё успешно
      setSuccess(true);
      // Очистить форму (опционально)
      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: '',
      });
      // Можно добавить редирект или сообщение
      console.log('Регистрация успешна:', response);
    } catch (err) {
      setError(err.message || 'Ошибка при регистрации. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name-input">Имя</label><br />
      <input
        type="text"
        name="name"
        id="name-input"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        autoComplete="off"
      /><br /><br />

      <label htmlFor="surname-input">Фамилия</label><br />
      <input
        type="text"
        name="surname"
        id="surname-input"
        value={formData.surname}
        onChange={handleChange}
        disabled={loading}
        autoComplete="off"
      /><br /><br />

      <label htmlFor="email-input">Email</label><br />
      <input
        type="email"
        name="email"
        id="email-input"
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
        autoComplete="off"
      /><br /><br />

      <label htmlFor="password-input">Пароль</label><br />
      <input
        type="password"
        name="password"
        id="password-input"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        autoComplete="new-password"
      /><br /><br />

      <label htmlFor="password2-input">Повторите пароль</label><br />
      <input
        type="password"
        name="password2"
        id="password2-input"
        value={formData.password2}
        onChange={handleChange}
        disabled={loading}
        autoComplete="new-password"
      /><br /><br />

      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
      {success && <div className="success-message" style={{ color: 'green' }}>Регистрация прошла успешно! Теперь вы можете войти.</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default RegisterForm;