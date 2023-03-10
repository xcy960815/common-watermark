export interface IWatermark {
    setWatermark: (content: string, element: HTMLElement) => void;
    removeWatermark: (element: HTMLElement) => void;
}

let timer: NodeJS.Timeout;

const id = '1.23452384164.123412415';
/**
 * @desc 原理就是创建一个canvas，然后将canvas转成base64的图片，然后将图片作为背景图，然后将这个背景图添加到页面中
 * @param {string} content 
 * @param {HTMLElement} element 
 * @returns {string}
 */
const createWatermark = (content: string, element: HTMLElement): string => {
    if (!element) return "";

    if (document.getElementById(id) !== null) element.removeChild<HTMLElement>(document.getElementById(id)!);

    const canvasNode = document.createElement('canvas');
    canvasNode.width = 250;
    canvasNode.height = 200;
    const canvasRenderingContext2D: CanvasRenderingContext2D = canvasNode.getContext('2d')!;
    canvasRenderingContext2D.rotate((-20 * Math.PI) / 180);
    canvasRenderingContext2D.font = '16px Vedana';
    canvasRenderingContext2D.fillStyle = 'rgba(0, 0, 0, 0.1)';
    canvasRenderingContext2D.textAlign = 'center';
    canvasRenderingContext2D.textBaseline = 'middle';
    const contents = content.split(',');
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



