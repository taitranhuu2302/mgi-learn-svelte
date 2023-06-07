<script>
    import "../app.css";
</script>

<div id="root">
    <slot></slot>
</div>

<style>
    #root {
        @apply bg-gradient-to-tl from-primary-500 to-primary h-screen flex items-center justify-center;
    }
</style>