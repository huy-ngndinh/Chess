<script>
    import { onDestroy } from "svelte";
    import { music } from "../../store";
    import { start_game } from "../../store";

    const unsubscribe = start_game.subscribe(() => {
        if ($start_game && $music) {
            var audio = document.getElementById("background-audio");
            if (audio !== null && 'volume' in audio) audio.volume = 0.03;
        }
    })
    onDestroy(unsubscribe);

    const onClick = () => {
        music.update((value) => !value);
    }
</script>

<div class="music-container">
    <div class="music-title" style="color: {$start_game ? "#BBB9B5" : "black"}">Music</div>
    {#if !$music}
        <button 
            class="music-checkbox-unselected" 
            on:click|preventDefault={() => onClick()}
            disabled={$start_game}
        ></button>
    {:else}
        <button 
            class="music-checkbox-selected" 
            on:click|preventDefault={() => onClick()}
            disabled={$start_game}
        ></button>
    {/if}

    <div class="cross-out" class:animate={$start_game}></div>

    <audio id="background-audio" autoplay loop>
        {#if $start_game && $music} 
            <source src="{process.env.NODE_ENV === 'development' ? '/audio' : '/static/audio'}/background_music.mp3" type="audio/mp3"/>
        {/if}
    </audio>
    
</div>

<style>
    .music-container {
        position: relative;
        height: 100%;
        width: 40%;
        /* background-color: yellow; */

        display: flex;
        gap: 5%;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        transform: rotate(7deg);
    }
    .music-title {
        font-family: 'setting';
        font-size: 22.5px;
        letter-spacing: 1px;
    }
    .music-checkbox-unselected {
        height: 50%;
        aspect-ratio: 1 / 1;
        border-radius: 5px;
    }
    .music-checkbox-selected {
        height: 50%;
        aspect-ratio: 1 / 1;
        border-radius: 5px;
        background-color: #FFEEA9;
    }
    .cross-out {
        background-color: #1A2130;

        position: absolute;
        left: 17.5%;

        height: 4%;
        width: 0%;

        transition: width 1s;
    }
    .animate {
        width: 65%;
    }
</style>