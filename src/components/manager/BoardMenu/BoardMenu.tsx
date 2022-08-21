import React, { useState } from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../base/Button';

import './style.scss';

interface Props {
  deleteBoard: (id: number) => void,
  id: number,
}

const BoardMenu: React.FC<Props> = ({ id, deleteBoard }: Props) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const archiveBoard = (): void => {
    console.log('acrhive board');
  };

  return (
    <nav className='board-settings'>
      <Button
        onClick={() => setShowMenu(!showMenu)}
        buttonClassName='board-settings__toggle'>
        <span className='visually-hidden'>{showMenu ? 'Hide' : 'Open'}</span>
        <FontAwesomeIcon icon={faEllipsisV} />
      </Button>
      <div className={`board-settings__menu board-menu board-menu--${showMenu ? 'opened' : 'closed'}`}>
        <ul className='board-menu__list'>
          <li className='board-menu__item'>
            <Button
              buttonClassName='board-menu__button'
              onClick={archiveBoard}>Archive board</Button>
          </li>
          <li className='board-menu__item'>
            <Button
              buttonClassName='board-menu__button'
              onClick={() => deleteBoard(id)}>Delete board</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BoardMenu;
