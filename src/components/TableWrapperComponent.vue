<template>
    <div :class="wrapperClass">
        <slot name="component"></slot>
    </div>
</template>

<script>
    export default {
        name: "TableWrapperComponent",
        props: {
            wrapperClass: String,
        }
    }
</script>

<style scoped>
.table-shadow {
    box-shadow: inset 0 0 5px rgba(150, 150 ,150,0.35);
}
.table-scrollable {
    overflow-x: auto;
    max-width: 300px;
    box-shadow: inset 0 0 5px rgba(150, 150 ,150,0.35);
    margin: auto;
}

@media (min-width: 576px) { 
    .table-scrollable {
        max-width: 500px;
    }
}

@media (min-width: 768px) { 
    .table-scrollable {
        max-width: 700px;
    }
}

@media (min-width: 992px) { 
    .table-scrollable {
        max-width: 900px;
    }
}

@media (min-width: 1200px) { 
    .table-scrollable {
        max-width: 100%;
    }
}
</style>