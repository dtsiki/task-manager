import React, { useCallback, useContext, useMemo, useState } from 'react';

import { IBoard, ITask } from '../../../interfaces';
import Input from '../../base/Input';
import Toggle from '../../base/Toggle';
import AddTaskField from '../AddTaskField';
import BoardMenu from '../BoardMenu';
import TasksContext from '../../../contexts/TasksContext';

import './style.scss';

interface Props {
  deleteBoard: (id: number) => void,
  addTask: (id: number, task: string) => void,
  setCurrentBoard: (id: number) => void,
  currentBoard: number,
  setBoards: React.Dispatch<React.SetStateAction<any>>,
  boards: Array<IBoard>,
  tasks: Array<ITask>
}

const Board: React.FC<Props & IBoard> = ({
  id,
  title,
  tasks,
  order,
  currentBoard,
  boards,
  setBoards,
  deleteBoard,
  addTask,
  setCurrentBoard
}: Props & IBoard) => {
  const { setTasks } = useContext(TasksContext);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [localTitle, setLocalTitle] = useState<string>(title);

  const toggleItemStatus = useCallback((task: ITask) => {

    const updatedTasks = tasks.filter((tasksItem) => {
      if (tasksItem.id === task.id) tasksItem.isCompleted = !tasksItem.isCompleted;
      return tasksItem;
    });

    console.log('toggle status', updatedTasks)

    setTasks(updatedTasks);
  }, [tasks, boards]);

  const handleTask = (task: string): void => {
    addTask(id, task);
  };

  const handleDragStart = (): void => {
    console.log('drag start')
    setCurrentBoard(id);
  };

  const handleDragEnd = (): void => {
    setCurrentBoard(0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();
  };

  const getOrderById = (boardId: number): number => {
    const result = boards.find((board) => board.id === boardId);

    if (result) {
      return result.order;
    }

    return 0;
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();

    if (id === currentBoard) return;

    const updatedBoards = [...boards];

    const currentOrder = getOrderById(currentBoard);
    const prevOrder = getOrderById(id);

    updatedBoards.forEach((board) => {
      if (board.id === currentBoard) {
        board.order = prevOrder;
      }

      if (board.id === id) {
        board.order = currentOrder;
      }
    });

    setBoards(updatedBoards);
  };

  const archiveBoard = (): void  => {
    console.log('archive board');
  };

  const changeLocalTitle = (value: string): void => {
    setLocalTitle(value);
  };

  const updateTitle = (): void => {
    setEditTitle(false);
  };

  const renderTasks = useMemo(() => {
    return tasks.map((task: ITask) => {
      const { id: itemId, title, isCompleted } = task;

      return (
        <li
          key={itemId}
          className='board__item task'>
          <Toggle
            label={title}
            value={itemId}
            changeValue={() => toggleItemStatus(task)}
            toggleName={itemId}
            checked={isCompleted}
            wrapperClassName='task__toggle'
          />
        </li>
      );
    });
  }, [tasks, toggleItemStatus, handleTask, boards]);

  return (
    <li
      className={`board${currentBoard === id ? ' board--selected' : ''}`}
      draggable
      onDragStart={() => handleDragStart()}
      onDragEnd={() => handleDragEnd()}
      onDragOver={(e: React.DragEvent<HTMLLIElement>) => handleDragOver(e)}
      onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e)}
    >
      <BoardMenu
        deleteBoard={deleteBoard}
        id={id} />
      <div className='board__header'>
        {!editTitle && (
          <h3 className='board__title'>
            {title}
          </h3>
        )}
        <button
          onClick={() => setEditTitle(!editTitle)}
          className='button board__button board__button--edit'>
          <span className='visually-hidden'>
            Edit board title
          </span>
        </button>
        {editTitle && (
          <div className='edit-title-field'>
            <Input
              value={localTitle}
              onChange={changeLocalTitle}
              placeholder='Enter board title'
              label='Edit board title'
              invertFocus
            />
            <button
              onClick={() => setEditTitle(false)}
              className='button button--secondary'>
              Cancel
            </button>
            <button
              className='button button--tertiary'
              onClick={() => updateTitle()}>
              Save
            </button>
          </div>
        )}
      </div>
      <div className='board__body'>
        {tasks.length ? (
          <ul className='board__tasks'>{renderTasks}</ul>
        ) : (
          <div className='board__note'>There are no tasks</div>
        )}
      </div>
      <div className='board__footer'>
        <AddTaskField handleTask={handleTask} />
      </div>
    </li>
  );
};

export default Board;
