import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IBoard } from '../../../interfaces';
import Input from '../../base/Input';
import { ManagerEvent } from '../../../store/manager';

const InitialBoard: React.FC = () => {
  const { dispatch, boards } = useStoreon('tasks', 'boards');

  const [title, setTitle] = useState<string>('');
  const [showNewBoardField, setShowNewBoardField] = useState<boolean>(false);

  const changeTitle = (value: string): void => {
    setTitle(value);
  };

  const addBoard = (e: React.FormEvent): void => {
    e.preventDefault();

    const newBoard: IBoard = {
      id: Date.now(),
      title: title || `Board ${boards.length + 1}`,
      order: boards.length + 1,
      isArchived: false
    };

    dispatch(ManagerEvent.ADD_BOARD, newBoard);
    setTitle('');
  };

  return (
    <li className='boards__item'>
      <div className='board board--initial'>
        {showNewBoardField ? (
          <div className='board__form'>
            <div className='board__header'>
              <h2 className='board__title'>
                Create new board
              </h2>
            </div>
            <div className='board__footer'>
              <Input
                value={title}
                onChange={changeTitle}
                placeholder='Enter new board title'
                label='Create new board'
                isLabelVisuallyHidden
              />
              <div className='flex'>
                <button
                  onClick={() => setShowNewBoardField(!showNewBoardField)}
                  className='button button--secondary'
                >
                  Cancel
                </button>
                <button
                  className='button button--primary'
                  onClick={addBoard}>
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            className='board__button board__button--create-new-board'
            onClick={() => setShowNewBoardField(!showNewBoardField)}
          >
            <FontAwesomeIcon icon={faPlus} />
            Create new board
          </button>
        )}
      </div>
    </li>
  )
};

export default InitialBoard;
