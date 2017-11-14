<template src="./userGroupInstanceComponent.template.html"></template>
<script type="text/babel">
    export default {
        name: "vw-user-group-instance-component",
        props: ["userGroupInstanceId"],
        data() {
            let userGroupConfigureTabs = [];

            let userGroupDetail = {text: "User Group Settings", id: 1};
            let userToUserGroupAssociations = {text: "User to User Group Assc", id: 2};
            let userGroupToMenusAssociations = {text: "User Group To Menu Assc", id: 3};

            userGroupConfigureTabs.push(userGroupDetail);
            userGroupConfigureTabs.push(userToUserGroupAssociations);
            userGroupConfigureTabs.push(userGroupToMenusAssociations);

            return {
                userGroupInstanceDetail: null,
                userToUserGroupAllocation: [],
                userGroupToMenuAllocation: [],

                userGroupConfigureTabs: userGroupConfigureTabs,
                selectedTabId: 2,

                showDeleteConfirmation: false
            }
        },
        methods: {
            getData() {
                this._getUserGroupInstanceDetailWithUserList();
            },
            _getUserGroupInstanceDetailWithUserList() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetUserGroupDetail",
                    params: {
                        userGroupInstanceId: vm.userGroupInstanceId
                    },
                    callback: (error, response) => {

                        if (response) {
                            if (response.hasOwnProperty("userGroupInstanceDetail")) {
                                vm.userGroupInstanceDetail = response.userGroupInstanceDetail;
                            }

                            if (response.hasOwnProperty("userToUserGroupAllocation")) {
                                vm.userToUserGroupAllocation = response.userToUserGroupAllocation;
                            }

                            if (response.hasOwnProperty("userGroupToMenuAllocation")) {
                                vm.userGroupToMenuAllocation = response.userGroupToMenuAllocation;
                            }
                        }
                    }
                });
            },
            onClick_SaveUserToUserGroupAllocation(userAllocatedItem) {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "SaveUserToUserGroupAllocation",
                    params: {
                        userAllocatedItem: userAllocatedItem,
                        userGroupInstanceId: vm.userGroupInstanceId,
                        userGroupInstanceName: vm.userGroupInstanceDetail.UserGroupInstanceName
                    },
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error has occured while allocating a user to the user group => ", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                header: "Failed to save!",
                                message: "User to User Group Failed to save."
                            });
                            return;
                        }
                        if (response === 1) {
                            if (userAllocatedItem.userGroupInstanceName === null || userAllocatedItem.userGroupInstanceName.trim() === "") {
                                userAllocatedItem.userGroupInstanceName = vm.userGroupInstanceDetail.UserGroupInstanceName;
                            } else {
                                userAllocatedItem.userGroupInstanceName += "," + vm.userGroupInstanceDetail.UserGroupInstanceName;
                            }
                        } else if (response === 0) {
                            if (userAllocatedItem.userGroupInstanceName.indexOf("," + vm.userGroupInstanceDetail.UserGroupInstanceName + ",") > -1) {
                                userAllocatedItem.userGroupInstanceName =
                                    userAllocatedItem.userGroupInstanceName.replace("," + vm.userGroupInstanceDetail.UserGroupInstanceName + ",", "");
                            } else if (userAllocatedItem.userGroupInstanceName.indexOf(vm.userGroupInstanceDetail.UserGroupInstanceName + ",") > -1) {
                                userAllocatedItem.userGroupInstanceName =
                                    userAllocatedItem.userGroupInstanceName.replace(vm.userGroupInstanceDetail.UserGroupInstanceName + ",", "");
                            } else if (userAllocatedItem.userGroupInstanceName.indexOf("," + vm.userGroupInstanceDetail.UserGroupInstanceName) > -1) {
                                userAllocatedItem.userGroupInstanceName =
                                    userAllocatedItem.userGroupInstanceName.replace("," + vm.userGroupInstanceDetail.UserGroupInstanceName, "");
                            } else if (userAllocatedItem.userGroupInstanceName.indexOf(vm.userGroupInstanceDetail.UserGroupInstanceName) > -1) {
                                userAllocatedItem.userGroupInstanceName =
                                    userAllocatedItem.userGroupInstanceName.replace(vm.userGroupInstanceDetail.UserGroupInstanceName, "");
                            }
                        }
                        vm.$store.dispatch("toastr", {
                            type: "success",
                            header: "Successfully Saved!",
                            message: "User to User Group Successfully Saved."
                        });
                    }
                })
            },
            onClick_SaveUserToMenuAllocation(userToMenuAllocatedItem) {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "SaveUserGroupToMenuAllocation",
                    params: {
                        userToMenuAllocatedItem: JSON.parse(JSON.stringify(userToMenuAllocatedItem)),
                        userGroupInstanceId: vm.userGroupInstanceId
                    },
                    callback: (error, response) => {
                        if (error !== undefined && error !== null) {
                            console.error("Error has occured while saving user group to menu allocation => ", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                header: "Failed to save!",
                                message: "Menu to User Group Failed to save."
                            });
                            return;
                        }

                        if (response !== null && response !== undefined) {
                            vm.$store.dispatch("toastr", {
                                type: "success",
                                header: "Successfully Saved!",
                                message: "Menu to User Group Successfully Saved."
                            });
                            console.log("Response after allocating menu to user group. => ", response);
                        }
                    }
                });
            },
            onClick_selectTab(tabId) {
                this.selectedTabId = tabId;
            },
            onClick_ContinueWithDelete() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "DeleteUserGroupDetail",
                    params: {
                        userGroupInstanceId: vm.userGroupInstanceId
                    },
                    callback: (error, response) => {
                        vm.showDeleteConfirmation = false;

                        if (response !== undefined && response !== null
                            && response.hasOwnProperty("errorCode") && response.errorCode === 0) {

                            vm.$store.dispatch("toastr", {
                                type: "success",
                                header: "Success!",
                                message: "User Group Deleted Successfully!"
                            });

                            window.location.href = vm.$store.state.uiPageName + "#userGroupList";
                        }
                    }
                });
            },
            onClick_SaveUserGroupSettings() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "SaveUserGroupDetail",
                    params: {
                        userGroupInstanceId: vm.userGroupInstanceId,
                        name: vm.userGroupInstanceDetail.UserGroupInstanceName,
                        description: vm.userGroupInstanceDetail.UserGroupInstanceDescription,
                        iconClass: vm.userGroupInstanceDetail.UserGroupInstanceIconClass,
                        isAdminGroup: vm.userGroupInstanceDetail.IsUserGroupInstanceAdmin
                    },
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error has occured => ", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                message: error
                            });
                            return;
                        }

                        if (response) {
                            vm.$store.dispatch("toastr", {
                                type: "success",
                                message: "User Group Updated successfully."
                            });
                            // window.location.href = vm.$store.state.uiPageName + "#userGroupInstance/" + response;
                        }
                    }
                });
            }
        },
        computed: {
            selectedTab() {
                return this.selectedTabId;
            }
        },
        watch: {
            userGroupInstanceId() {
                this.getData();
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>