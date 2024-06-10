<script>
    let current_loading_text = ""
    const loading_text = [". loading", ". . loading", ". . . loading", ". . loading"]
    var index = 0;
    setInterval(() => {
        current_loading_text = loading_text[index];
        index = (index + 1) % 4;
    }, 2000)
</script>

<div class=loading-container>
    <div class="loading">
        {current_loading_text}
    </div>
</div>

<style>
    .loading-container {
        height: 100%;
        width: 100%;

        grid-row-start: 1;
        grid-row-end: 9;
        grid-column-start: 1;
        grid-column-end: 9;

        background-color: #EEEEEE;

        border: 2px solid black;
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading {
        font-family: 'sub-headline';
        letter-spacing: 2px;
        font-size: 30px;
    }
</style>