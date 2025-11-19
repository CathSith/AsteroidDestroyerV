
import { useContext, useEffect, useState } from "react";
import styles from './Asteroids.module.css';
import { Header } from "../Components/Header/Header";
import { AsteroidCard } from "../Components/AsteroidCard/AsteroidCard";
import { AsteroidContext } from "../Components/AsteroidCard/AsteroidCardContent/AsteroidContext";

type Asteroid = {
  name: string;
  date: string;
  distance: {
    kilometers: number;
    lunar: number;
  };
  size: number;
  id: string;
  isDangerous: boolean;
};

export const Asteroids = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  
  const context = useContext(AsteroidContext);
  if (!context) {
    throw new Error("Asteroids must be used within AsteroidContextProvider");
  }

  const { onlyDangerous, setOnlyDangerous, setDistanceMode } = context;

  useEffect(() => {
    const fetchAsteroids = async () => {
      try { 
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=oDSSzop6HeE20Rh34PY2z8N8e0cLuIz7HZ2yRcZV`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const rawAsteroids: any[] = [];
        for (const date in data.near_earth_objects) {
          rawAsteroids.push(...data.near_earth_objects[date]);
        }

        const parsedAsteroids: Asteroid[] = rawAsteroids.map((item) => {
          const closeApproach = item.close_approach_data?.[0];
          const estimatedDiameter = item.estimated_diameter?.meters;

          const size = estimatedDiameter
            ? Math.trunc((estimatedDiameter.estimated_diameter_max + estimatedDiameter.estimated_diameter_min) / 2)
            : 0;

          return {
            name: item.name || "Unknown",
            date: closeApproach?.close_approach_date || "Unknown",
            size,
            distance: {
              kilometers: parseFloat(closeApproach?.miss_distance?.kilometers || "0"),
              lunar: parseFloat(closeApproach?.miss_distance?.lunar || "0"),
            },
            isDangerous: item.is_potentially_hazardous_asteroid || false,
            id: item.id || Math.random().toString(),
          };
        });

        console.log("Fetched asteroids:", parsedAsteroids);
        setAsteroids(parsedAsteroids);

      } catch (err) {
        console.error("Failed to fetch asteroids:", err);
        setAsteroids([]);
      }
    };

    fetchAsteroids();
  }, []);

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.filtersWrapper}>
        <div className={styles.showDangerousOnly}>
          <input
            type="checkbox"
            checked={onlyDangerous}
            onChange={() => setOnlyDangerous(!onlyDangerous)}
            className={styles.checkBox}
          />
          Только опасные
        </div>
        <div className={styles.distanceMode}>
          Расстояние:
          <button className={`${styles.distanceChooser} ${context.distanceMode ? styles.active : ''}`}
           onClick={() => setDistanceMode(true)}  >в километрах</button>
          <button className={`${styles.distanceChooser} ${!context.distanceMode ? styles.active : ''}`}
           onClick={() => setDistanceMode(false)} >в ЛД</button>
        </div>
      </div>
      <div>
        {asteroids.length === 0 ? (
          <div>Нет данных об астероидах</div>
        ) : (
          asteroids
            .filter((item) => (onlyDangerous ? item.isDangerous : true))
            .map((item) => <AsteroidCard key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
};
