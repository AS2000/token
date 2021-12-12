
interface IWindow {
    width: number,
    height: number,
    scale: number,
    fontScale: number,
};

/**
 *
 * @param {ScaledSize} dim the dimensions object
 * @param {*} limit the limit on the scaled dimension
 */
const msp = (dim:IWindow, limit:number) => {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};

export const isPortrait = (window: IWindow) => window.height >= window.width;

export const isLandscape = (window: IWindow) => window.width >= window.height;

export const isTablet = (window: IWindow) => {
    return (
        (window.scale < 2 && msp(window, 1000)) ||
        (window.scale >= 2 && msp(window, 1900))
    );
};

/**
 * Returns true if the device is a phone
 */
export const isPhone = (window:IWindow) => { return !isTablet(window); }
