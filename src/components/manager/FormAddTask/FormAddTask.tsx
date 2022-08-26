import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Input from '../../base/Input';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { ManagerEvent } from '../../../store/manager';
import { IBoard, ITask } from '../../../interfaces';

import './style.scss';

interface Props {
  board: IBoard
}

const FormAddTask: React.FC<Props> = ({ board }: Props) => {
  const { dispatch } = useStoreon('tasks');
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const changeNewTaskValue = (value: string): void => {
    setTaskTitle(value);
  };

  const addTask = (): void => {
    const task: ITask = {
      id: Date.now(),
      title: taskTitle,
      boardId: board.id
    };

    dispatch(ManagerEvent.ADD_TASK, task);

    setTaskTitle('');
  };

  const closeField = ():void => {
    if (showForm) {
      setShowForm(false);
    }
  };

  useOnClickOutside(ref, () => closeField());

  return (
    <div
      ref={ref}
      className='form-add-task'>
      {showForm && (
        <Input
          value={taskTitle}
          onChange={changeNewTaskValue}
          placeholder='Enter new task, e.g.: be happy'
          label='Add new task'
          isLabelVisuallyHidden
        />
      )}
      <div className='form-add-task__actions'>
        <button
          className={`button form-add-task__button form-add-task__button--${showForm ? 'cancel' : 'add-new-task'}`}
          onClick={() => setShowForm(!showForm)}>
          {!showForm && (
            <FontAwesomeIcon icon={faPlus} />
          )}
          {showForm ? 'Cancel' : 'Add new task'}
        </button>
        {showForm && (
          <button
            className='button form-add-task__button form-add-task__button--add'
            onClick={() => addTask()}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default FormAddTask;
