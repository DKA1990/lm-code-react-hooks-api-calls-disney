
// our props have two properties - a number, and a function that takes a number and returns void
// we can define this as an interface, or anonymously like this:
const Navigation : React.FC<{ currentPage: number, setCurrentPage: (page: number) => void, currentlyShowFavourites: boolean, onlyFavourites: (toggle: boolean) => void, favButtonText : string, updateFavButtonText: (text: string) => void }> 
	= ({ currentPage, setCurrentPage, currentlyShowFavourites, onlyFavourites, favButtonText, updateFavButtonText }) => {

    const nextPage = () => {
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber);
    }

    const prevPage = () => {
        if (currentPage > 1) {
            const newPageNumber = currentPage - 1;
            setCurrentPage(newPageNumber);
        }
    }

    const showFavourites = () => {
        if (currentlyShowFavourites) {
            setCurrentPage(1);
            onlyFavourites(false);
            updateFavButtonText('Show Favourites');
        } else {
            onlyFavourites(true);
            updateFavButtonText('Show All');
        }
    }

    return (
        <div className="navigation">
            <div className="navigation__item">
                <button className="navigation__button" onClick={prevPage}>Prev Page</button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={showFavourites}>{favButtonText}</button>
            </div>
            <div className="navigation__item">
                <button className="navigation__button" onClick={nextPage}>Next Page</button>
            </div>
        </div>

    )
}

export default Navigation;