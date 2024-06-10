<script>
    import { highlighted_square_clicked, pieces, previous_selected_square, selected_square, king_in_check, white_turn, start_game, flip_board, square_highlighted } from "../store";
    import Square from "./square.svelte";
    import { highlight_square } from "./functions/highlight_square";
    import { onDestroy } from "svelte";
    import { move_piece } from "./functions/move_piece";
    import { promotion } from "./functions/promotion";
    import { king_status } from "./functions/king_check";
    import { engine_move } from "./engine/engine_move";
    import Difficulty from "./setting/difficulty.svelte";
    import FlipBoard from "./setting/flip_board.svelte";
    import EvaluationBar from "./setting/evaluation_bar.svelte"
    import EvaluationButton from "./setting/evaluation_button.svelte";
    import HelpText from "./setting/help_text.svelte";
    import Gif from "./setting/gif.svelte";
    import StartButton from "./setting/start_button.svelte";
    import ChessPending from "./chess_pending.svelte";

    const unsubsribe_selected_square = selected_square.subscribe(() => {

        if ((!$white_turn && !$flip_board) || ($white_turn && $flip_board)) {

            const [previous_row, previous_column] = $previous_selected_square;
            const [row, column] = $selected_square;
            move_piece(previous_row, previous_column, row, column);
            $previous_selected_square = $selected_square;

        } else if ($highlighted_square_clicked) {

            const [previous_row, previous_column] = $previous_selected_square;
            const [row, column] = $selected_square;
            highlight_square(previous_row, previous_column, previous_row, previous_column);
            move_piece(previous_row, previous_column, row, column);
            $highlighted_square_clicked = false;
            $previous_selected_square = $selected_square;

        } else {

            const [previous_row, previous_column] = $previous_selected_square;
            const [row, column] = $selected_square;
            highlight_square(previous_row, previous_column, row, column);
            $previous_selected_square = $selected_square;

        }

        promotion();

        const result = king_status();
        if (result === 'checkmate') {
            console.log("Checkmate");
            sleep(5000).then(() => location.reload());
        }
        if (result === 'has-escape') {
            king_in_check.set(true)
        }
        if (result === 'no-check') {
            king_in_check.set(false);
        }   
    })
    onDestroy(unsubsribe_selected_square);

    const unsubsribe_white_turn = white_turn.subscribe(() => {
        engine_move();
    })
    onDestroy(unsubsribe_white_turn)

    function sleep(/** @type {number} */ ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    export let scroll_down_active = false, scroll_up_active = false;

    const on_hover = () => {

        if (scroll_down_active) return;

        scroll_up_active = true;

        const container = document.getElementsByClassName("container")[0];
        container.scroll({
            top: 0,
            behavior: "smooth"
        })

        setTimeout(() => {
            scroll_up_active = false;
        }, 600)
    }

</script>

<div class="container">
    <div class="setting-container">

        <div class="left-container">
            <Difficulty />
            <FlipBoard />
            <EvaluationButton />
            <HelpText />
            <Gif />
            <StartButton />
        </div>

        <div class="right-container">
            <EvaluationBar />
        </div>

    </div>

    <div class="chessboard-container">
        {#if $start_game}
            {#each $pieces as row_list, row }
                {#each row_list as piece, column}
                    <Square piece={piece} row={row} column={column} />
                {/each}
            {/each}
        {:else}
            <ChessPending />
        {/if}
    </div>

    <div class="scroll-up-button-container">
        <button class="scroll-up-button" on:mouseenter|preventDefault={() => on_hover()}>
            <svg class="up-arrow" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 768"><path d="M397.18,221.55A35.74,35.74,0,0,0,373,231L52.89,524.24a9.19,9.19,0,0,0-.57,13l14.59,15.93a9.2,9.2,0,0,0,13,.57L397.07,263.15,691,553a9.19,9.19,0,0,0,13-.09l15.17-15.39a9.18,9.18,0,0,0-.09-13L422.33,231.87A35.76,35.76,0,0,0,397.18,221.55Z" style="fill:#1a1a1a"/></svg>
        </button>
    </div>
</div>



<style>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1%;
    }
    .setting-container {
        height: 80%;
        width: 40%;
        border-radius: 20px;

        display: flex;
        flex-direction: row;
    }
    .left-container {
        height: 100%;
        width: 85%;
        /* background-color: green; */

        display: flex;
        /* justify-content: center; */
        align-items: center;
        flex-direction: column;
        gap: 2.5%;
    }
    .right-container {
        height: 100%;
        width: 15%;
        /* background-color: blue; */

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chessboard-container {
        position: relative;
        height: 700px;
        width: 750px;

        background-color: whitesmoke;

        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
    }

    .scroll-up-button-container {
        position: absolute;
        height: 10%;
        width: 35%;
        top: 100%;
        left: 4%;
    }
    .scroll-up-button {
        height: 100%;
        width: 100%;
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    }
    .up-arrow {
        height: 100%;
    }
</style>