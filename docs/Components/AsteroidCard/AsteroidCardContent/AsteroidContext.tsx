import { createContext, FC, ReactNode, useState, useMemo, useCallback } from 'react';

type Asteroid = {
  id: string;
  name: string;
  date: string;
  distance: {
    kilometers: number;
    lunar: number;
  };
  size: number;
  isDangerous: boolean;
};

type AsteroidContextValue = {
  onlyDangerous: boolean;
  setOnlyDangerous: (value: boolean) => void;
  distanceMode: boolean;
  setDistanceMode: (value: boolean) => void;
  destroyment: Asteroid[];
  addAsteroid: (asteroid: Asteroid) => void;
  deleteAsteroid: (id: string) => void;
  hasAsteroid: (id: string) => boolean;
};

export const AsteroidContext = createContext<AsteroidContextValue | undefined>(undefined);

type AsteroidContextProviderProps = {
  children?: ReactNode;
};

export const AsteroidContextProvider: FC<AsteroidContextProviderProps> = ({ children }) => {
  const [onlyDangerous, setOnlyDangerous] = useState(false);
  const [distanceMode, setDistanceMode] = useState(true);
  const [destroyment, setDestroyment] = useState<Asteroid[]>([]);

   const addAsteroid = useCallback((asteroid: Asteroid) => {
    setDestroyment((prev) => {
      if (prev.some((item) => item.id === asteroid.id)) {
        return prev;
      }
      return [...prev, asteroid];
    });
  }, []);

  const deleteAsteroid = useCallback((id: string) => {
    setDestroyment((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const hasAsteroid = useCallback((id: string): boolean => {
    return destroyment.some((item) => item.id === id);
  }, [destroyment]);

  const value = useMemo(
    (): AsteroidContextValue => ({
      onlyDangerous,
      setOnlyDangerous,
      distanceMode,
      setDistanceMode,
      destroyment,
      addAsteroid,
      deleteAsteroid,
      hasAsteroid,
    }),
    [
      onlyDangerous,
      distanceMode,
      destroyment,
      addAsteroid,
      deleteAsteroid,
      hasAsteroid,
    ]
  );

  return (
    <AsteroidContext.Provider value={value}>
      {children}
    </AsteroidContext.Provider>
  );
};
