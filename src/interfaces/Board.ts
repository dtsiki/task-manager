export interface ITask {
  id: number;
  boardId: number;
  title: string;
}
export interface IBoard {
  id: number;
  title: string;
  order: number;
}
