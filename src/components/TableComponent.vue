<!-- component to render a data table -->
<template>
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