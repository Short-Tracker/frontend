import styles from './SearchButtons.module.scss';

interface SearchButtonsProps extends React.ComponentPropsWithoutRef<'button'> {
  type: 'submit' | 'reset' | 'button' | undefined;
  src: string;
  position: string;
}

const SearchButtons = ({ type, src, position }: SearchButtonsProps) => (
  <button
    className={`${styles.button} ${position === 'search' ? styles.button__search : ''}`}
    type={type}
  >
    <img src={src} className={styles.image} alt="Поиск" />
  </button>
);

export default SearchButtons;
