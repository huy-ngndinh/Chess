import { get_fen } from "./get_fen"

export const get_engine_response = () => {

    const fen = get_fen();

    // construct URI with query parameters
    const uri_with_params = 'https://stockfish.online/api/s/v2.php?' + 'fen=' + fen.toString() + '&depth=15';

    // get response
    const response = fetch(uri_with_params, { method: 'GET' })

    return response;
}