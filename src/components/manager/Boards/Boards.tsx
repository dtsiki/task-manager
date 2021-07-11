import React, { ChangeEvent, useMemo, useState } from 'react';

import { IBoard, IBoardItem } from './../../../interfaces';
import Button from './../../base/Button';
import Input from './../../base/Input';
import Radio from './../../base/Radio';

import './style.scss';

const Boards: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [boards, setBoards] = useState<IBoard[]>([]);

  const changeTitle = (name: string, value: string) => {
    console.log(name, value)
    setTitle(value);
  };

  const addBoard = () => {
    const newBoard: IBoard = {
      id: Date.now(),
      title: title || `Board ${boards.length + 1}`,
      items: [
        {
          id: Date.now(),
          label: 'Don`t worry',
          isChecked: false,
        },
        {
          id: Date.now() + 1,
          label: 'Be happy',
          isChecked: true,
        },
      ],
    }

    setBoards((prev) => [...prev, newBoard]);
    setTitle('');
  };

  const toggleItemStatus = () => {}

  const renderBoards = useMemo(() => {
    return boards.map((board: IBoard) => {
      const { id, title, items } = board;
      return (
        <li key={id} className="board">
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
        </li>
      );
    });
  }, [boards]);

  return (
    <ul className="boards">
      <li className="board board--initial">
        <Input
          value={title}
          onChange={changeTitle}
          placeholder="Board title"
          label="Create new board"
        />
        <Button onClick={addBoard}>Add new board</Button>
      </li>
      {renderBoards}
    </ul>
  );
};

export default Boards;
