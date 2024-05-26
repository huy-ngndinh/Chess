<script>
    import { highlighted_square_clicked, pieces, previous_selected_square, selected_square, king_in_check, move_after_check } from "./store";
    import Square from "./square.svelte";
    import { highlight_square } from "./functions/highlight_square";
    import { onDestroy } from "svelte";
    import { move_piece } from "./functions/move_piece";
    import { promotion } from "./functions/promotion";
    import { king_status } from "./functions/king_check";

    const unsubsribe = selected_square.subscribe(() => {

        if ($highlighted_square_clicked) {

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
        /*if (checkmate()) {
            console.log("Checkmate");
            sleep(5000).then(() => location.reload());
        }*/
        
    })
    onDestroy(unsubsribe);

    function sleep(/** @type {number} */ ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

</script>

<div class="container">
    <div class="chessboard-container">
        {#each $pieces as row_list, row }
            {#each row_list as piece, column}
                <Square piece={piece} row={row} column={column} />
            {/each}
        {/each}
    </div>
</div>

<style>
    .container {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #35374B;
    }
    .chessboard-container {
        position: relative;
        height: 700px;
        width: 750px;
        background-color: whitesmoke;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        /*border: 1.5px solid #31363F;*/
        /* https://stackoverflow.com/questions/5608222/how-to-apply-box-shadow-on-all-four-sides */
        -webkit-box-shadow: 0 0 20px #222831;
        box-shadow: 0 0 20px #222831;
    }
</style>