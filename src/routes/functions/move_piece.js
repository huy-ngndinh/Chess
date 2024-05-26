import { game_timer, pieces, pieces_previous_change_timer, pieces_previous_position, white_turn, king_in_check } from "../store";
import { get_square_info } from "./get_square_info";
import { get } from "svelte/store";

/**
 * Move piece in square (previous_row, previous_column) to square (row, column)
 * @param {*} previous_row 
 * @param {*} previous_column 
 * @param {*} row 
 * @param {*} column 
 */
export const move_piece = (/** @type {number} */ previous_row, /** @type {number} */ previous_column, /** @type {number} */ row, /** @type {number} */ column) => {

    const square_info = get_square_info(previous_row, previous_column);
    const piece_id = square_info.id

    pieces_previous_position.update((value) => {
        value[piece_id] = [previous_row, previous_column];
        return value;
    })

    game_timer.update((value) => value + 1)

    white_turn.update((value) => !value);

    pieces_previous_change_timer.update((value) => {
        value[piece_id] = get(game_timer);
        return value;
    })

    en_passent_check(previous_row, previous_column, row, column);

    short_castling_check(previous_row, previous_column, row, column);

    long_castling_check(previous_row, previous_column, row, column);

    pieces.update((value) => {
        value[row][column] = value[previous_row][previous_column]
        value[previous_row][previous_column] = {
            name: "",
            id: -1,
            initial_position: [-1, -1]
        };
        return value;
    }) 

}

const en_passent_check = (/** @type {number} */ previous_row, /** @type {number} */ previous_column, /** @type {number} */ row, /** @type {number} */ column) => {

    // diagonal take
    if (previous_column === column) return;

    // if the pawn doesn't take anything on the diagonal, it must be en passent
    const square_info = get_square_info(previous_row, previous_column);
    const next_square_info = get_square_info(row, column);
    if (square_info.has_piece && square_info.name !== 'pawn') return;
    if (next_square_info.has_piece) return;

    pieces.update((value) => {
        if (square_info.side === 'black') {
            value[row - 1][column] = {
                name: "",
                id: -1,
                initial_position: [-1, -1]
            }
        } else {
            value[row + 1][column] = {
                name: "",
                id: -1,
                initial_position: [-1, -1]
            }
        }
        return value;
    })
}

const short_castling_check = (/** @type {number} */ previous_row, /** @type {number} */ previous_column, /** @type {number} */ row, /** @type {number} */ column) => {

    if (row !== previous_row || Math.abs(previous_column - column) !== 2) return;
    const square_info = get_square_info(previous_row, previous_column);
    if (square_info.name !== 'king') return;
    if (column !== 6) return;

    // get rook's ID and position
    // king's side rook: 
    // black: id = 9, position = [0, 7] 
    // white: id = 25, position = [7, 7]
    var rook_from_position = [0, 0], rook_to_position = [0, 0], id = 0
    if (square_info.side === 'white') rook_from_position = [7, 7], rook_to_position = [7, 5], id = 25
    else rook_from_position = [0, 7], rook_to_position = [0, 5], id = 9

    pieces_previous_change_timer.update((value) => {
        value[id] = get(game_timer);
        return value;
    })

    pieces.update((value) => {
        value[rook_to_position[0]][rook_to_position[1]] = value[rook_from_position[0]][rook_from_position[1]];
        value[rook_from_position[0]][rook_from_position[1]] = {
            name: "",
                id: -1,
                initial_position: [-1, -1]
        }
        return value;
    })

}

const long_castling_check = (/** @type {number} */ previous_row, /** @type {number} */ previous_column, /** @type {number} */ row, /** @type {number} */ column) => {
    if (row !== previous_row || Math.abs(previous_column - column) !== 2) return;
    const square_info = get_square_info(previous_row, previous_column);
    if (square_info.name !== 'king') return;
    if (column !== 2) return;

    // get rook's ID and position
    // queen's side rook: 
    // black: id = 8, position = [0, 0] 
    // white: id = 24, position = [7, 0]
    var rook_from_position = [0, 0], rook_to_position = [0, 0], id = 0
    if (square_info.side === 'white') rook_from_position = [7, 0], rook_to_position = [7, 3], id = 24
    else rook_from_position = [0, 0], rook_to_position = [0, 3], id = 8

    pieces_previous_change_timer.update((value) => {
        value[id] = get(game_timer);
        return value;
    })

    pieces.update((value) => {
        value[rook_to_position[0]][rook_to_position[1]] = value[rook_from_position[0]][rook_from_position[1]];
        value[rook_from_position[0]][rook_from_position[1]] = {
            name: "",
                id: -1,
                initial_position: [-1, -1]
        }
        return value;
    })
}
