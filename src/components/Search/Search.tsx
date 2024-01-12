import SearchButtons from 'ui-lib/Buttons/SearchButtons/SearchButtons';
import { searchIcon } from 'assets/icons';
import styles from './Search.module.scss';

const Search = () => {
  return (
    <form className={styles.search}>
      <input
        className={styles.search__find}
        placeholder="Ключевые слова, дата создания"
      />
      <SearchButtons type="submit" src={searchIcon} position="search" />
    </form>
  );
};

export default Search;
