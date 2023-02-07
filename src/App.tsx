
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import CharacterContainer from './components/character_container';
import Navigation from './components/navigation';
import { DisneyCharacter } from './disney_character';

export const FavouritesContext = React.createContext<DisneyCharacter[]>([]);

const App : React.FC = () => {

	const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Array<DisneyCharacter>>([]);
  const [characterFavourites, setCharacterFavourites] = useState<Array<DisneyCharacter>>([]);

  const [showFavourites, setShowFavourites] = useState<boolean>(false);
  const [favButtonText, setFavButtonText] = useState<string>('Show Favourites');
  
  const getCharacters = async (pageNumber : number) => {
    const apiResponse = await fetch(`http://api.disneyapi.dev/characters?page=${pageNumber}`);
    const json = await apiResponse.json() as { data: DisneyCharacter[] };
    setCharacters(json.data);
  }

  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  let chars: DisneyCharacter[];
  if (showFavourites) {
    chars = characterFavourites;
  } else {
    chars = characters;
  }

  return (
    <FavouritesContext.Provider value={characterFavourites}>
      <div className="page">
        <Header currentPage={currentPage} />
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          currentlyShowFavourites={showFavourites}
          onlyFavourites={setShowFavourites}
          favButtonText={favButtonText}
          updateFavButtonText={setFavButtonText}
        />
        <CharacterContainer          
          characters={chars}          
          updateFavourites={setCharacterFavourites}
        />
      </div>
    </FavouritesContext.Provider>
  );
}

export default App;
