//Styles
import './Styles/index.scss';
//UI
import {Header} from "./components/PizzasCatalogAndHead/header/Header";
import {PizzaItem} from "./components/PizzasItems/PizzaItem";
import {Catalog} from "./components/PizzasCatalogAndHead/Category/Catalog";
import {Sort} from "./components/PizzasCatalogAndHead/Sort/Sort";
//Component
function App() {


  return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Catalog/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              <PizzaItem title='Маргарита'
                         price='120'
                         src='https://dodopizza-a.akamaihd.net/static/Img/Products/e3f5dfcb094b4c9b8200ca9f573cb2f1_292x292.webp'/>
              <PizzaItem
                  title='Пеперони в соусе'
                  price='340'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/10b95b8611ec457dbffd9613b8eb165a_292x292.webp'/>
              <PizzaItem
                  title='Квадро Формаджи'
                  price='500'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_292x292.webp'/>
              <PizzaItem
                  title='Пеперони'
                  price='210'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/27c9bbd0af3a4d1d84a086d9c2f1656d_292x292.webp'/>
              <PizzaItem
                  title='Мясная'
                  price='100'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/18dbb12240b041a191c9dc73c9c1f4ef_292x292.webp'/>
              <PizzaItem
                  title='Ципленок в соусе'
                  price='600'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/45cc8ffb190c4a28aaf1863a67f675c7_292x292.webp'/>
              <PizzaItem
                  title='Пицца пол мяса'
                  price='430'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'/>
              <PizzaItem
                  title='Пицца с ананасом'
                  price='365'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_292x292.webp'/>
              <PizzaItem
                  title='Супер пицца'
                  price='3000'
                  src='https://dodopizza-a.akamaihd.net/static/Img/Products/d51fa179760041f0831e63fa21c39402_292x292.webp'/>
              </div>
            </div>
          </div>
        </div>
  );
}

export default App;
