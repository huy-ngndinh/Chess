import { flip_board, pieces, pieces_previous_position } from "./store";
import { get } from "svelte/store";

export const white_set_board = () => {
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
}

export const black_set_board = () => {
    pieces.update((pieces) => {
        // black
        for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
            pieces[6][i] = {
                name: "black pawn",
                id: i,
                initial_position: [1, i]
            }
        }
        pieces[7][0] = {
            name: "black rook",
            id: 8,
            initial_position: [7, 0]
        }
        pieces[7][7] = {
            name: "black rook",
            id: 9,
            initial_position: [7, 7]
        }
        pieces[7][1] = {
            name: "black knight",
            id: 10,
            initial_position: [7, 1]
        }
        pieces[7][6] = {
            name: "black knight",
            id: 11,
            initial_position: [7, 6]
        }
        pieces[7][2] = {
            name: "black bishop",
            id: 12,
            initial_position: [7, 2]
        } 
        pieces[7][5] = {
            name: "black bishop",
            id: 13,
            initial_position: [7, 5]
        }
        pieces[7][3] = {
            name: "black queen",
            id: 14,
            initial_position: [7, 3]
        }
        pieces[7][4] = {
            name: "black king",
            id: 15,
            initial_position: [7, 4]
        }
    
        // white
        for (const i of [16, 17, 18, 19, 20, 21, 22, 23]) {
            pieces[1][i - 16] = {
                name: "white pawn",
                id: i,
                initial_position: [1, i - 16]
            }
        }
        pieces[0][0] = {
            name: "white rook",
            id: 24,
            initial_position: [0, 0]
        }
        pieces[0][7] = {
            name: "white rook",
            id: 25,
            initial_position: [0, 7]
        }
        pieces[0][1] = {
            name: "white knight",
            id: 26,
            initial_position: [0, 1]
        }
        pieces[0][6] = {
            name: "white knight",
            id: 27,
            initial_position: [0, 6]
        }
        pieces[0][2] = {
            name: "white bishop",
            id: 28,
            initial_position: [0, 2]
        } 
        pieces[0][5] = {
            name: "white bishop",
            id: 29,
            initial_position: [0, 5]
        }
        pieces[0][3] = {
            name: "white queen",
            id: 30,
            initial_position: [0, 3]
        }
        pieces[0][4] = {
            name: "white king",
            id: 31,
            initial_position: [0, 4]
        }
    
        return pieces;
    });
}

export const white_set_initial_previous_position = () => {
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
}

export const black_set_initial_previous_position = () => {
    pieces_previous_position.update((value) => {
        // black pawn
        for (const i of [0, 1, 2, 3, 4, 5, 6, 7]) {
            value[i] = [6, i]
        }
        // black rook
        value[8] = [7, 0]
        value[9] = [7, 7]
        // black knight
        value[10] = [7, 1]
        value[11] = [7, 6]
        // black bishop
        value[12] = [7, 2]
        value[13] = [7, 5]
        // black queen
        value[14] = [7, 3]
        // black king
        value[15] = [7, 4]
        
        // white pawn
        for (const i of [16, 17, 18, 19, 20, 21, 22, 23]) {
            value[i] = [1, i - 16]
        }
        // white rook
        value[24] = [0, 0]
        value[25] = [0, 7]
        // white knight
        value[26] = [0, 1]
        value[27] = [0, 6]
        // white  bishop
        value[28] = [0, 2]
        value[29] = [0, 5]
        // white queen
        value[30] = [0, 3]
        // white king
        value[31] = [0, 4]
        return value;
    })
}

export const is_player_side = (/** @type {String} */ side) => {
    if (side === 'white' && !get(flip_board)) return true;
    if (side === 'black' && get(flip_board)) return true;
    return false;
}