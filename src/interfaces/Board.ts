export interface ITask {
  id: number;
  boardId: number;
  title: string;
  isCompleted: boolean;
}
export interface IBoard {
  id: number;
  title: string;
  order: number;
}
