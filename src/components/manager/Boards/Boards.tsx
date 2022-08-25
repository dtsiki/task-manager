import React, { useCallback, useMemo, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IBoard, ITask } from '../../../interfaces';
import Input from '../../base/Input';
import Board from '../Board';
import { DragAndDropVariant } from '../Board/Board';

import './style.scss';

const initialBoards = [
  {
    id: 1,
    title: 'To do',
    order: 1
  },
  {
    id: 2,
    title: 'Doing',
    order: 2
  },
  {
    id: 3,
    title: 'Done',
    order: 3
  }
];

const initialTasks = [
  {
    id: 1,
    title: 'Don`t worry',
    boardId: 1
  },
  {
    id: 2,
    title: 'Be happy',
    boardId: 1
  },
  {
    id: 3,
    title: 'Do the best',
    boardId: 2
  },
  {
    id: 4,
    title: 'Stress',
    boardId: 3
  },
  {
    id: 5,
    title: 'Waste time',
    boardId: 3
  },
  {
    id: 6,
    title: 'Focus on the negative',
    boardId: 3
  }
];

const Boards: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [boards, setBoards] = useState<Array<IBoard>>([...initialBoards]);
  const [tasks, setTasks] = useState<Array<ITask>>([...initialTasks]);
  const [showNewBoardField, setShowNewBoardField] = useState<boolean>(false);
  const [currentBoard, setCurrentBoard] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<number>(0);
  const [dragAndDrop, setDragAndDrop] = useState<DragAndDropVariant>(DragAndDropVariant.NONE);

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

    setBoards((prev: Array<IBoard>) => [...prev, newBoard]);
    setTitle('');
  };

  const deleteBoard = useCallback((id: number) => {
    const updatedBoards = boards.filter((board: IBoard) => board.id !== id);

    setBoards(updatedBoards);
  }, [boards]);

  const addTask = useCallback((id: number, task: string) => {
    const newTask: ITask = {
      id: Date.now(),
      title: task,
      boardId: id
    };

    setTasks((prevTasks: Array<ITask>) => [...prevTasks, newTask]);
  }, [boards]);

  const sortBoards = (prevBoard: IBoard, nextBoard: IBoard): number => {
    if (prevBoard.order > nextBoard.order) return 1;

    return -1;
  };

  const changeTaskBoard = (taskId: number, boardId: number): void => {
    const updatedTasks = tasks.map((task: ITask) => {
      if (task.id === taskId) {
        const updatedTask = {
          ...task,
          boardId: boardId
        }

        return updatedTask;
      } else {
        return task;
      }
    });

    setTasks(updatedTasks);
  }

  const sortTasks = useCallback((id: number) => {
    return tasks.filter((task: ITask) => task.boardId === id);
  }, [tasks]);

  const renderBoards = useMemo(() => {
    return boards.sort(sortBoards)
      .map((board: IBoard) => {
        const { id: boardId, title: boardTitle, order } = board;

        return (
          <Board
            key={boardId}
            id={boardId}
            title={boardTitle}
            tasks={sortTasks(boardId)}
            deleteBoard={deleteBoard}
            addTask={addTask}
            order={order}
            setCurrentBoard={setCurrentBoard}
            changeTaskBoard={changeTaskBoard}
            currentBoard={currentBoard}
            setBoards={setBoards}
            boards={boards}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            dragAndDrop={dragAndDrop}
            setDragAndDrop={setDragAndDrop}
          />
        );
      });
  }, [boards, deleteBoard, addTask, currentBoard, tasks, dragAndDrop, selectedTask]);

  const renderInitialBoard = useMemo(() => {
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
  }, [showNewBoardField, title]);

  return (
    <ul className='boards'>
      {renderBoards}
      {renderInitialBoard}
    </ul>
  );
};

export default Boards;
