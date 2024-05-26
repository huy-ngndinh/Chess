import { movesets } from "../store";
import { get } from "svelte/store"


/**
 * Show all possible displacements of a piece
 * @param {*} piece_name 
 * @returns 
 */
export const get_piece_moveset = (/** @type {string} */ piece_name) => {

    const movesets_value = get(movesets);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    const piece_index = Object.keys(movesets_value).findIndex((value) => value === piece_name);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    const piece_moveset = Object.entries(movesets_value)[piece_index][1];

    return piece_moveset;
}