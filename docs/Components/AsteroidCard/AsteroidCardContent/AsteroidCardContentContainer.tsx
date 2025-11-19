import { useContext } from "react";
import { AsteroidContext} from "./AsteroidContext";
import { AsteroidCardContent } from "./AsteroidCardContent";

export const AsteroidCardContentContainer = (props: {
  name: string;
  date: string;
  distance: { 
    kilometers: number; 
    lunar: number 
};
  size: number;
  
}) => {
  const context = useContext(AsteroidContext);

  if (!context) {
    throw new Error(
      "AsteroidCardContentContainer must be used within AsteroidContextProvider"
    );
  }

  const { distanceMode } = context;

  return (
    <AsteroidCardContent
      {...props}
      distanceMode={distanceMode}
    />
  );
};