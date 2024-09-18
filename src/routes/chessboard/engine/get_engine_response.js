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

    console.log(fen);

    const depth = get_depth()

    // construct URI with query parameters
    // const uri_with_params = `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${depth}`

    const uri = "https://chess-api.com/v1"

    // get response
    // const response = fetch(uri_with_params, { method: 'GET' })
    const response = fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fen: fen, depth: depth })
    })

    return response;
}