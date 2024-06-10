<script>
    import { onDestroy } from "svelte";
    import { evaluation, show_eval, flip_board } from "../../store";

    let current_level = 50;
    var diff_level = 0;

    const unsubscribe = evaluation.subscribe(() => {
        // convert evaluation (on a scale of 20) to percentage (on a scale of 50%)
        diff_level = Math.round( Math.min(20, Math.abs($evaluation)) / 20 * 50);

        if ($evaluation > 0) current_level = 50 + diff_level;
        else current_level = 50 - diff_level;

    })
    onDestroy(unsubscribe);

</script>

<div class="evaluation-bar-container" style="transform: rotate({!$flip_board ? "180deg" : "0deg"})">
    {#if $show_eval}
        <div class="evaluation-bar" style="height: {current_level}%"></div>
    {/if}
</div>

<style>
    .evaluation-bar-container {
        height: 100%;
        width: 50%;

        background-color: #c7c8cc;
        border: 2px solid #1A2130;
        border-radius: 5px;

        display: flex;
    }
    .evaluation-bar {
        background-color: #f0f4f8;
        width: 100%;
        transition: height 1s;
    }
</style>