import React, { useContext } from 'react';
import { FavouritesContext } from '../App';
import { DisneyCharacter } from "../disney_character"

interface CharacterProps{
	character: DisneyCharacter;
	updateFavourites: (favourites: Array<DisneyCharacter>) => void;
}
// for our props we can reuse the DisneyCharacter interface
// - defining an anonymous type that just has one property - a DisneyCharacter
const Character : React.FC<CharacterProps> = ( { character, updateFavourites }) => {

  const characterFavourites = useContext(FavouritesContext);
   
  // Define a default in case the character doesn't have an image
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl) {
    // API seems to include extra path for images so here we strip it off to fetch raw image
    imageSrc = character.imageUrl;//.substring(0, character.imageUrl.indexOf('/revision'));
  }

  function toggleFavouriteForCharacter(character : DisneyCharacter) {
    if (!characterFavourites.find(char => char._id === character._id)) {
        // add to favourites
        updateFavourites([...characterFavourites, character]);
    }
    else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter((char) => char._id !== character._id);
      updateFavourites(updatedFavourites);
    }
    console.log(characterFavourites);
  }

  return (
    <article className="character-item">

      <h2>{character.name}</h2>

      <div className="character-item__actions" onClick={() => toggleFavouriteForCharacter(character)}>
        {!characterFavourites.find(char => char._id === character._id) ? "Add to Favourites" : "Favourited"}
      </div>

      <img className="character-item__img" src={imageSrc} alt={character.name} />

    </article>
  );
}

export default Character;