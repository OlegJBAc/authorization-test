<template>
<button class='btn'>
    <slot></slot>
</button>

</template>


<script>
export default {
    name: 'myButton'
}
</script>


<style scoped>

.btn{
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    font-size: 1.1em;
    letter-spacing: 0.3ch;
    font-style: italic;
    font-weight: 500;
    border: 1px solid teal;
    border-radius: 0.3em;
    background: rgb(247, 245, 245);
}
.btn:hover{
    background: teal;
    color: white;
    cursor: pointer;
}

</style>