import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import Input from '../../base/Input';

import './style.scss';

interface Props {
  handleTask: (task: string) => void,
}

const AddTaskField: React.FC<Props> = ({ handleTask }: Props) => {
  const [newTask, setNewTask] = useState<string>('');
  const [showField, setShowField] = useState<boolean>(false);

  const changeNewTaskValue = (value: string): void => {
    setNewTask(value);
  };

  const addTask = (): void => {
    handleTask(newTask);

    setNewTask('');
  };

  return (
    <div className='add-task-field'>
      {showField && (
        <Input
          value={newTask}
          onChange={changeNewTaskValue}
          placeholder='Enter new task, e.g.: be happy'
          label='Add new task'
          isLabelVisuallyHidden
        />
      )}
      <div className='add-task-field__actions'>
        <button
          className={`button add-task-field__button add-task-field__button--${showField ? 'cancel' : 'add-new-task'}`}
          onClick={() => setShowField(!showField)}>
          {!showField && (
            <span className='add-task-field__icon'>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          )}
          {showField ? 'Cancel' : 'Add new task'}
        </button>
        {showField && (
          <button
            className='button add-task-field__button add-task-field__button--add'
            onClick={() => addTask()}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default AddTaskField;
