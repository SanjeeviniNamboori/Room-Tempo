<template src="./userGroupEditMetaDataComponent.template.html"></template>
<script>
    export default {
        name: "vw-user-group-edit-meta-data-component",
        props: ["namespaceInstanceId", "namespaceInstanceName", "onClickCancelUserGroupCreation"],
        data() {
            return {}
        },
        methods: {
            onClick_createNewUserGroup() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "SaveUserGroupDetail",
                    params: JSON.parse(JSON.stringify(vm.userGroupInstanceDetail)),
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error has occured => ", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                header: "User Group Instance Detail Error!",
                                message: error.sqlMessage ? error.sqlMessage : error
                            });
                            return;
                        }

                        if (response) {
                            vm.$store.dispatch("toastr", {
                                type: "success",
                                header: "Success!",
                                message: "User Group Instance successfully saved"
                            });
                            window.location.href = vm.$store.state.uiPageName + "#userGroupInstance/" + response;
                        }
                    }
                });
            },
            onClick_cancelNewUserGroupCreation() {
                let vm = this;

                if (typeof vm.onClickCancelUserGroupCreation === "function") {
                    vm.onClickCancelUserGroupCreation();
                }
            }
        },
        computed: {
            userGroupInstanceDetail() {
                let vm = this;

                if (vm.userGroupInstanceId !== undefined && vm.userGroupInstanceId !== null && vm.userGroupInstanceId !== "") {

                } else {
                    return {
                        namespaceInstanceId: "",
                        namespaceInstanceName: "",
                        userGroupInstanceId: null,
                        name: "",
                        description: "",
                        iconClass: "",
                        isAdminGroup: false
                    };
                }
            }
        }
    }
</script>