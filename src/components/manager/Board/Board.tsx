import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo, useState } from 'react';

import { IBoard, IBoardItem } from './../../../interfaces';
import Button from './../../base/Button';
import Input from './../../base/Input';
import Radio from './../../base/Radio';

import './style.scss';

interface Props {
  deleteBoard: (id: number) => void,
}

const Board: React.FC<Props & IBoard> = ({ id, title, items, deleteBoard }) => {
  const [task, setTask] = useState<string>('');
  const toggleItemStatus = () => {};

  const changeTask = (value: string) => {
    console.log('change task value ', value)
    setTask(value);
  };

  const addTask = (id: number) => {
    console.log('Add task to board #', id, task)
  };

  return (
    <li className="board">
      <h3>{title}</h3>
      {items.length ? (
        <ul>
          {items.map((item: IBoardItem) => {
            const { id, label, isChecked } = item;
            return (
              <li key={id} className="board__item">
                <Radio
                  wrapperClassName=""
                  label={label}
                  value={id}
                  changeValue={toggleItemStatus}
                  radioName={id}
                  checked={isChecked}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div>Board has no items</div>
      )}
      <form>
        <Input
          value={task}
          onChange={changeTask}
          placeholder="Enter new task"
          label="Add new task"
        />
        <Button onClick={() => addTask(id)}>Add</Button>
      </form>
      <Button onClick={() => deleteBoard(id)} variant="secondary" buttonClassName="board__button board__button--delete" icon={<FontAwesomeIcon icon={faTimes} />}>
        <span className="visually-hidden">Delete board</span>
      </Button>
    </li>
  )
};

export default Board;
