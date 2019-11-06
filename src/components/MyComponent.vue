<template>
    <div>{{attr1}}
        <button @click="returnMethod1">button</button>
    </div>
</template>

<style>

</style>

<script>
    export default {
        data() {
            return {msg: '这个是Home模板页'}
        },
        props:{
            attr1:''
        },
        model:{
            prop:'attr1',
            event:'event1'
        },
        methods:{
            returnMethod1(){
                this.$emit('event1','吱吱吱');
            }
        }
    }
</script>
