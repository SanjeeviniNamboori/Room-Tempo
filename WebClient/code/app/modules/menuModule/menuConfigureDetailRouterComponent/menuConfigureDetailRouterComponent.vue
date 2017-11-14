<template>
    <vw-menu-instance-detail-component :menuInstanceId="computedMenuInstanceId"></vw-menu-instance-detail-component>
</template>
<script>
    export default {
        computed: {
            computedMenuInstanceId() {
                return this.$store.state.menuInstanceId;
            }
        }
    }
</script>