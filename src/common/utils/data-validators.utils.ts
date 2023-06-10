export const isArrayAndHasContent = (arr: Array<unknown>) => {
    return Array.isArray(arr) && arr.length > 0;
}