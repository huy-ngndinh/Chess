import { square_attacked_by_bishop } from "../pieces/bishop";
import { square_attacked_by_king } from "../pieces/king";
import { square_attacked_by_knight } from "../pieces/knight";
import { square_attacked_by_pawn } from "../pieces/pawn";
import { square_attacked_by_queen } from "../pieces/queen";
import { square_attacked_by_rook } from "../pieces/rook";


/**
 * Check if square (row, column) is attacked
 * @param {*} row 
 * @param {*} column 
 * @param {*} side 
 * @returns 
 */
export const square_attacked = (/** @type {number} */ row, /** @type {number} */ column, /** @type {String} */ side) => {
    var is_attacked = false;
    if (square_attacked_by_bishop(row, column, side)) is_attacked = true;
    if (square_attacked_by_knight(row, column, side)) is_attacked = true;
    if (square_attacked_by_rook(row, column, side)) is_attacked = true;
    if (square_attacked_by_queen(row, column, side)) is_attacked = true;
    if (square_attacked_by_pawn(row, column, side)) is_attacked = true;
    if (square_attacked_by_king(row, column, side)) is_attacked = true;
    return is_attacked;

}