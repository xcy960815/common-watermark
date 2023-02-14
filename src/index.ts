export interface IWatermark {
    setWatermark: (content: string, element: HTMLElement) => void;
    removeWatermark: (element: HTMLElement) => void;
}

let timer: NodeJS.Timeout;

const id = '1.23452384164.123412415';

const createWatermark = (content: string, element: HTMLElement): string => {
    if (!element) return "";

    if (document.getElementById(id) !== null) {
        try {
            element.removeChild<HTMLElement>(document.getElementById(id)!);
        } catch (error) {
            console.error(error);
        }
    }

    const canvasNode = document.createElement('canvas');
    canvasNode.width = 250;
    canvasNode.height = 200;
    const canvasRenderingContext2D: CanvasRenderingContext2D = canvasNode.getContext('2d')!;
    const contents = content.split(',');
    canvasRenderingContext2D.rotate((-20 * Math.PI) / 180);
    canvasRenderingContext2D.font = '16px Vedana';
    canvasRenderingContext2D.fillStyle = 'rgba(0, 0, 0, 0.1)';
    canvasRenderingContext2D.textAlign = 'center';
    canvasRenderingContext2D.textBaseline = 'middle';
    contents.forEach((content, i) => canvasRenderingContext2D.fillText(content, canvasNode.width / 2, canvasNode.height / 2 + i * 20));
    const divNode = document.createElement('div');
    divNode.id = id;
    divNode.style.pointerEvents = 'none';
    divNode.style.top = '3px';
    divNode.style.left = '0px';
    divNode.style.position = 'absolute';
    divNode.style.zIndex = '9';
    divNode.style.width = element.clientWidth + 'px';
    divNode.style.height = element.scrollHeight + 'px';
    divNode.style.background = 'url(' + canvasNode.toDataURL('image/png') + ') left top repeat';
    element.appendChild(divNode);
    return id;
};

export const watermark: IWatermark = {
    setWatermark: (content: string, element: HTMLElement): void => {
        let id = createWatermark(content, element);
        timer = setInterval(() => {
            const needCreateWatermark = document.getElementById(id) === null || document.getElementById(id)!.clientHeight !== element.scrollHeight
            if (needCreateWatermark) id = createWatermark(content, element);
        }, 1000);
        window.onresize = () => {
            createWatermark(content, element);
        };
    },
    removeWatermark: (element: HTMLElement): void => {
        clearInterval(timer);
        if (document.getElementById(id) !== null) {
            element.removeChild<HTMLElement>(document.getElementById(id)!);
        }
    }
};



