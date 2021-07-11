export interface IBoardItem {
    id: number,
    label: string,
    isChecked: boolean,
};

export interface IBoard {
    id: number,
    title: string,
    items: IBoardItem[],
};