import { difficulty_list } from "../../store";
import { get_fen } from "./get_fen"
import { get } from "svelte/store";

const get_depth = () => {
    var answer = 0;
    get(difficulty_list).forEach((difficulty) => {
        if (difficulty.selected) {
            answer = difficulty.depth;
        }
    });
    return answer;
}

export const get_engine_response = () => {

    const fen = get_fen();

    const depth = get_depth()

    // construct URI with query parameters
    const uri_with_params = `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`

    // get response
    const response = fetch(uri_with_params, { method: 'GET' })

    return response;
}