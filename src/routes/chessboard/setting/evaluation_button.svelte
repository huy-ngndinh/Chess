<script>
    import { show_eval, start_game } from "../../store";

    const onClick = () => {
        show_eval.update((value) => !value);
    }
</script>

<div class="evaluation-button-container">
    <div class="evaluation-title" style="color: {$start_game ? "#BBB9B5" : "black"}">Evaluation bar</div>
    {#if !$show_eval}
        <button 
            class="evaluation-checkbox-unselected" 
            on:click={() => onClick()}
            disabled={$start_game}
        ></button>
    {:else}
        <button 
            class="evaluation-checkbox-selected" 
            on:click={() => onClick()}
            disabled={$start_game}
        ></button>
    {/if}

    <div class="cross-out" class:animate={$start_game}></div>

</div>

<style>
    .evaluation-button-container {
        height: 10%;
        width: 100%;
        /* background-color: yellow; */

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2%;

        transform: rotate(3deg) translateX(10%);
    }
    .evaluation-title {
        font-family: 'setting';
        font-size: 22.5px;
        letter-spacing: 1px;
    }
    .evaluation-checkbox-unselected, .evaluation-checkbox-selected {
        height: 50%;
        aspect-ratio: 1 / 1;
        border-radius: 5px;
    }
    .evaluation-checkbox-selected {
        background-color: #FFEEA9;
    }
    .cross-out {
        background-color: #1A2130;

        position: absolute;
        left: 25%;

        height: 4%;
        width: 0%;

        transition: width 1s;
    }
    .animate {
        width: 50%;
    }
</style>

