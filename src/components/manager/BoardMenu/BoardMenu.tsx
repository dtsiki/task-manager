import React, { useRef, useState } from 'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useOnClickOutside from '../../../hooks/useOnClickOutside';

import './style.scss';

interface Props {
  deleteBoard: (id: number) => void,
  id: number,
}

const BoardMenu: React.FC<Props> = ({ id, deleteBoard }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const archiveBoard = (): void => {
    //@todo: archive board by id
  };

  const closeBoardMenu = (): void => {
    if (showMenu) {
      setShowMenu(false);
    }
  }

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
              onClick={archiveBoard}>
              Archive board
            </button>
          </li>
          <li className='board-menu__item'>
            <button
              className='board-menu__button'
              onClick={() => deleteBoard(id)}>
              Delete board
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BoardMenu;
