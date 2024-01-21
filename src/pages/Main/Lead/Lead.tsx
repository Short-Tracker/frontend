import Search from 'components/Search/Search';
import SideBar from 'components/SideBar/SideBar';
import Tasks from 'pages/Tasks/Tasks';
import React, { FC, useState } from 'react';
import { UniversalButton } from 'ui-lib/Buttons';
import Status from 'components/Status/Status';
import CreateTaskPopup from 'components/Popup/CreateTaskPopup/CreateTaskPopup';
import { TTask } from 'types/types';
import { v4 as uuidv4 } from 'uuid';
import styles from './Lead.module.scss';

interface ITaskCard {
  allTasks: TTask;
}

const Lead: FC<ITaskCard> = (props) => {
  const { allTasks } = props;
  const { count, results } = allTasks;
  const [isCreateTaskPopupOpen, setCreateTaskPopupOpen] = useState(false);

  const handleOpenCreateTaskPopup = () => {
    setCreateTaskPopupOpen(true);
  };

  return (
    <div className={styles.Lead__container}>
      <SideBar />
      <div className={styles.Lead__tasks}>
        <div className={styles.Lead__serchContainer}>
          <Search />
          <UniversalButton onClick={handleOpenCreateTaskPopup}>
            Создать задачу
            {isCreateTaskPopupOpen && (
              <CreateTaskPopup onClose={() => setCreateTaskPopupOpen(false)} />
            )}
          </UniversalButton>
        </div>
        <Status />
        {results.map(() => (
          <Tasks key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};
export default Lead;
