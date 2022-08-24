import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { ITask } from '../../../interfaces';
import Input from '../../base/Input';

import './style.scss';

interface Props {
  task: ITask
}

const Task: React.FC<Props> = ({ task }: Props) => {
  const { id, title } = task;

  const [editTask, setEditTask] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const changeTitle = (value: string): void => {
    setNewTitle(value);
  };

  const updateTask = (): void => {
    //update task by id
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
