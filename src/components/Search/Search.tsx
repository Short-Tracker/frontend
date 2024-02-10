import SearchButtons from 'ui-lib/Buttons/SearchButtons/SearchButtons';
import { searchIcon, filterIcon } from 'assets/icons';
import { useSelector } from 'services/hooks';
import styles from './Search.module.scss';

const Search = () => {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  const currentUser = useSelector((state) => state.user);

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
        <SearchButtons type='button' src={filterIcon} position='filter' />
      )}
    </>
  );
};

export default Search;
