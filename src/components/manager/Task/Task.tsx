import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';

import { ITask } from '../../../interfaces';
import { ManagerEvent } from '../../../store/manager';
import Input from '../../base/Input';

import './style.scss';

interface Props {
  task: ITask
}

const Task: React.FC<Props> = ({ task }: Props) => {
  const { title } = task;

  const { dispatch } = useStoreon('tasks');
  const [editTask, setEditTask] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const changeTitle = (value: string): void => {
    setNewTitle(value);
  };

  const updateTask = (): void => {
    const updatedTask: ITask = {
      ...task,
      title: newTitle
    };

    dispatch(ManagerEvent.UPDATE_TASK, updatedTask);
  };

  const deleteTask = (): void => {
    dispatch(ManagerEvent.DELETE_TASK, task);
  };

  return (
    <div className='task'>
      {!editTask ? (
        <>
          <div className='task__body'>
            {title}
          </div>
          <button
            onClick={() => setEditTask(true)}
            className='task__button task__button--edit-task'>
            <FontAwesomeIcon icon={faPen} />
            <span className='visually-hidden'>Edit task</span>
          </button>
        </>
      ) : (
        <div className='task__editor'>
          <Input
            value={newTitle}
            onChange={changeTitle}
            placeholder='Enter task title'
            label='Enter task title'
            isLabelVisuallyHidden
          />
          <div className='task__actions'>
            <button
              onClick={() => deleteTask()}
              className='button button--secondary'>
              Delete
            </button>
            <button
              onClick={() => setEditTask(!editTask)}
              className='button button--secondary'>
              Cancel
            </button>
            <button
              className='button button--primary'
              onClick={() => updateTask()}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
