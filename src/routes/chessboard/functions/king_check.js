import { get } from "svelte/store"
import { move_after_check, pieces, white_turn } from "../../store"
import { get_square_info } from "./get_square_info"
import { get_piece_moveset } from "./get_piece_moveset"
import { square_attacked } from "./square_attacked"
import { in_boundaries } from "./in_boundaries"
import { pawn_possible_square_list } from "../pieces/pawn"
import { queen_possible_square_list } from "../pieces/queen"
import { rook_possible_square_list } from "../pieces/rook"
import { bishop_possible_square_list } from "../pieces/bishop"
import { king_possible_square_list } from "../pieces/king"
import { knight_possible_square_list } from "../pieces/knight"

const pieces_original = get(pieces);
const queen_moveset = [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], 
    [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7],
    [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], 
    [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], 
    [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7],
    [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
]
const knight_moveset = [
    [1, 2], [-1, 2], [1, -2], [-1, -2],
    [2, 1], [-2, 1], [2, -1], [-2, -1]
]
const pawn_moveset = [
    [-1, 1], [-1, -1]
]
const king_moveset = [
    [-1, 1], [0, 1], [1, 1], [1, 0], 
    [1, -1], [0, -1], [-1, -1], [-1, 0]
]


/**
 * Check if there's a move for king to escape check
 * @param {*} side 
 * @param {*} pieces_modified 
 * @returns 
 */
export const movable_after_king_check = (/** @type { String } */ side, /** @type { any } */ pieces_modified) => {

    var king_attacked = false;

    // find king's position 
    var king_position = [0, 0];
    for (const row of [0, 1, 2, 3, 4, 5, 6, 7]) {
            for (const column of [0, 1, 2, 3, 4, 5, 6, 7]) {
                const square_info = pieces_modified[row][column];
                if (square_info.name === '') continue;
                const [square_side, square_name] = square_info.name.split(' ');
                if (square_name === 'king' && square_side === side) king_position = [row, column];
            }
    }

    // check if king is attacked
    // queen, rook, bishop
    for (const turn of [0, 1, 2, 3, 4, 5, 6, 7]) {
            for (const diff of queen_moveset.slice(7*turn, 7*(turn + 1))) {
                const [diff_row, diff_column] = diff;
                var opponent_next_row, opponent_next_column;
                // check if the king or another piece moves and update its position accordingly
                opponent_next_row = king_position[0] + diff_row, opponent_next_column = king_position[1] + diff_column;

                if (!in_boundaries(opponent_next_row, opponent_next_column)) continue;

                
                const next_square_info = pieces_modified[opponent_next_row][opponent_next_column];
                // no piece
                if (next_square_info.name === '') continue;
                const next_square_side = next_square_info.name.split(' ')[0];
                const next_square_name = next_square_info.name.split(' ')[1];
                // same side
                if (next_square_side === side) break;


                if (turn <= 3) {
                    if (next_square_name === 'queen' || next_square_name === 'rook') {
                        king_attacked = true;
                    } else {
                        // a piece is blocking the check line
                        break;
                    }
                } else {
                    if (next_square_name === 'queen' || next_square_name === 'bishop') {
                        king_attacked = true;
                    } else {
                        // a piece is blocking the check line
                        break;
                    }
                }

            }
    }
    // knight
    for (const diff of knight_moveset) {
            const [diff_row, diff_column] = diff;
            // check if the king or another piece moves and update its position accordingly
            const opponent_next_row = king_position[0] + diff_row, opponent_next_column = king_position[1] + diff_column;

            if (!in_boundaries(opponent_next_row, opponent_next_column)) continue;

            const next_square_info = pieces_modified[opponent_next_row][opponent_next_column];
            if (next_square_info.name === '') continue;
            const next_square_side = next_square_info.name.split(' ')[0];
            const next_square_name = next_square_info.name.split(' ')[1];
            if (next_square_side === side) continue;

            if (next_square_name !== 'knight') continue;

            king_attacked = true;
    }
    // pawn
    for (const diff of pawn_moveset) {
            const [diff_row, diff_column] = diff;
            // check if the king or another piece moves and update its position accordingl
            opponent_next_row = king_position[0] + diff_row, opponent_next_column = king_position[1] + diff_column;

            if (!in_boundaries(opponent_next_row, opponent_next_column)) continue;

            const next_square_info = pieces_modified[opponent_next_row][opponent_next_column];
            if (next_square_info.name === '') continue;
            const next_square_side = next_square_info.name.split(' ')[0];
            const next_square_name = next_square_info.name.split(' ')[1];
            if (next_square_side === side) continue;

            if (next_square_name !== 'pawn') continue;

            king_attacked = true;
    }
    // king
    for (const diff of king_moveset) {
            const [diff_row, diff_column] = diff;
            var opponent_next_row, opponent_next_column;
            // check if the king or another piece moves and update its position accordingly
            opponent_next_row = king_position[0] + diff_row, opponent_next_column = king_position[1] + diff_column;

            if (!in_boundaries(opponent_next_row, opponent_next_column)) continue;

            const next_square_info = pieces_modified[opponent_next_row][opponent_next_column];
            if (next_square_info.name === '') continue;
            const next_square_side = next_square_info.name.split(' ')[0];
            const next_square_name = next_square_info.name.split(' ')[1];
            if (next_square_side === side) continue;

            if (next_square_name !== 'king') continue;

            king_attacked = true;
    }

    return king_attacked;
}


