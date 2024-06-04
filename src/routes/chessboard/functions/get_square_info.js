import { pieces, pieces_previous_change_timer, pieces_previous_position } from "../../store"
import { get } from "svelte/store"

/**
 * Show information of a square
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */
export const get_square_info = (/** @type {number} */ row, /** @type {number} */ column) => {
    const piece_square = get(pieces)[row][column];
    const square_info = {
        has_piece: false,
        name: "",
        side: "",
        id: -1,
        initial_position: [-1, -1],
        previous_position: [-1, -1],
        last_change_time: 0,
    };
    if (piece_square.name === "") {
        square_info.has_piece = false;
    } else {
        square_info.has_piece = true;
        square_info.name = String(piece_square.name).split(' ')[1];
        square_info.side = String(piece_square.name).split(' ')[0];
        square_info.id = piece_square.id
        square_info.initial_position = piece_square.initial_position;
        square_info.previous_position = get(pieces_previous_position)[piece_square.id];
        square_info.last_change_time = get(pieces_previous_change_timer)[piece_square.id];
    }
    return square_info;
}