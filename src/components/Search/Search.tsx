import SearchButtons from 'ui-lib/Buttons/SearchButtons/SearchButtons';
import { searchIcon, filterIcon } from 'assets/icons';
import { useSelector } from 'services/hooks';
import React from 'react';
import styles from './Search.module.scss';
import SearchFilter from '../SearchFilter/SearchFilter';

const Search = () => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  const currentUser = useSelector((state) => state.user);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  const handleToggleEditMenu = () => {
    if (isMenuOpened) {
      setIsMenuOpened(false);
    } else {
      setIsMenuOpened(true);
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      handleToggleEditMenu();
    }
  };

  return (
    <>
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          className={styles.search__find}
          placeholder='Ключевые слова, #, дата создания'
        />
        <SearchButtons type='submit' src={searchIcon} position='search' />
      </form>
      {currentUser.is_team_lead && (
        <div>
          {isMenuOpened && <SearchFilter />}
          <div
            onClick={handleToggleEditMenu}
            onKeyDown={handleKeyDown}
            role='button'
            tabIndex={0}
          >
            <SearchButtons
              type='button'
              src={filterIcon}
              position='filter'
              onClick={handleToggleEditMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
