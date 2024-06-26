import { get } from "svelte/store"
import { white_turn, pieces, flip_board } from "../../store"
import { get_square_info } from "./get_square_info"
import { is_player_side } from "../../set_board"


/**
 * Search for any pawn on the last rank and promote it to a queen
 */
export const promotion = () => {

    if (get(white_turn)) {
        // the previous turn is black's turn
        const row = !get(flip_board) ? 7 : 0;
         for (const column of [0, 1, 2, 3, 4, 5, 6, 7]) {
            const square_info = get_square_info(row, column);
            if (square_info.has_piece && square_info.side === 'black' && square_info.name === 'pawn') {
                pieces.update((value) => {
                    value[row][column].name = 'black queen';
                    return value;
                })
            }
        }
    } else {
        // the previous turn is white's turn
        const row = !get(flip_board) ? 0 : 7;
        for (const column of [0, 1, 2, 3, 4, 5, 6, 7]) {
            const square_info = get_square_info(row, column);
            if (square_info.has_piece && square_info.side === 'white' && square_info.name === 'pawn') {
                pieces.update((value) => {
                    value[row][column].name = 'white queen';
                    return value;
                })
            }
        }
    }
}