<script>
    export let piece_info = ""
    const [side, name] = piece_info.split(' ');
</script>

{#if side === 'white'}
    {#if name === 'pawn'}
        <div class="icon">♙</div>
    {:else if name === 'rook'}
        <div class="icon">♖</div>
    {:else if name === 'knight'}
        <div class="icon">♘</div>
    {:else if name === 'bishop'}
        <div class="icon">♗</div>
    {:else if name === 'queen'}
        <div class="icon">♕</div>
    {:else if name === 'king'}
        <div class="icon">♔</div>
    {/if}
{:else}
    {#if name === 'pawn'}
        <div class="icon">♟</div>
    {:else if name === 'rook'}
        <div class="icon">♜</div>
    {:else if name === 'knight'}
        <div class="icon">♞</div>
    {:else if name === 'bishop'}
        <div class="icon">♝</div>
    {:else if name === 'queen'}
        <div class="icon">♛</div>
    {:else if name === 'king'}
        <div class="icon">♚</div>
    {/if}
{/if}

<style>
    .icon {
        font-size: 50px;
    }
</style>
