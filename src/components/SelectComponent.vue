<!-- 
    component to render a dropdown selector 
    note: v-for can take integers
    note2: @change events emit selected value back to the parent component
-->

<template>
    <select :name="name" :id="id" class="form-select" :aria-label="ariaLabel" @change="updateValue">
        <slot name="defaultOption"></slot>
        <option v-if="typeof this.options == 'number'" v-for="option in options" :value="option">{{ option }}</option>
        <option v-else v-for="option in options" :value="option.value">{{ option.displayText }}</option>
    </select>
</template>

<script>
    export default {
        name: "SelectComponent",

        props: {
            name: String,
            id: String,
            options: [Array, Number],
            ariaLabel: String,
            modelValue: String,
        },

        methods: {
            updateValue(event) {
                this.$emit('update:modelValue', event.target.value);
            }
        }
    }
</script>