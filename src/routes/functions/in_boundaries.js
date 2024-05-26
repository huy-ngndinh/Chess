
/**
 * Check if a square is in the boundaries of a chessboard 
 * @param {*} row 
 * @param {*} column 
 * @returns
 */
export const in_boundaries = (/** @type {number} */ row, /** @type {number} */ column) => {
    return 0 <= row && row <= 7 && 0 <= column && column <= 7;
}