import { writable } from "svelte/store";

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

pieces.update((pieces) => {
    // black
    for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
        pieces[1][i] = {
            name: "black pawn",
            id: i,
            initial_position: [1, i]
        }
    }
    pieces[0][0] = {
        name: "black rook",
        id: 8,
        initial_position: [0, 0]
    }
    pieces[0][7] = {
        name: "black rook",
        id: 9,
        initial_position: [0, 7]
    }
    pieces[0][1] = {
        name: "black knight",
        id: 10,
        initial_position: [0, 1]
    }
    pieces[0][6] = {
        name: "black knight",
        id: 11,
        initial_position: [0, 6]
    }
    pieces[0][2] = {
        name: "black bishop",
        id: 12,
        initial_position: [0, 2]
    } 
    pieces[0][5] = {
        name: "black bishop",
        id: 13,
        initial_position: [0, 5]
    }
    pieces[0][3] = {
        name: "black queen",
        id: 14,
        initial_position: [0, 3]
    }
    pieces[0][4] = {
        name: "black king",
        id: 15,
        initial_position: [0, 4]
    }

    // white
    for (const i of [16, 17, 18, 19, 20, 21, 22, 23]) {
        pieces[6][i - 16] = {
            name: "white pawn",
            id: i,
            initial_position: [6, i - 16]
        }
    }
    pieces[7][0] = {
        name: "white rook",
        id: 24,
        initial_position: [7, 0]
    }
    pieces[7][7] = {
        name: "white rook",
        id: 25,
        initial_position: [7, 7]
    }
    pieces[7][1] = {
        name: "white knight",
        id: 26,
        initial_position: [7, 1]
    }
    pieces[7][6] = {
        name: "white knight",
        id: 27,
        initial_position: [7, 6]
    }
    pieces[7][2] = {
        name: "white bishop",
        id: 28,
        initial_position: [7, 2]
    } 
    pieces[7][5] = {
        name: "white bishop",
        id: 29,
        initial_position: [7, 5]
    }
    pieces[7][3] = {
        name: "white queen",
        id: 30,
        initial_position: [7, 3]
    }
    pieces[7][4] = {
        name: "white king",
        id: 31,
        initial_position: [7, 4]
    }

    return pieces;
});

/**
 * Show each piece's previous position
 */
export const pieces_previous_position = writable(
    Array.from(Array(32), () => {
        return [-1, -1];
    })
)

pieces_previous_position.update((value) => {
    // black pawn
    for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
        value[i] = [1, i]
    }
    // black rook
    value[8] = [0, 0]
    value[9] = [0, 7]
    // black knight
    value[10] = [0, 1]
    value[11] = [0, 6]
    // black bishop
    value[12] = [0, 2]
    value[13] = [0, 5]
    // black queen
    value[14] = [0, 3]
    // black king
    value[15] = [0, 4]
    
    // white pawn
    for (const i of [16, 17, 18, 19, 20, 21, 22, 23]) {
        value[i] = [6, i - 16]
    }
    // white rook
    value[24] = [7, 0]
    value[25] = [7, 7]
    // white knight
    value[26] = [7, 1]
    value[27] = [7, 6]
    // white  bishop
    value[28] = [7, 2]
    value[29] = [7, 5]
    // white queen
    value[30] = [7, 3]
    // white king
    value[31] = [7, 4]
    return value;
})

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