<!-- component to render a dropdown selector -->
<!-- note: v-for can take integers -->
<template>
    <select :name="name" :id="id" class="form-select">
        <option v-if="typeof this.options == 'number'" v-for="option in options" :value="option">{{ option }}</option>
        <option v-else v-for="option in options" :value="option.value">{{ option.displayText }}</option>
    </select>
</template>

<script>
    export default {
        name: "InputSelectComponent",

        props: {
            'name': String,
            'id': String,
            'options': [Array, Number],
        },
    }
</script>