import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

import Input from '../../base/Input';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

import './style.scss';

interface Props {
  handleTask: (task: string) => void,
}

const FormAddTask: React.FC<Props> = ({ handleTask }: Props) => {
  const [newTask, setNewTask] = useState<string>('');
  const [showField, setShowField] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const changeNewTaskValue = (value: string): void => {
    setNewTask(value);
  };

  const addTask = (): void => {
    handleTask(newTask);

    setNewTask('');
  };

  const closeField = ():void => {
    if (showField) {
      setShowField(false);
    }
  };

  useOnClickOutside(ref, () => closeField());

  return (
    <div
      ref={ref}
      className='form-add-task'>
      {showField && (
        <Input
          value={newTask}
          onChange={changeNewTaskValue}
          placeholder='Enter new task, e.g.: be happy'
          label='Add new task'
          isLabelVisuallyHidden
        />
      )}
      <div className='form-add-task__actions'>
        <button
          className={`button form-add-task__button form-add-task__button--${showField ? 'cancel' : 'add-new-task'}`}
          onClick={() => setShowField(!showField)}>
          {!showField && (
            <FontAwesomeIcon icon={faPlus} />
          )}
          {showField ? 'Cancel' : 'Add new task'}
        </button>
        {showField && (
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
