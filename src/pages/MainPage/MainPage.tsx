import { Header } from "../../components/Header/Header";
import Button from "../../ui/Button/Button";
import { MySwiper } from "../../ui/Swiper/Swiper";
import "./style.scss";

export default function MainPage() {
  return (
    <>
      <Header></Header>
      <div className="main-page__container">
        <div className="heading__container">
          <div className="heading__wrapper">
            <div className="heading__title">
              Смотрите и обсуждайте любимые фильмы
            </div>
            <div className="heading__registration">
              <Button text={"Регистрация"} isDarkBackground></Button>
              <div className="registation__desc">
                Зарегистрируйтесь и получите 14 дней подписки
              </div>
            </div>
          </div>
        </div>
        <div className="prices__container">
          <div className="prices__title">
            Выберите подходящую для вас подписку:
          </div>
          <div className="prices__subscribes">
            <div className="subscribe__item">
              <div className="subscribe__header">1 месяц:</div>
              <p className="subscribe__price">300 руб/месяц</p>
              <Button text={"Купить"} isDarkBackground></Button>
            </div>
            <div className="subscribe__item">
              <div className="subscribe__header">1 месяц:</div>
              <p className="subscribe__price">300 руб/месяц</p>
              <Button text={"Купить"} isDarkBackground></Button>
            </div>
            <div className="subscribe__item">
              <div className="subscribe__header">1 месяц:</div>
              <p className="subscribe__price">300 руб/месяц</p>
              <Button text={"Купить"} isDarkBackground></Button>
            </div>
          </div>
        </div>
        <div className="main-swiper__container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum
          ea perferendis quo assumenda labore explicabo adipisci consequatur
          fugit saepe ut tenetur fuga libero, maiores omnis eius iste minima
          fugiat.
        </div>
      </div>
    </>
  );
}