/**
 * Check if king is attacked
 * @returns 
 */
export const king_status = () => {

    move_after_check.set([{
        name: "",
        from_position: [-1, -1],
        to_position: [-1, -1]
    }]);

    var king_position = [0, 0];

    // get king's position
    const side = get(white_turn) ? 'white' : 'black';
    for (const row of [0, 1, 2, 3, 4, 5, 6, 7]) {
        for (const column of [0, 1, 2, 3, 4, 5, 6, 7]) {
            const square_info = get_square_info(row, column);
            if (square_info.has_piece && square_info.name === 'king' && square_info.side === side) {
                king_position = [row, column];
            }
        }
    }

    if (!square_attacked(king_position[0], king_position[1], side)) return 'no-check'

    // try all possible moves 
    for (const row of [0, 1, 2, 3, 4, 5, 6, 7]) {
        for (const column of [0, 1, 2, 3, 4, 5, 6, 7]) {

            const square_info = get_square_info(row, column);
            if (!square_info.has_piece) continue;
            if (square_info.side !== side) continue;

            const piece_name = square_info.name;
            /**
             * @type {number[][]}
             */
            var possible_square_list = []
            if (piece_name === 'pawn') possible_square_list = pawn_possible_square_list(row, column);
            if (piece_name === 'queen') possible_square_list = queen_possible_square_list(row, column);
            if (piece_name === 'rook') possible_square_list = rook_possible_square_list(row, column);
            if (piece_name === 'bishop') possible_square_list = bishop_possible_square_list(row, column);
            if (piece_name === 'king') possible_square_list = king_possible_square_list(row, column);
            if (piece_name === 'knight') possible_square_list = knight_possible_square_list(row, column);

            for (const position of possible_square_list) {
                const [next_row, next_column] = position;
                // move selected piece
                const pieces_modified = pieces_original.map((value) => value.slice()); // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
                pieces_modified[next_row][next_column] = pieces_modified[row][column];
                pieces_modified[row][column] = {
                    name: "",
                    id: -1,
                    initial_position: [-1, -1],
                }

                // update list of possible moves
                const king_attacked = movable_after_king_check(side, pieces_modified)

                if (!king_attacked) {
                    move_after_check.update((value) => {
                        value = [...value, {
                            name: piece_name,
                            from_position: [row, column],
                            to_position: [next_row, next_column]
                        }]
                        return value;
                    })
                }
            }
        }
    }

    // checkmate
    if (get(move_after_check).length === 1) return 'checkmate';
    else return 'has-escape';
    
}
