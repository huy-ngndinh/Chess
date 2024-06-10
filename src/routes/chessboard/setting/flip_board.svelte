<script>
    import { flip_board, start_game } from "../../store";

    const onClick = () => {
        flip_board.update((value) => !value)
    }

</script>

<div class="flip-container">
    <div class="flip-title" style="color: {$start_game ? "#BBB9B5" : "black"}">Flip the board</div>
    {#if !$flip_board}
        <button 
            class="flip-checkbox-unselected" 
            on:click|preventDefault={() => onClick()}
            disabled={$start_game}
        ></button>
    {:else}
        <button 
            class="flip-checkbox-selected" 
            on:click|preventDefault={() => onClick()}
            disabled={$start_game}
        ></button>
    {/if}

    <div class="cross-out" class:animate={$start_game}></div>

</div>

<style>
    .flip-container {
        height: 100%;
        width: 60%;
        /* background-color: beige; */

        display: flex;
        gap: 5%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        
        transform: rotate(-4deg);
    }
    .flip-title {
        font-family: 'setting';
        font-size: 22.5px;
        letter-spacing: 1px;
    }
    .flip-checkbox-unselected {
        height: 50%;
        aspect-ratio: 1 / 1;
        border-radius: 5px;
    }
    .flip-checkbox-selected {
        height: 50%;
        aspect-ratio: 1 / 1;
        border-radius: 5px;
        background-color: #FFEEA9;
    }
    .cross-out {
        background-color: #1A2130;

        position: absolute;
        right: 10%;

        height: 4%;
        width: 0%;

        transition: width 1s;
    }
    .animate {
        width: 80%;
    }
</style>