import { useContext, useMemo, useCallback } from 'react';
import styles from './Card.module.css';
import { DinoImage } from './DinoImage/DinoImage';
import { AsteroidContext } from './AsteroidCardContent/AsteroidContext';
import { AsteroidCardImage } from './AsteroidCardImage/AsteroidCardImage';
import { AsteroidCardAction } from './AsteroidCardAction/AsteroidCardAction';
import { AsteroidCardContentContainer } from './AsteroidCardContent/AsteroidCardContentContainer';



type Distance = {
  kilometers: number;
  lunar: number;
};

type AsteroidCardProps = {
  id: string;
  name: string;
  date: string;
  distance: Distance;
  size: number;
  isDangerous: boolean;
};


export const AsteroidCard = ({ id, name, date, distance, size, isDangerous,}: AsteroidCardProps) => {
  const context = useContext(AsteroidContext);

  const isAlreadyDestroyed = useMemo(() => context?.destroyment.some((item) => item.id === id) || false,
    [context?.destroyment, id]
  );

  const handleAddAsteroid = useCallback(() => {
    if (context) {
      context.addAsteroid({ id, name, date, distance, size, isDangerous });
    } 
  }, [ context, id, name, date, distance, size, isDangerous  ]);

  const cardClass = `${styles.card} ${isDangerous ? styles.cardRed : styles.regularCard}`;

  return (
    <div
      className={cardClass}
      role="article"
      aria-label={`Asteroid ${name}, ${isDangerous ? 'dangerous' : 'safe'}. Distance: ${distance.kilometers} km.`}
    >
      <div className={styles.content}>
        <AsteroidCardImage size={size} />
        <DinoImage />
      </div>
      <AsteroidCardContentContainer
        name={name}
        distance={distance}
        size={size}
        date={date}
      />
      <AsteroidCardAction
        isDangerous={isDangerous}
        onClick={handleAddAsteroid}
        isDisabled={isAlreadyDestroyed}
      />
    </div>
  );
};

