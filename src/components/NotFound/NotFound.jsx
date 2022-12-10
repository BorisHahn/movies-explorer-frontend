import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className='main'>
      <h1 className='page-not-found__title'>404</h1>
      <h2 className='page-not-found__subtitle'>Страница не найдена</h2>
      <button className='page-not-found__link' onClick={() => navigate(-1)}>Назад</button>
    </main>
  );
};

export default NotFound;
