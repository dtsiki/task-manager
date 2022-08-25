import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { IBoard, ITask } from '../../../interfaces';
import Input from '../../base/Input';
import FormAddTask from '../FormAddTask';
import BoardMenu from '../BoardMenu';
import Task from '../Task';

import './style.scss';

export enum DragAndDropVariant {
  NONE = 'none',
  TASK = 'task',
  BOARD = 'board'
}

interface Props {
  deleteBoard: (id: number) => void,
  addTask: (id: number, task: string) => void,
  setCurrentBoard: (id: number) => void,
  currentBoard: number,
  setBoards: React.Dispatch<React.SetStateAction<any>>,
  boards: Array<IBoard>,
  tasks: Array<ITask>,
  changeTaskBoard: (taskId: number, boardId: number) => void,
  selectedTask: number,
  setSelectedTask: (id: number) => void,
  dragAndDrop: DragAndDropVariant,
  setDragAndDrop: (variant: DragAndDropVariant) => void
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
  setCurrentBoard,
  changeTaskBoard,
  selectedTask,
  setSelectedTask,
  dragAndDrop,
  setDragAndDrop
}: Props & IBoard) => {
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [localTitle, setLocalTitle] = useState<string>(title);

  const getOrderById = (boardId: number): number => {
    const result = boards.find((board) => board.id === boardId);

    if (result) {
      return result.order;
    }

    return 0;
  };

  const handleTask = (task: string): void => {
    addTask(id, task);
  };

  const handleDragBoardStart = (): void => {
    setDragAndDrop(DragAndDropVariant.BOARD);
    setCurrentBoard(id);
  };

  const handleDragTaskStart = (taskId: number): void => {
    setDragAndDrop(DragAndDropVariant.TASK);
    setSelectedTask(taskId);
  };

  const handleDragEnd = (): void => {
    if (dragAndDrop === DragAndDropVariant.BOARD) {
      setCurrentBoard(0);
    }

    if (dragAndDrop === DragAndDropVariant.TASK) {
      setSelectedTask(0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();

    if (dragAndDrop === DragAndDropVariant.BOARD) {
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
    }

    if (dragAndDrop === DragAndDropVariant.TASK) {
      changeTaskBoard(selectedTask, Number(e.currentTarget.id))
    }
  };

  const changeLocalTitle = (value: string): void => {
    setLocalTitle(value);
  };

  const updateTitle = (): void => {
    setEditTitle(false);
  };

  const archiveBoard = (): void  => {
    //@todo: archive board by id
  };

  const renderTasks = useMemo(() => {
    return tasks.map((task: ITask) => {
      const { id } = task;

      return (
        <li
          key={id}
          id={DragAndDropVariant.TASK}
          draggable
          onDragStart={() => handleDragTaskStart(id)}
          className='board__item'>
          <Task task={task} />
        </li>
      );
    });
  }, [tasks, handleTask, boards]);

  return (
    <li
      id={id.toString()}
      className='boards__item'
      onDragEnd={() => handleDragEnd()}
      onDragOver={(e: React.DragEvent<HTMLLIElement>) => handleDragOver(e)}
      onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e)}>
      <div
        className={`board${currentBoard === id ? ' board--selected' : ''}`}>
        <BoardMenu
          deleteBoard={deleteBoard}
          id={id} />
        <div
          className='board__header'
          draggable
          onDragStart={() => handleDragBoardStart()}>
          {!editTitle && (
            <div className='board__heading'>
              <h3 className='board__title'>{title}</h3>
              <button
                onClick={() => setEditTitle(!editTitle)}
                className='board__button board__button--edit-title'>
                <span className='board__icon'>
                  <FontAwesomeIcon icon={faPen} />
                </span>
                <span className='visually-hidden'>Edit board title</span>
              </button>
            </div>
          )}
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
        <div
          className='board__body'>
          {tasks.length ? (
            <ul className='board__tasks'>{renderTasks}</ul>
          ) : (
            <div className='board__note'>There are no tasks</div>
          )}
        </div>
        <div className='board__footer'>
          <FormAddTask handleTask={handleTask} />
        </div>
      </div>
    </li>
  );
};

export default Board;
