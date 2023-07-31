import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number
    }>({
        imageUrl: '',
        title: '',
        price: 0
    });
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://6461fbf8491f9402f4af5cab.mockapi.io/Pizza-items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
            }
        }

        fetchPizza();
    });

    if (!pizza) {
        return <>'Загрузка...'</>;
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt='pizza'/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₴</h4>
        </div>
    );
};

export default FullPizza;