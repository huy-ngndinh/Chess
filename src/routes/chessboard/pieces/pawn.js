import { game_timer, movesets, square_highlighted } from "../../store";
import { get_piece_moveset } from "../functions/get_piece_moveset";
import { get_square_info } from "../functions/get_square_info";
import { get } from "svelte/store";
import { in_boundaries } from "../functions/in_boundaries";
import { check_pin } from "../functions/check_pin";
import { is_player_side } from "../../set_board";

/**
 * Return a list of all possible squares a pawn at (row, column) can move to
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */
export const pawn_possible_square_list = (/** @type {number} */ row, /** @type {number} */ column) => {

    const possible_square_list = []

    const current_square_info = get_square_info(row, column);

    // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
    const piece_moveset_original = get_piece_moveset(current_square_info.name);
    var piece_moveset = piece_moveset_original.map((value) => {
        const new_value = value.slice();
        if (!is_player_side(current_square_info.side)) new_value[0] = new_value[0]*(-1);
        return new_value;
    })

    for (const possible_next_move of piece_moveset) {

        const diff_row = possible_next_move[0], diff_column = possible_next_move[1];
        const next_row = row + diff_row, next_column = column + diff_column;

        if (in_boundaries(next_row, next_column)) {
                
            const next_square_info = get_square_info(next_row, next_column);
            // diagonal take 
            if (diff_column !== 0 && !next_square_info.has_piece) continue;
            if (diff_column !== 0 && next_square_info.has_piece && next_square_info.side === current_square_info.side) continue;

            // first move
            if (Math.abs(diff_row) === 2) {
                if (row !== 1 && row !== 6) continue;
                if (next_square_info.has_piece) continue;
                const row_between = (row + next_row) / 2;
                const square_between_info = get_square_info(row_between, column);
                if (square_between_info.has_piece) continue; 
            }

            // piece in front
            if (Math.abs(diff_row) === 1 && diff_column === 0) {
                if (next_square_info.has_piece) continue;
            }

            if (check_pin([row, column], [next_row, next_column], current_square_info.side)) continue; 

            possible_square_list.push([next_row, next_column]);

        } else {
            continue;
        }

    }

    // check for en passent
    check_en_passent(row, column, possible_square_list);

    return possible_square_list;
}

/**
 * Check for en passent
 * @param {*} row 
 * @param {*} column 
 */
const check_en_passent = (/** @type {number} */ row, /** @type {number} */ column, /** @type {number[][]} */ possible_square_list) => {

    const square_info = get_square_info(row, column);
    if ((is_player_side(square_info.side) && row !== 3) || (!is_player_side(square_info.side) && row !== 4)) return;

    const moves = [[0, -1], [0, 1]]
    for (const diff of moves) {

        const [diff_row, diff_column] = diff;
        var next_row = row + diff_row, next_column = column + diff_column;

        if (!in_boundaries(next_row, next_column)) continue;

        const next_square_info = get_square_info(next_row, next_column);

        // check if next piece is the opponent's pawn
        if (!next_square_info.has_piece) continue;
        if (next_square_info.has_piece && next_square_info.side === square_info.side) continue;
        if (next_square_info.has_piece && next_square_info.side !== square_info.side && next_square_info.name !== 'pawn') continue;

        // check the position for en passent
        const next_square_initial_position =  next_square_info.initial_position;
        const next_square_previous_position = next_square_info.previous_position;
        if (next_square_initial_position[1] !== next_column) continue;
        if (Math.abs(next_square_initial_position[0] - next_row) !== 2) continue;
        if (JSON.stringify(next_square_initial_position) !== JSON.stringify(next_square_previous_position)) continue;

        // check if opponent moves the pawn the previous turn
        const next_square_last_change_time = next_square_info.last_change_time
        const current_time = get(game_timer);
        if (next_square_last_change_time !== current_time) continue;

        if (!is_player_side(square_info.side)) next_row = next_row + 1
        else next_row = next_row - 1

        if (check_pin([row, column], [next_row, next_column], square_info.side)) continue;         

        possible_square_list.push([next_row, next_column]);

    }
}


/**
 * Highlight all possible squares a pawn at (row, column) can move to 
 * @param {*} row 
 * @param {*} column 
 */
export const pawn_possible_square_highlighted = (/** @type {number} */ row, /** @type {number} */ column) => {

    const possible_square_list = pawn_possible_square_list(row, column);

    for (const position of possible_square_list) {
        const [next_row, next_column] = position;
        square_highlighted.update((value) => {
            value[next_row][next_column] = !value[next_row][next_column];
            return value;
        })
    }

    console.log(get(square_highlighted))

}

/**
 * Check if square (row, column) is attacked by a pawn
 * @param {*} row 
 * @param {*} column 
 * @param {*} side 
 * @returns 
 */
export const square_attacked_by_pawn = (/** @type {number} */ row, /** @type {number} */ column, /** @type {String} */ side) => {
    const piece_moveset = get(movesets).pawn;
    var is_attacked = false;    

    for (const diff of piece_moveset) {
        var [diff_row, diff_column] = diff.slice();

        if (Math.abs(diff_column) === 0) continue;

        if (!is_player_side(side)) diff_row = diff_row * (-1);

        const next_row = row + diff_row, next_column = column + diff_column;

        if (in_boundaries(next_row, next_column)) {

            const next_square_info = get_square_info(next_row, next_column);

            if (next_square_info.has_piece && next_square_info.side !== side && next_square_info.name === 'pawn') is_attacked = true;

        }
    }

    return is_attacked;
}