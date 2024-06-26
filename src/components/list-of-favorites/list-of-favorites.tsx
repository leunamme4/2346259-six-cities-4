import { Link } from 'react-router-dom';
import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type ListFavoritesProps = {
  favorites: Offer[];
}


function ListFavorites({favorites}: ListFavoritesProps): JSX.Element {
  const favoritesMap = favorites.reduce(
    (acc: Record<string, Offer[]>, place: Offer) => {
      const city = place.city.name;
      acc[city] = [...(acc[city] ?? []), place];
      return acc;
    },
    {}
  );
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.keys(favoritesMap).map((city) => (
          <li className="favorites__locations-items" key={city} data-testid={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="#">
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {favoritesMap[city].map((place) => (
                <OfferCard key={place.id} offerCardInfo={place} offerCardType={'typical'}/>
              ))}
            </div>
          </li>
        ))}

      </ul>
    </section>
  );
}

export default ListFavorites;
