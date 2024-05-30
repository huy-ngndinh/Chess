import { highlight_square } from "../functions/highlight_square"
import { move_piece } from "../functions/move_piece"
import { highlighted_square_clicked, pending_response, selected_square, previous_selected_square, white_turn } from "../store"
import { get_engine_response } from "./get_engine_response"
import { get } from "svelte/store"

const to_xy_coord = (/** @type {String} */ move) => {
    var row = -1, column = -1
    if (move[0] === 'a') column = 0
    if (move[0] === 'b') column = 1
    if (move[0] === 'c') column = 2
    if (move[0] === 'd') column = 3
    if (move[0] === 'e') column = 4
    if (move[0] === 'f') column = 5
    if (move[0] === 'g') column = 6
    if (move[0] === 'h') column = 7
    row = 7 - parseInt(move[1]) + 1;
    return [row, column]
}

export const engine_move = async () => {

    if (get(white_turn)) return;

    try {
        pending_response.set(true);
        
        const response = await get_engine_response()

        const data = await response.json()

        pending_response.set(false);

        const bestmove_split = data.bestmove.split(' ');
        const previous_square = bestmove_split[1].slice(0, 2)
        const next_square = bestmove_split[1].slice(2)
        
        const [previous_row, previous_column] = to_xy_coord(previous_square)
        const [next_row, next_column] = to_xy_coord(next_square)

        previous_selected_square.set([previous_row, previous_column])
        selected_square.set([next_row, next_column]);

    } catch (error) {

        console.log(error);

        location.reload();

    }
}