import { writable } from "svelte/store";
import { white_set_board, white_set_initial_previous_position } from "./set_board";

/**
 * Show the chessboard along with the position of each piece
 */
export const pieces = writable(
    Array.from(Array(8), () => {
        return Array.from(Array(8), () => {
            return {
                name: "",
                id: -1,
                initial_position: [-1, -1],
            }
        })
    })
)

white_set_board();

/**
 * Show each piece's previous position
 */
export const pieces_previous_position = writable(
    Array.from(Array(32), () => {
        return [-1, -1];
    })
)

white_set_initial_previous_position();

/**
 * The time of the lastest position change for each piece
 */
export const pieces_previous_change_timer = writable(
    Array.from(Array(32), () => {
        return 0;
    })
)

/**
 * For each square:
 * Value is true if the square has all its possible moves highlighted, false otherwise
 */
export const moves_of_square_highlighted = writable(
    Array.from(Array(8), () => {
        return Array.from(Array(8), () => {
            return false;
        })
    })
)

export const movesets = writable({
    rook: [
        [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
        [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], 
        [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], 
    ],
    knight: [
        [1, 2], [-1, 2], [1, -2], [-1, -2],
        [2, 1], [-2, 1], [2, -1], [-2, -1]
    ],
    bishop: [
        [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], 
        [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], 
        [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7],
        [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7], 
    ],
    pawn: [
        [-1, 0], [-2, 0], [-1, 1], [-1, -1]
    ],
    king: [
        [-1, 1], [0, 1], [1, 1], [1, 0], 
        [1, -1], [0, -1], [-1, -1], [-1, 0]
    ],
    queen: [
        [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
        [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], 
        [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7],
        [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], 
        [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], 
        [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7],
        [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
    ]
})

/**
 * For each square: 
 * Value is true if the square is highlighted, false otherwise
 */
export const square_highlighted = writable(
    Array.from(Array(8), () => {
        return Array.from(Array(8), () => {
            return false;
        })
    })
)

export const previous_selected_square = writable([-1, -1]);

export const selected_square = writable([-1, -1]);

export const highlighted_square_clicked = writable(false);

export const game_timer = writable(0);

export const white_turn = writable(true);

export const move_after_check = writable([{
    name: "",
    from_position: [-1, -1],
    to_position: [-1, -1]
}]);

export const king_in_check = writable(false);

export const halfmove = writable(0);

export const pending_response = writable(false);

export const evaluation = writable(0);

/* ========= SETTING ========== */

export const difficulty_list = writable([
    {
        elo: 1000,
        depth: 3,
        selected: true
    }, 
    {
        elo: 1300,
        depth: 4,
        selected: false
    },
    {
        elo: 1500,
        depth: 5,
        selected: false
    },
    {
        elo: 1800,
        depth: 7,
        selected: false,
    },
    {
        elo: 2000,
        depth: 8,
        selected: false
    }
])

export const music = writable(false);

export const flip_board = writable(false);

export const show_eval = writable(false);

export const eval_value = writable(false);

export const start_game = writable(false);