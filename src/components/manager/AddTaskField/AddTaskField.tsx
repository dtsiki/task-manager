import React, { useState } from 'react';

import Button from '../../base/Button';
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
    <div>
      {showField && (
        <Input
          value={newTask}
          onChange={changeNewTaskValue}
          placeholder='Enter new task'
          label='Add new task'
        />
      )}
      <div className='flex'>
        {showField && <Button onClick={() => addTask()}>Add</Button>}
        <Button
          onClick={() => setShowField(!showField)}
          variant={showField ? 'secondary' : 'primary'}>{showField ? 'Cancel' : 'Add task'}</Button>
      </div>
    </div>
  );
};

export default AddTaskField;
