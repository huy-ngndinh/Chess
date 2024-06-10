<script>
    import { black_set_board, black_set_initial_previous_position } from "../../set_board";
    import { selected_square, start_game, white_turn, flip_board } from "../../store";

    const onClick = () => {
        start_game.set(true);
        if ($flip_board) {
            black_set_board();
            black_set_initial_previous_position();
            // https://thoughtspile.github.io/2023/04/22/svelte-stores/
            white_turn.set(false);
            white_turn.set(true);
        }
    }
</script>

<div class="start-container">
    <button 
        class="start-button" 
        on:click={() => onClick()}
        disabled={$start_game}
    >
        Start!
    </button>
    
    <div class="cross-out" class:animate={$start_game}></div>

</div>

<style>
    .start-container {
        /* background-color: indianred; */
        position: relative;
        height: 10%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .start-button {
        height: 60%;
        width: 30%;

        font-family: 'sub-headline';
        letter-spacing: 2px;
        font-size: 20px;

        border: 1.5px solid black;
        border-radius: 4px;
    }
    .cross-out {
        background-color: #1A2130;

        position: absolute;
        right: 32.5%;

        height: 4%;
        width: 0%;

        transition: width 1s;
    }
    .animate {
        width: 35%;
    }
</style>