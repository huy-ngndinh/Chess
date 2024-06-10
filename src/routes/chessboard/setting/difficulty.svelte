<script>
    import { difficulty_list } from "../../store";
    import ChessPending from "../chess_pending.svelte";
    import { start_game } from "../../store";

    const onClick = (/** @type {Number} */ index) => {
        difficulty_list.update((value) => {
            value = value.map(element => {
                element.selected = false;
                return element
            });
            value[index].selected = true;
            return value;
        })
    }
</script>

<div class="difficulty-container">
    <div class="difficulty-title" style="color: {$start_game ? "#BBB9B5" : "black"}">Difficulty </div>
    {#each $difficulty_list as difficulty, index}
        {#if !difficulty.selected }
            <button 
                class="difficulty-box-unselected" 
                on:click={() => onClick(index)}
                style="transform: rotate({index % 2 === 0 ? -5 : 5}deg)"
                disabled={$start_game}
            >{difficulty.elo}</button>
        {:else}
            <button 
                class="difficulty-box-selected" 
                on:click={() => onClick(index)}
                style="transform: rotate({index % 2 === 0 ? -5 : 5}deg)"
                disabled={$start_game}
            >{difficulty.elo}</button>
        {/if}
    {/each}
    
    <div class="cross-out" class:animate={$start_game}></div>

</div>

<style>
    .difficulty-container {
        position: relative;
        height: 15%;
        width: 100%;

        border-radius: 10px;
        
        display: flex;
        gap: 3%;
        justify-content: center;
        align-items: center;
    }
    @font-face {
        font-family: 'setting';
        src: url('/fonts/setting.ttf') format('truetype');
    }
    .difficulty-title {
        height: 100%;
        width: 15%;

        display: flex;
        justify-content: center;
        align-items: center;
        

        font-size: 22.5px;
        font-family: 'setting';
        letter-spacing: 1px;

        margin-right: 2%;

        transform: rotate(5deg);
    }
    .difficulty-box-unselected, .difficulty-box-selected {
        background-color: #FEFBF6;
        height: 65%;
        aspect-ratio: 1 / 1;

        border-width: 2px;
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-family: 'sub-headline';
        font-size: 18px;
    }
    .difficulty-box-selected {
        background-color: #FFEEA9;
    }
    .cross-out {
        background-color: #1A2130;

        position: absolute;
        left: -1%;

        height: 4%;
        width: 0%;

        transition: width 1s;
    }
    .animate {
        width: 101%;
    }
</style>