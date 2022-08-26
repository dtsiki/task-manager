import React, { useRef, useState } from 'react';
import { useStoreon } from 'storeon/react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { ManagerEvent } from '../../../store/manager';
import { IBoard } from '../../../interfaces';

import './style.scss';

interface Props {
  board: IBoard
}

const BoardMenu: React.FC<Props> = ({ board }: Props) => {
  const { dispatch } = useStoreon();

  const { id, isArchived } = board;

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  const toggleArchive = (): void => {
    const updatedBoard = {
      ...board,
      isArchived: !isArchived
    };

    dispatch(ManagerEvent.UPDATE_BOARD, updatedBoard);
    closeBoardMenu();
  };

  const deleteBoard = (): void => {
    dispatch(ManagerEvent.DELETE_BOARD, id);
  };

  const closeBoardMenu = (): void => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  useOnClickOutside(ref, () => closeBoardMenu());

  return (
    <nav
      ref={ref}
      className='board-settings'>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className='board-settings__toggle'>
        <span className='visually-hidden'>{showMenu ? 'Hide' : 'Open'}</span>
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
      <div className={`board-settings__menu board-menu board-menu--${showMenu ? 'opened' : ''}`}>
        <ul className='board-menu__list'>
          <li className='board-menu__item'>
            <button
              className='board-menu__button'
              onClick={toggleArchive}>
              {isArchived ? 'Unarchive board' : 'Archive board'}
            </button>
          </li>
          <li className='board-menu__item'>
            <button
              className='board-menu__button'
              onClick={deleteBoard}>
              Delete board
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BoardMenu;
