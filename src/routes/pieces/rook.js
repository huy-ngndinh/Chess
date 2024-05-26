import { movesets, square_highlighted } from "../store"
import { get_square_info } from "../functions/get_square_info";
import { get_piece_moveset } from "../functions/get_piece_moveset";
import { get } from "svelte/store";
import { in_boundaries } from "../functions/in_boundaries";
import { check_pin } from "../functions/check_pin";

/**
 * Return a list of all possible squares a rook at (row, column) can move to
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */
export const rook_possible_square_list = (/** @type {number} */ row, /** @type {number} */ column) => {
    
    const possible_square_list = [];

    const current_square_info = get_square_info(row, column);
    const piece_moveset = get_piece_moveset(current_square_info.name);

    for (const turn of [0, 1, 2, 3]) {
        for (const possible_next_move of piece_moveset.slice(7*turn, 7*(turn + 1))) { // slice() is exclusive at end

            const diff_row = possible_next_move[0], diff_column = possible_next_move[1];
            const next_row = row + diff_row, next_column = column + diff_column;
            //console.log(diff_row, diff_column, next_row, next_column)

            if (in_boundaries(next_row, next_column)) {
                
                const next_square_info = get_square_info(next_row, next_column);
                if (next_square_info.has_piece && next_square_info.side === current_square_info.side) break;
                
                if (check_pin([row, column], [next_row, next_column], current_square_info.side)) {
                    // continuable or blocked depends on whether the next square is empty or not
                    if (next_square_info.has_piece && next_square_info.side !== current_square_info.side) break;
                    else continue; 
                }
                
                possible_square_list.push([next_row, next_column]);

                // the next square is an opponent's piece. We can capture or stop, but can't jump over
                if (next_square_info.has_piece && next_square_info.side !== current_square_info.side) break;

            } else {
                break;
            }
        }
    }

    return possible_square_list;
}

/**
 * Highlight all possible squares a rook at (row, column) can move to
 * @param {*} row 
 * @param {*} column 
 */
export const rook_possible_square_highlighted = (/** @type {number} */ row, /** @type {number} */ column) => {
    
    const possible_square_list = rook_possible_square_list(row, column);

    for (const position of possible_square_list) {
        const [next_row, next_column] = position;
        square_highlighted.update((value) => {
            value[next_row][next_column] = !value[next_row][next_column];
            return value;
        })
    }
    
}

/**
 * Check if square (row, column) is attacked by a rook
 * @param {*} row 
 * @param {*} column 
 * @param {*} side 
 * @returns 
 */
export const square_attacked_by_rook = (/** @type {number} */ row, /** @type {number} */ column, /** @type {String} */ side) => {
    const piece_moveset = get(movesets).rook;
    var is_attacked = false;    

    for (const turn of [0, 1, 2, 3]) {
        for (const diff of piece_moveset.slice(7*turn, 7*(turn + 1))) {
            const [diff_row, diff_column] = diff;
            const next_row = row + diff_row, next_column = column + diff_column;

            if (in_boundaries(next_row, next_column)) {

                const next_square_info = get_square_info(next_row, next_column);

                if (next_square_info.has_piece && next_square_info.side === side) break;

                if (next_square_info.has_piece && next_square_info.side !== side && next_square_info.name !== 'rook') break;

                if (next_square_info.has_piece && next_square_info.side !== side && next_square_info.name === 'rook') is_attacked = true;

            }
        }
    }

    return is_attacked;
}