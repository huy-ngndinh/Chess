import { get_square_info } from "../functions/get_square_info";
import { get_piece_moveset } from "../functions/get_piece_moveset";
import { movesets, square_highlighted } from "../store";
import { square_attacked } from "../functions/square_attacked";
import { get } from "svelte/store";
import { in_boundaries } from "../functions/in_boundaries";

/**
 * Return a list of all possible squares a king at (row, column) can move to
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */
export const king_possible_square_list = (/** @type {number} */ row, /** @type {number} */ column) => {
   
    const possible_square_list = []

    const current_square_info = get_square_info(row, column);
    const piece_moveset = get_piece_moveset(current_square_info.name);

    for (const possible_next_move of piece_moveset) {

        const diff_row = possible_next_move[0], diff_column = possible_next_move[1];
        const next_row = row + diff_row, next_column = column + diff_column;

        if (in_boundaries(next_row, next_column)) {
                
            const next_square_info = get_square_info(next_row, next_column);
            if (next_square_info.has_piece && next_square_info.side === current_square_info.side) continue;
            
            if (square_attacked(next_row, next_column, current_square_info.side)) continue;

            possible_square_list.push([next_row, next_column]);

        } else {
            continue;
        }

    }

    short_castling(row, column, possible_square_list)

    long_castling(row, column, possible_square_list);

    return possible_square_list;

}

const short_castling = (/** @type {number} */ row, /** @type {number} */ column, /** @type {number[][]} */ possible_square_list) => {
    // king's side rook: 
    // black: id = 9, position = [0, 7] 
    // white: id = 25, position = [7, 7]

    const current_square_info = get_square_info(row, column);
    if (current_square_info.last_change_time !== 0) return;
    if (square_attacked(row, column, current_square_info.side)) return;

    var rook_position, square_between_list = [[0, 0], [0, 0]];


    if (current_square_info.side === 'black') {
        rook_position = [0, 7]
        square_between_list = [[0, 6], [0, 5]];
    } else {
        rook_position = [7, 7]
        square_between_list = [[7, 6], [7, 5]]
    }

    // check if rook is in place and hasn't moved yet
    const rook_square_info = get_square_info(rook_position[0], rook_position[1]);
    if (!rook_square_info.has_piece) return;
    if (rook_square_info.name !== 'rook') return;
    if (rook_square_info.last_change_time !== 0) return 0;

    // check if two squares between are empty and aren't attacked
    for (const square_between of square_between_list) {
        const square_between_info = get_square_info(square_between[0], square_between[1]);
        if (square_between_info.has_piece) return;
        if (square_attacked(square_between[0], square_between[1], rook_square_info.side)) return;
    }

    const [next_row, next_column] = square_between_list[0];
    possible_square_list.push([next_row, next_column]);

}

const long_castling = (/** @type {number} */ row, /** @type {number} */ column, /** @type {number[][]} */ possible_square_list) => {
    // queen's side rook: 
    // black: id = 8, position = [0, 0] 
    // white: id = 24, position = [7, 0]

    const current_square_info = get_square_info(row, column);
    if (current_square_info.last_change_time !== 0) return;
    if (square_attacked(row, column, current_square_info.side)) return;

    var rook_position, square_between_list = [[0, 0], [0, 0], [0, 0]];


    if (current_square_info.side === 'black') {
        rook_position = [0, 0]
        square_between_list = [[0, 1], [0, 2], [0, 3]];
    } else {
        rook_position = [7, 0]
        square_between_list = [[7, 1], [7, 2], [7, 3]];
    }

    // check if rook is in place and hasn't moved yet
    const rook_square_info = get_square_info(rook_position[0], rook_position[1]);
    if (!rook_square_info.has_piece) return;
    if (rook_square_info.name !== 'rook') return;
    if (rook_square_info.last_change_time !== 0) return 0;

    // check if two squares between are empty and aren't attacked
    for (const square_between of square_between_list) {
        const square_between_info = get_square_info(square_between[0], square_between[1]);
        if (square_between_info.has_piece) return;
        if (square_attacked(square_between[0], square_between[1], rook_square_info.side)) return;
    }

    const [next_row, next_column] = square_between_list[1];
    possible_square_list.push([next_row, next_column]);
}

/**
 * Highlight all possible squares a king at (row, column) can move to 
 * @param {*} row 
 * @param {*} column 
 */
export const king_possible_square_highlighted = (/** @type {number} */ row, /** @type {number} */ column) => {
   
    const possible_square_list = king_possible_square_list(row, column);

    for (const position of possible_square_list) {
        const [next_row, next_column] = position;
        square_highlighted.update((value) => {
            value[next_row][next_column] = !value[next_row][next_column];
            return value;
        })
    }

}

/**
 * Check if square (row, column) is attacked by a knight
 * @param {*} row 
 * @param {*} column 
 * @param {*} side 
 * @returns 
 */
export const square_attacked_by_king = (/** @type {number} */ row, /** @type {number} */ column, /** @type {String} */ side) => {
    const piece_moveset = get(movesets).king;
    var is_attacked = false;  

    for (const diff of piece_moveset) {
        const [diff_row, diff_column] = diff;
        const next_row = row + diff_row, next_column = column + diff_column;

        if (in_boundaries(next_row, next_column)) {

            const next_square_info = get_square_info(next_row, next_column);

            if (next_square_info.has_piece && next_square_info.side === side) continue;

            if (next_square_info.has_piece && next_square_info.side !== side && next_square_info.name === 'king') is_attacked = true;

        }
    }

    return is_attacked;
}