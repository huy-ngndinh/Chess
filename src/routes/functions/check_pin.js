import { pieces } from "../store"
import { get } from "svelte/store"
import { movable_after_king_check } from "./king_check"

export const check_pin = (
    /** @type { Number[] } */ current_position, 
    /** @type { Number[] } */ next_position, 
    /** @type { String } */ side, 
) => {
    const [row, column] = current_position
    const [next_row, next_column] = next_position

    const pieces_modified = get(pieces).map((value) => value.slice());
    pieces_modified[next_row][next_column] = pieces_modified[row][column]
    pieces_modified[row][column] = {
        name: "",
        id: -1,
        initial_position: [-1, -1]
    }

    const king_attacked = movable_after_king_check(side, pieces_modified);

    return king_attacked;
}