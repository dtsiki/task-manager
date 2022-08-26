import React, { useCallback, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import { IBoard, ITask } from '../../../interfaces';
import Board from '../Board';
import { DragAndDropVariant } from '../Board/Board';
import InitialBoard from '../InitialBoard';

import './style.scss';

const Boards: React.FC = () => {
  const { tasks, boards } = useStoreon('tasks', 'boards');

  const [selectedBoard, setSelectedBoard] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<number>(0);
  const [dragAndDrop, setDragAndDrop] = useState<DragAndDropVariant>(DragAndDropVariant.NONE);

  const sortBoards = (prevBoard: IBoard, nextBoard: IBoard): number => {
    if (prevBoard.order > nextBoard.order) return 1;

    return -1;
  };

  const sortTasks = useCallback((id: number) => {
    return tasks.filter((task: ITask) => task.boardId === id);
  }, [tasks]);

  const renderBoards = useMemo(() => {
    return boards
      .sort(sortBoards)
      .map((board: IBoard) => {
        const { id, isArchived } = board;

        if (!isArchived) {
          return (
            <Board
              key={id}
              board={board}
              tasks={sortTasks(id)}
              setSelectedBoard={setSelectedBoard}
              selectedBoard={selectedBoard}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              dragAndDrop={dragAndDrop}
              setDragAndDrop={setDragAndDrop}
            />
          );
        }
      });
  }, [boards, tasks, dragAndDrop, selectedBoard, selectedTask]);

  return (
    <ul className='boards'>
      {renderBoards}
      <InitialBoard />
    </ul>
  );
};

export default Boards;
