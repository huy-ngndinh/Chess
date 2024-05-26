import { moves_of_square_highlighted } from "../store";
import { get } from "svelte/store";
import { get_square_info } from "./get_square_info";
import { knight_possible_square_highlighted } from "../pieces/knight";
import { bishop_possible_square_highlighted } from "../pieces/bishop";
import { queen_possible_square_highlighted } from "../pieces/queen";
import { rook_possible_square_highlighted } from "../pieces/rook";
import { pawn_possible_square_highlighted } from "../pieces/pawn";
import { king_possible_square_highlighted } from "../pieces/king";


/**
 * Toggle on/off square (row, column)
 * @param {*} row 
 * @param {*} column 
 */
const perform_update = (/** @type {number} */ row, /** @type {number} */ column) => {

    const info = get_square_info(row, column);
    if (!info.has_piece) return;
    const piece_name = info.name;

    if (piece_name === 'rook') rook_possible_square_highlighted(row, column);
    if (piece_name === 'knight') knight_possible_square_highlighted(row, column);
    if (piece_name === 'bishop') bishop_possible_square_highlighted(row, column);
    if (piece_name === 'queen') queen_possible_square_highlighted(row, column);
    if (piece_name === 'pawn') pawn_possible_square_highlighted(row, column);
    if (piece_name === 'king') king_possible_square_highlighted(row, column);


    moves_of_square_highlighted.update((value) => {
        value[row][column] = !value[row][column];
        return value;
    })

}


/**
 * If two squares are different, toggle off the previous square and toggle on the current square
 * 
 * 
 * Otherwise, toggle on/off the current square
 * @param {*} previous_row 
 * @param {*} previous_column 
 * @param {*} row 
 * @param {*} column 
 */
export const highlight_square = (/** @type {number} */ previous_row, /** @type {number} */ previous_column, /** @type {number} */ row, /** @type {number} */ column) => {

    /* https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/ */
    if (row === previous_row && column === previous_column && row !== -1) {

        // when cliking on the same square, the highlight color will flip on/off
        perform_update(row, column);


    } else {
        
        // when clicking on different square, the previous highlighted squares must be turned off 
        // (if they're off already, that's fine)

        if (previous_row !== -1 && get(moves_of_square_highlighted)[previous_row][previous_column]) {
            // toggle previous square
            perform_update(previous_row, previous_column);
        }
        if (row !== -1) {
            // toggle current square
            perform_update(row, column);
        }

    }

}