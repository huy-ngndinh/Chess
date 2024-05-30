import { king_possible_square_list } from "../pieces/king";
import { pawn_possible_square_list } from "../pieces/pawn";
import { game_timer, halfmove, pieces, white_turn } from "../store";
import { get } from "svelte/store";

const to_algebraic_notation = (/** @type {Number} */ row, /** @type {Number} */ column) => {
    var answer = ""
    const file_char = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    answer = answer + file_char[column];
    answer = answer + (7 - row + 1).toString()
    return answer;
}

export const get_fen = () => {
    // https://www.chess.com/terms/fen-chess#how-does-fen-work
    const pieces_info = get(pieces);
    var fen = ""

    // first field: piece placement
    for (const row_list of pieces_info) {
        var space = 0;
        for (const piece of row_list) {
            if (piece.name !== '') {

                if (space !== 0) fen = fen + space.toString()
                space = 0;

                const [side, name] = piece.name.split(' ');
                var piece_letter = ""
                if (name === 'rook') piece_letter = 'r'
                if (name === 'pawn') piece_letter = 'p'
                if (name === 'knight') piece_letter = 'n'
                if (name === 'bishop') piece_letter = 'b'
                if (name === 'queen') piece_letter = 'q'
                if (name === 'king') piece_letter = 'k'

                if (side === 'white') piece_letter = piece_letter.toUpperCase();

                fen = fen + piece_letter

            } else {
                space = space + 1;
            }
        }
        if (space !== 0) fen = fen + space.toString();
        fen = fen + '/';
    }
    // remove unnecessary slash at the end of first field
    fen = fen.slice(0, fen.length - 1);
    // add a space
    fen = fen + " "

    // second field: active color
    if (get(white_turn)) fen = fen + "w"
    else fen = fen + "b"
    // add a space
    fen = fen + " "

    // third field: castling rights
    var castling = ""
    // find king's position
    var white_king = [0, 0], black_king = [0, 0]
    for (const row of [0, 1, 2, 3, 4, 5, 6, 7]) {
        for (const column of [0, 1, 2, 3, 4, 5, 6, 7]) {
            if (pieces_info[row][column].name === 'white king') white_king = [row, column]
            if (pieces_info[row][column].name === 'black king') black_king = [row, column]
        }
    }
    // check castling of white side
    const white_king_possible_square_list = king_possible_square_list(white_king[0], white_king[1])
    if (white_king[0] === 7 && white_king[1] === 4) {
        for (const next_square of white_king_possible_square_list) {
            if (JSON.stringify(next_square) === JSON.stringify([7, 6])) castling = castling + "K"
            if (JSON.stringify(next_square) === JSON.stringify([7, 2])) castling = castling + "Q"
        }
    }
    // check castling of black side
    const black_king_possible_square_list = king_possible_square_list(black_king[0], black_king[1])
    if (black_king[0] === 0 && black_king[1] === 4) {
        for (const next_square of black_king_possible_square_list) {
            if (JSON.stringify(next_square) === JSON.stringify([0, 6])) castling = castling + "k"
            if (JSON.stringify(next_square) === JSON.stringify([0, 2])) castling = castling + "q"
        }
    }
    if (castling === "") fen = fen + "-"
    else fen = fen + castling
    // add space
    fen = fen + " ";

    // fourth field: possible en passent
    const current_side = (get(white_turn) ? 'white' : 'black')
    var en_passent_location = ""
    for (const row of [0, 1, 2, 3, 4, 5, 6, 7]) {
        for (const column of [0, 1, 2, 3, 4, 5, 6, 7]) {
            if (pieces_info[row][column].name === "") continue;
            const [piece_side, name] = pieces_info[row][column].name.split(' ');
            if (piece_side !== current_side) continue;
            if (name !== 'pawn') continue;
            const current_pawn_possible_square_list = pawn_possible_square_list(row, column);
            for (const next_move of current_pawn_possible_square_list) {
                const [next_row, next_column] = next_move
                if (Math.abs(next_row - row) === 1 && Math.abs(next_column - column) === 1 && pieces_info[next_row][next_column].name === '') {
                    en_passent_location = to_algebraic_notation(next_row, next_column)
                }
            }
        }
    }
    if (en_passent_location === "") fen = fen + "-"
    else fen = fen + en_passent_location;
    // add space
    fen = fen + " ";

    // fifth field: halfmove clock
    fen = fen + get(halfmove).toString() + " "


    // sixth field: fullmove clock
    const current_timer = get(game_timer)
    if (current_timer % 2 === 1) fen = fen + ((current_timer-1)/2).toString();
    else fen = fen + (current_timer/2).toString();

    return fen;
}