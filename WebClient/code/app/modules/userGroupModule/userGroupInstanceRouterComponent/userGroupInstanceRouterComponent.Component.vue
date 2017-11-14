<template>
    <vw-user-group-instance-component :userGroupInstanceId="computedUserGroupInstanceId"></vw-user-group-instance-component>
</template>
<script>
    export default {
        computed: {
            computedUserGroupInstanceId() {
                return this.$store.state.userGroupInstanceId;
            }
        }
    }
</script>