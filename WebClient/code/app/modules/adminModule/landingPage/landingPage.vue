<template src="./landingPage.template.html"></template>
<script>
    export default {
        data() {
            return {
                namespaceList: [],
                showNewNamespace: false,
                namespaceId: 0,
                currnamespace: 0,

                menusAllocatedToLoggedInUser: []
            }
        },
        props: [],
        methods: {
            getData() {
                this._getMenusAllocated();
            },
            _getMenusAllocated() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetRootMenusAllocatedToLoggedInUser",
                    params: {},
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error has occured while retrieving root level menus => ", error);
                            return;
                        }

                        if (response) {
                            if (response.hasOwnProperty("rootMenusList")) {
                                vm.menusAllocatedToLoggedInUser = response.rootMenusList;
                            }
                            if (response.hasOwnProperty("countOfAdminUserGroupsAllocated")) {
                                if (response.countOfAdminUserGroupsAllocated > 0) {
                                    vm.$store.commit("setIsCurrentUserAdmin", true);
                                } else if (response.countOfAdminUserGroupsAllocated <= 0) {
                                    vm.$store.commit("setIsCurrentUserAdmin", false);
                                }
                            }
                        }
                    }
                });
            },
            onClick_goToLeaveMgmt() {
                //this.$store.commit("setSelectedMenuId", 1);
                window.location.href = this.$store.state.uiPageName + "#submenu/1";
            },
            onClick_goToFeeConcession() {
                //this.$store.commit("setSelectedMenuId", 2);
                window.location.href = this.$store.state.uiPageName + "#submenu/2";
            },
            onClick_goToMyProfile() {
                window.location.href = this.$store.state.uiPageName + "#userProfile";
            },
            onClick_goToMyAttendance() {
                window.location.href = this.$store.state.uiPageName + "#myattendance";
            },
            onClick_goToMenuDetail(menuItem) {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetSubMenuCountByMenuInstanceId",
                    params: {
                        parentMenuInstanceIdText: menuItem.MenuInstanceIdText
                    },
                    callback: (error, response) => {
                        console.log("landingPage.getSubMenuCountByMenuInstanceId.response => ", response);
                        if (!isNaN(response) && response > 0) {

                            vm.$store.commit("setParentMenuInstanceId", menuItem.MenuInstanceIdText);
                            window.location.href = vm.$store.state.uiPageName + "#submenuList/" + menuItem.MenuInstanceIdText;
                        } else if (menuItem.NavigateToUrl !== undefined && menuItem.NavigateToUrl !== null && menuItem.NavigateToUrl !== "") {

                            window.location.href = vm.$store.state.uiPageName + menuItem.NavigateToUrl;
                        }
                    }
                });
            }
        },
        computed: {},
        mounted() {
            this.getData();
        }
    }

</script>