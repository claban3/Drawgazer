// Types of objects to be passed into the canvas component.

export enum SelectedShape {
    None,
    Circle,
    Rectangle, 
    Triangle,
    FreeDraw,
};

export enum SelectedAnimation {
    RadialForce,
    DownwardGravity,
    WallBounce,
    None,
}

interface voidFunc {
    (none: void): void
}
export type CanvasSettings = {
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation, 
    reset: Boolean,
    resetInParent: voidFunc
    shareSessionState: number
};