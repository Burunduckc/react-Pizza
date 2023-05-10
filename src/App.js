//Styles
import './Styles/index.scss';
//UI
import {Header} from "./components/Header/Header";
import {PizzaItem} from "./components/PizzasItems/PizzaItem";
import {Catalog} from "./components/Header/Catalog";
import {Sort} from "./components/Header/Sort";
//JSON
import pizzasItem from './assets/db/pizzas.json'
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
              {pizzasItem.map(obg => <PizzaItem
                  src={obg.imageUrl}
                  title={obg.title}
                  price={obg.price}
                  sizes={obg.sizes}
                  types={obg.types}
                  key={obg.id}></PizzaItem>)}
              </div>
            </div>
          </div>
        </div>
  );
}

export default App;
