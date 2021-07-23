import React, { useMemo, useState } from 'react';

import { IBoard } from './../../../interfaces';
import Button from './../../base/Button';
import Input from './../../base/Input';
import Board from './../Board';

import './style.scss';

const Boards: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [boards, setBoards] = useState<IBoard[]>([]);

  const changeTitle = (value: string) => {
    console.log('change title', value)
    setTitle(value);
  };

  const addBoard = (e: React.FormEvent) => {
    e.preventDefault();

    const newBoard: IBoard = {
      id: Date.now(),
      title: title || `Board ${boards.length + 1}`,
      items: [],
    }

    setBoards((prev) => [...prev, newBoard]);
    setTitle('');
  };

  const deleteBoard = (id: number) => {
    const updatedBoards = boards.filter((board) => {
      return board.id !== id;
    });

    setBoards(updatedBoards);
  }

  const renderBoards = useMemo(() => {
    return boards.map((board: IBoard) => {
      const { id, title, items } = board;

      return (
        <Board
          key={`board-${id}-${title}`}
          id={id}
          title={title}
          items={items}
          deleteBoard={deleteBoard}
        />
      );
    });
  }, [boards]);

  return (
    <ul className="boards">
      <li className="board board--initial">
        <form onSubmit={addBoard}>
          <Input
            value={title}
            onChange={changeTitle}
            placeholder="Board title"
            label="Create new board"
          />
          <Button>Add new board</Button>
        </form>
      </li>
      {renderBoards}
    </ul>
  );
};

export default Boards;
