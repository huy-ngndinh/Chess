<script>
    import { get_square_info } from "./functions/get_square_info";
    import Piece from "./piece.svelte";
    import { selected_square, square_highlighted, highlighted_square_clicked, white_turn, king_in_check, move_after_check } from "./store";
    export let piece = {
        name: "",
        id: -1,
    }
    export let row, column

    $: highlight_condition = () => {
        if (!$king_in_check) return $square_highlighted[row][column];

        const [piece_row, piece_column] = $selected_square;
        const square_info = get_square_info(piece_row, piece_column);
        if (!square_info.has_piece) return $square_highlighted[row][column];

        const next_move = {
            name: square_info.name,
            from_position: [piece_row, piece_column],
            to_position: [row, column]
        }

        var hasMove = false;
        for (const move of $move_after_check) {
            if(move.name === next_move.name && 
               JSON.stringify(move.from_position) === JSON.stringify(next_move.from_position) &&
               JSON.stringify(move.to_position) === JSON.stringify(next_move.to_position) 
            ) {
                hasMove = true;
            }
        }

        if (hasMove) {
            return $square_highlighted[row][column];
        } else {
            return false;
        }
    }

    $: disabled_condition = () => {
        if (has_piece_type() === 1 && !$white_turn) return true;
        if (has_piece_type() === -1 && $white_turn) return true;
        return false;
    }

    const on_click = () => $selected_square = [row, column]

    const on_click_highlighted = () => {
        $highlighted_square_clicked = true;
        $selected_square = [row, column];
    }

    const has_piece_type = () => {
        const square_info = get_square_info(row, column);
        if (square_info.has_piece && square_info.side === 'white') return 1;
        else if (square_info.has_piece && square_info.side === 'black') return -1;
        else return 0;
    }

</script>
<div class="square-container">
    {#if /*$square_highlighted[row][column]*/ highlight_condition() }
        <button class="square-highlighted" on:click|preventDefault={() => on_click_highlighted()}>
            {#if piece.name !== ""} 
                <Piece piece_info={piece.name}/>
            {/if}
        </button>
    {:else}
        <!-- Light square -->
        {#if (row % 2 === 0 && column % 2 === 0) || (row % 2 === 1 && column % 2 === 1)}
            <!-- Disable button if it's the opponent's turn -->
            <button 
                class="square-black" 
                on:click|preventDefault={() => on_click()} 
                disabled={disabled_condition()}
            >
                {#if piece.name !== ""} 
                    <Piece piece_info={piece.name}/>
                {/if}
            </button>
        <!-- Dark square -->
        {:else} 
            <!-- Disable button if it's the opponent's turn -->
            <button 
                class="square-white" 
                on:click|preventDefault={() => on_click()}
                disabled={disabled_condition()}
            >
                {#if piece.name !== ""} 
                    <Piece piece_info={piece.name}/> 
                {/if}
            </button>
        {/if}
    {/if}
</div>

<style>
    .square-container {
        height: 100%;
        width: 100%;
        border-style: solid;
        border-width: 0.5px;
    }
    .square-highlighted {
        height: 100%;
        width: 100%;
        background-color: #EEE4B1;
        border: none;
        font-size: 10px;
        
    }
    .square-white {
        height: 100%;
        width: 100%;
        background-color: #344955;
        border: none;
        font-size: 10px;
    }
    .square-black {
        height: 100%;
        width: 100%;
        background-color: #50727B;
        border: none;
        font-size: 10px;
    }
</style>

