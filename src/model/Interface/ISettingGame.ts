export interface ISettingGame {
    _id: string;
    name: string;
    playTime: number;
    playLife: number;
    appearGhost: number;
    stopGame: boolean;
    isDefault: boolean;
    endEvent: Date
}