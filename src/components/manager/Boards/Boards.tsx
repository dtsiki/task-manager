import React, { useCallback, useMemo, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TasksContext from '../../../contexts/TasksContext';
import { IBoard, ITask } from '../../../interfaces';
import Button from '../../base/Button';
import Input from '../../base/Input';
import Board from '../Board';

import './style.scss';

const Boards: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [showNewBoardField, setShowNewBoardField] = useState<boolean>(false);
  const [currentBoard, setCurrentBoard] = useState<number>(0);

  const changeTitle = (value: string): void => {
    setTitle(value);
  };

  const addBoard = (e: React.FormEvent): void => {
    e.preventDefault();

    const newBoard: IBoard = {
      id: Date.now(),
      title: title || `Board ${boards.length + 1}`,
      order: boards.length + 1
    };

    setBoards((prev) => [...prev, newBoard]);
    setTitle('');
  };

  const deleteBoard = useCallback((id: number) => {
    const updatedBoards = boards.filter((board) => board.id !== id);

    setBoards(updatedBoards);
  }, [boards]);

  const addTask = useCallback((id: number, task: string) => {
    const newTask: ITask = {
      id: Date.now(),
      title: task,
      isCompleted: false,
      boardId: id
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, [boards]);

  const sortBoards = (prevBoard: IBoard, nextBoard: IBoard): number => {
    if (prevBoard.order > nextBoard.order) return 1;

    return -1;
  };

  const sortTasks = useCallback((id: number) => {
    return tasks.filter((task) => task.boardId === id);
  }, [tasks]);

  const renderBoards = useMemo(() => {
    return boards.sort(sortBoards)
      .map((board: IBoard) => {
        const { id: boardId, title: boardTitle, order } = board;

        return (
          <Board
            key={`board-${boardId}-${boardTitle}`}
            id={boardId}
            title={boardTitle}
            tasks={sortTasks(boardId)}
            deleteBoard={deleteBoard}
            addTask={addTask}
            order={order}
            setCurrentBoard={setCurrentBoard}
            currentBoard={currentBoard}
            setBoards={setBoards}
            boards={boards}
          />
        );
      });
  }, [boards, deleteBoard, addTask, currentBoard, tasks]);

  return (
    <TasksContext.Provider value={{ tasks, boards, setTasks }}>
      <ul className='boards'>
        <li className='board board--initial'>
          {showNewBoardField ? (
            <div className='board__form'>
              <Input
                value={title}
                onChange={changeTitle}
                placeholder='Board title'
                label='Create new board'
              />
              <div className='flex'>
                <Button onClick={addBoard}>Add</Button>
                <Button
                  onClick={() => setShowNewBoardField(!showNewBoardField)}
                  variant='secondary'
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowNewBoardField(!showNewBoardField)}
              icon={<FontAwesomeIcon icon={faPlus} />}
              buttonClassName='boards__button boards__button--create-new'
            >
              <span className='visually-hidden'>Create new board</span>
            </Button>
          )}
        </li>
        {renderBoards}
      </ul>
    </TasksContext.Provider>
  );
};

export default Boards;
