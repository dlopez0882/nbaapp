<!-- component to render a data table -->
<template>
    <div class="container">
        <div class="table-scrollable">
            <table class="m-auto table table-striped table-bordered">
                <thead>
                    <tr>
                        <th v-for="field in header" class="table-text" :title="field.title">{{ field.heading }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bodyRow in body">
                        <td v-for="bodyField in bodyFields">{{ bodyRow[bodyField] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableComponent",

    props: {
        'header': Array,
        'body': Array,
        'bodyFields': Array,
    }
}
</script>

<style scoped>
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