import React, { useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { IBoard, ITask } from '../../../interfaces';
import Input from '../../base/Input';
import FormAddTask from '../FormAddTask';
import BoardMenu from '../BoardMenu';
import Task from '../Task';
import { ManagerEvent } from '../../../store/manager';

import './style.scss';

export enum DragAndDropVariant {
  NONE = 'none',
  TASK = 'task',
  BOARD = 'board'
}

interface Props {
  board: IBoard,
  tasks: Array<ITask>,
  selectedBoard: number,
  setSelectedBoard: (id: number) => void,
  selectedTask: number,
  setSelectedTask: (id: number) => void,
  dragAndDrop: DragAndDropVariant,
  setDragAndDrop: (variant: DragAndDropVariant) => void,
}

const Board: React.FC<Props> = ({
  board,
  tasks,
  selectedBoard,
  setSelectedBoard,
  selectedTask,
  setSelectedTask,
  dragAndDrop,
  setDragAndDrop
}: Props) => {
  const { dispatch, boards } = useStoreon('boards');
  const { id, title } = board;

  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [localTitle, setLocalTitle] = useState<string>(title);

  const getBoardOrderById = (boardId: number): number => {
    const result = boards.find((item: IBoard) => item.id === boardId);

    return result ? result.order : 0;
  };

  const handleDragBoardStart = (): void => {
    setDragAndDrop(DragAndDropVariant.BOARD);
    setSelectedBoard(id);
  };

  const handleDragTaskStart = (taskId: number): void => {
    setDragAndDrop(DragAndDropVariant.TASK);
    setSelectedTask(taskId);
  };

  const handleDragEnd = (): void => {
    if (dragAndDrop === DragAndDropVariant.BOARD) {
      setSelectedBoard(0);
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
      if (id === selectedBoard) return;

      const updatedBoards = [...boards];

      const currentOrder = getBoardOrderById(selectedBoard);
      const prevOrder = getBoardOrderById(id);

      updatedBoards.forEach((item: IBoard) => {
        if (item.id === selectedBoard) {
          item.order = prevOrder;
        }

        if (item.id === id) {
          item.order = currentOrder;
        }
      });

      dispatch(ManagerEvent.SET_BOARDS, updatedBoards)
    }

    if (dragAndDrop === DragAndDropVariant.TASK) {
      dispatch(ManagerEvent.DROP_TASK_TO_BOARD, {
        taskId: selectedTask,
        boardId: Number(e.currentTarget.id)
      });
    }
  };

  const changeLocalTitle = (value: string): void => {
    setLocalTitle(value);
  };

  const updateTitle = (): void => {
    setEditTitle(false);
  };

  const renderTasks = useMemo(() => {
    return tasks.map((task: ITask) => {
      const { id: taskId } = task;

      return (
        <li
          key={taskId}
          id={DragAndDropVariant.TASK}
          draggable
          onDragStart={() => handleDragTaskStart(taskId)}
          className='board__item'>
          <Task task={task} />
        </li>
      );
    });
  }, [tasks, boards]);

  return (
    <li
      id={id.toString()}
      className='boards__item'
      onDragEnd={() => handleDragEnd()}
      onDragOver={(e: React.DragEvent<HTMLLIElement>) => handleDragOver(e)}
      onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e)}>
      <div className={`board${selectedBoard === id ? ' board--selected' : ''}`}>
        <BoardMenu board={board} />
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
          <FormAddTask board={board} />
        </div>
      </div>
    </li>
  );
};

export default Board;
