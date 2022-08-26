import { StoreonModule } from 'storeon';
import { IBoard, ITask } from '../interfaces';

const initialTasks: Array<ITask> = [
  {
    id: 1,
    title: 'Don`t worry',
    boardId: 1
  },
  {
    id: 2,
    title: 'Be happy',
    boardId: 1
  },
  {
    id: 3,
    title: 'Do the best',
    boardId: 2
  },
  {
    id: 4,
    title: 'Stress',
    boardId: 3
  },
  {
    id: 5,
    title: 'Waste time',
    boardId: 3
  },
  {
    id: 6,
    title: 'Focus on the negative',
    boardId: 3
  }
];

const initialBoards = [
  {
    id: 1,
    title: 'To do',
    order: 1,
    isArchived: false
  },
  {
    id: 2,
    title: 'Doing',
    order: 2,
    isArchived: false
  },
  {
    id: 3,
    title: 'Done',
    order: 3,
    isArchived: false
  }
];

export interface State {
  tasks: Array<ITask>,
  boards: Array<IBoard>
}

export interface Events {
  'addTask': ITask,
  'updateTask': ITask,
  'deleteTask': ITask,
  'addBoard': IBoard,
  'deleteBoard': number,
  'updateBoard': IBoard,
  'deleteAllBoards': undefined,
  'deleteAllTasks': undefined,
  'setBoards': Array<IBoard>,
  'setTasks': Array<ITask>,
  'dropTaskToBoard': { taskId: number, boardId: number }
}

export enum ManagerEvent {
  ADD_TASK = 'addTask',
  DELETE_TASK = 'deleteTask',
  UPDATE_TASK ='updateTask',
  ADD_BOARD = 'addBoard',
  DELETE_BOARD = 'deleteBoard',
  UPDATE_BOARD = 'updateBoard',
  DELETE_ALL_TASKS = 'deleteAllTasks',
  DELETE_ALL_BOARDS = 'deleteAllBoards',
  SET_BOARDS = 'setBoards',
  SET_TASKS = 'setTasks',
  DROP_TASK_TO_BOARD = 'dropTaskToBoard'
}

export const manager: StoreonModule<State, Events> = (store) => {
  store.on('@init', () => ({ tasks: initialTasks, boards: initialBoards }));

  store.on(ManagerEvent.ADD_TASK, (state, event) => ({
    tasks: [...state.tasks, event]
  }));

  store.on(ManagerEvent.UPDATE_TASK, (state, event) => ({
    tasks: state.tasks.map((task) => task.id === event.id ? event : task)
  }));

  store.on(ManagerEvent.DELETE_TASK, (state, event) => ({
    tasks: state.tasks.filter((task) => task.id !== event.id)
  }));

  store.on(ManagerEvent.ADD_BOARD, (state, event) => ({
    boards: [...state.boards, event]
  }));

  store.on(ManagerEvent.UPDATE_BOARD, (state, event) => ({
    boards: state.boards.map((board) => board.id === event.id ? event : board)
  }));

  store.on(ManagerEvent.DELETE_BOARD, (state, event) => ({
    boards: state.boards.filter((board) => board.id !== event)
  }));

  store.on(ManagerEvent.SET_TASKS, (_, event) => ({
    tasks: event
  }));

  store.on(ManagerEvent.SET_BOARDS, (_, event) => ({
    boards: event
  }));

  store.on(ManagerEvent.DROP_TASK_TO_BOARD, (state, event) => {
    const selectedTask = state.tasks.find((task) => task.id === event.taskId);

    if (selectedTask) {
      const updatedTask: ITask = {
        ...selectedTask,
        boardId: event.boardId
      };

      const updatedTasks = state.tasks.map((task) => task.id === event.taskId ? updatedTask : task);

      return {
        tasks: updatedTasks
      }
    }

    return {
      tasks: state.tasks
    }
  });
};
