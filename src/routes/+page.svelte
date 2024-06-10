<script>
    import Homepage from "./homepage/homepage.svelte";
    import Chessboard from "./chessboard/chessboard.svelte";

    let scroll_down_active = false, scroll_up_active = false
</script>

<div class="container">
    <Homepage bind:scroll_down_active={scroll_down_active} scroll_up_active={scroll_up_active}/>
    <Chessboard scroll_down_active={scroll_down_active} bind:scroll_up_active={scroll_up_active}/>
</div>

<style>
    .container {
        position: fixed;
        top: 0;
        left: 0;

        height: 100%;
        width: 100%;
        overflow-y: hidden;

        background-image: url("$images/origami-pattern-background.png");
        background-size: cover;
        background-position: center;
        background-color: rgba(255, 255, 255, 0.8);
        background-blend-mode: lighten;
        
    }

    .container::-webkit-scrollbar {
        display: none;
    }
    
</style>


