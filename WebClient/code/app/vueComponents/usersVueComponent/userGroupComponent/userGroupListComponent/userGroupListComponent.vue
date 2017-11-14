<template src="./userGroupListComponent.template.html"></template>
<script type="text/babel">
    export default {
        name: "vw-user-group-list-component",
        data() {
            return {
                userGroupList: [],
                showNewUserGroup: false
            }
        },
        methods: {
            getData() {
                this._getUserGroupList();
            },
            _getUserGroupList() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetUserGroupList",
                    params: {},
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error => ", error);
                            return;
                        }

                        if (response) {
                            console.log("Response => ", response);
                            vm.userGroupList = response;
                        }
                    }
                });
            },
            createUserGroup() {
                let vm = this;
                console.log("create new user group list.");
                vm.showNewUserGroup = true;
            },
            onClickCancelUserGroupCreation() {
                let vm = this;

                vm.showNewUserGroup = false;
            },
            onClick_goToUserGroupInstance(userGroupItem) {
                let vm = this;

                if (userGroupItem && userGroupItem.hasOwnProperty("UserGroupInstanceIdText")) {
                    window.location.href = vm.$store.state.uiPageName + "#userGroupInstance/" + userGroupItem.UserGroupInstanceIdText;
                }
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>