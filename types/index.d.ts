export declare interface IWatermark {
    setWatermark: (content: string, element: HTMLElement) => void;
    removeWatermark: (element: HTMLElement) => void;
}

export declare const watermark: IWatermark;

export { }
