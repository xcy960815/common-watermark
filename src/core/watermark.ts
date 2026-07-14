interface WatermarkInstance {
  element: HTMLElement;
  node: HTMLDivElement;
  originalInlinePosition: string;
  positionWasAdjusted: boolean;
  resizeObserver?: ResizeObserver;
  mutationObserver?: MutationObserver;
  resizeHandler?: () => void;
  sizeCheckTimer?: ReturnType<typeof setInterval>;
}

const instances = new WeakMap<HTMLElement, WatermarkInstance>();
let nextId = 0;

const getOverlaySize = (element: HTMLElement) => ({
  width: Math.max(element.clientWidth, element.scrollWidth),
  height: Math.max(element.clientHeight, element.scrollHeight),
});

const renderWatermark = (content: string, documentNode: Document): string | null => {
  const canvas = documentNode.createElement('canvas');
  canvas.width = 250;
  canvas.height = 200;

  const context = canvas.getContext('2d');
  if (!context) return null;

  context.rotate((-20 * Math.PI) / 180);
  context.font = '16px Verdana';
  context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  content.split(/,|\r?\n/).forEach((line, index) => {
    context.fillText(line, canvas.width / 2, canvas.height / 2 + index * 20);
  });

  return canvas.toDataURL('image/png');
};

const updateOverlaySize = (instance: WatermarkInstance): void => {
  const { element, node } = instance;
  const { width, height } = getOverlaySize(element);

  if (node.parentElement !== element) element.appendChild(node);
  node.style.width = `${width}px`;
  node.style.height = `${height}px`;
};

const removeInstance = (element: HTMLElement): void => {
  const instance = instances.get(element);
  if (!instance) return;

  instance.resizeObserver?.disconnect();
  instance.mutationObserver?.disconnect();
  if (instance.resizeHandler) {
    element.ownerDocument.defaultView?.removeEventListener('resize', instance.resizeHandler);
  }
  if (instance.sizeCheckTimer) clearInterval(instance.sizeCheckTimer);

  if (instance.node.parentElement === element) element.removeChild(instance.node);
  if (instance.positionWasAdjusted && element.style.position === 'relative') {
    element.style.position = instance.originalInlinePosition;
  }

  instances.delete(element);
};

const createInstance = (content: string, element: HTMLElement): WatermarkInstance | null => {
  const documentNode = element.ownerDocument;
  const image = renderWatermark(content, documentNode);
  if (!image) return null;

  const node = documentNode.createElement('div');
  node.id = `common-watermark-${++nextId}`;
  node.setAttribute('aria-hidden', 'true');
  node.style.pointerEvents = 'none';
  node.style.userSelect = 'none';
  node.style.top = '0';
  node.style.left = '0';
  node.style.position = 'absolute';
  node.style.zIndex = '2147483647';
  node.style.backgroundImage = `url("${image}")`;
  node.style.backgroundRepeat = 'repeat';
  node.style.backgroundPosition = 'left top';

  const windowNode = documentNode.defaultView;
  const originalInlinePosition = element.style.position;
  const positionWasAdjusted = Boolean(
    windowNode && windowNode.getComputedStyle(element).position === 'static',
  );
  if (positionWasAdjusted) element.style.position = 'relative';

  const instance: WatermarkInstance = {
    element,
    node,
    originalInlinePosition,
    positionWasAdjusted,
  };
  updateOverlaySize(instance);

  const refresh = (): void => updateOverlaySize(instance);
  const ResizeObserverConstructor = windowNode?.ResizeObserver;
  if (ResizeObserverConstructor) {
    instance.resizeObserver = new ResizeObserverConstructor(refresh);
    instance.resizeObserver.observe(element);
  } else {
    instance.resizeHandler = refresh;
    windowNode?.addEventListener('resize', refresh);
  }

  instance.sizeCheckTimer = setInterval(refresh, 1000);

  const MutationObserverConstructor = windowNode?.MutationObserver;
  if (MutationObserverConstructor) {
    instance.mutationObserver = new MutationObserverConstructor(refresh);
    instance.mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  return instance;
};

export const watermark = {
  setWatermark: (content: string, element: HTMLElement): void => {
    if (!element) return;

    removeInstance(element);
    const instance = createInstance(content, element);
    if (instance) instances.set(element, instance);
  },
  removeWatermark: (element: HTMLElement): void => {
    if (!element) return;
    removeInstance(element);
  },
};
