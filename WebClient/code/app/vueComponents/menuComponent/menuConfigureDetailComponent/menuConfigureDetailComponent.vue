<template src="./menuConfigureDetailComponent.template.html"></template>
<script>
    export default {
        name: "vw-menu-instance-detail-component",
        props: ["menuInstanceId"],
        data() {

            let menuConfigureTabs = [];

            let menuDetailTab = {text: "Menu Detail", id: 1};
            let subMenuListTab = {text: "Sub Menu Lists", id: 2};

            menuConfigureTabs.push(menuDetailTab);
            menuConfigureTabs.push(subMenuListTab);

            return {
                menuInstanceDetail: null,
                subMenuInstanceList: [],

                showNewSubMenu: false,

                menuConfigureTabs: menuConfigureTabs,
                selectedTabId: 1,

                showDeleteConfirmation: false,
                showDeleteFailureMessage: false,
                deleteFailureMessage: ""
            }
        },
        methods: {
            _initializeComponent() {
                this.showErrorMessage = false;
                this.showDeleteFailureMessage = false;
                this.deleteFailureMessage = "";
                this.getData();
            },
            getData() {
                this._getMenuInstanceDetail();
            },
            _getMenuInstanceDetail() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetMenuInstanceDetail",
                    params: {
                        menuInstanceId: vm.menuInstanceId
                    },
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error while retrieving menu instance detail => ", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                header: "Error!",
                                message: error.sqlMessage ? error.sqlMessage : error
                            });
                            return;
                        }

                        if (response) {
                            vm.$store.dispatch("toastr", {
                                type: "success",
                                header: "Success!",
                                message: "Menu Detail retrieved."
                            });

                            if (response.hasOwnProperty("menuInstanceDetail")) {
                                vm.menuInstanceDetail = response.menuInstanceDetail;
                            }

                            if (response.hasOwnProperty("subMenuInstanceList")) {
                                vm.subMenuInstanceList = response.subMenuInstanceList;
                            }
                        }
                    }
                });
            },
            createNewSubMenu() {
                let vm = this;
                vm.showNewSubMenu = true;
            },
            onClickCancelSubMenuCreation() {
                let vm = this;
                vm.showNewSubMenu = false;
            },
            onClick_goToSubMenuItemConfiguration(subMenuItem) {
                if (subMenuItem.hasOwnProperty("MenuInstanceIdText")) {
                    this.$store.commit("setParentMenuInstanceId", this.menuInstanceId);
                    window.location.href = this.$store.state.uiPageName + "#menuConfigure/" + subMenuItem.MenuInstanceIdText;
                }
            },
            onClick_selectTab(tabId) {
                this.selectedTabId = tabId;
            },
            onClick_ContinueWithDelete() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "DeleteMenuInstanceDetail",
                    params: {
                        menuInstanceId: vm.menuInstanceId
                    },
                    callback: (error, response) => {

                        vm.showDeleteConfirmation = false;

                        if (error) {
                            console.error("Error has occurred while deleting menu => ", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                header: "Error!",
                                message: error.sqlMessage ? error.sqlMessage : error
                            });
                            return;
                        }

                        if (response !== undefined && response !== null && response.hasOwnProperty("errorCode")) {

                            if (response.errorCode === 0) {

                                vm.$store.dispatch("toastr", {
                                    type: "success",
                                    header: "Success!",
                                    message: "Menu Instance Successfully deleted!"
                                });
                                setTimeout(function () {
                                    window.location.href = vm.$store.state.uiPageName + "#menuList";
                                }, 500);
                            } else if (response.errorCode === 1) {

                                vm.$store.dispatch("toastr", {
                                    type: "info",
                                    header: "Cannot delete this sub menu.",
                                    message: response.hasOwnProperty("message") ? response.message : "Error has occurred while deleting menu."
                                });


                                vm.deleteFailureMessage = response.hasOwnProperty("message") ? response.message :
                                    "Error has occurred while deleting menu.";
                                vm.showDeleteFailureMessage = true;

                            }
                        }
                    }
                })
            },
            onClick_CancelDelete() {
                let vm = this;

                vm.showErrorMessage = false;
            },
            onClick_SaveMenuDetails() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "SaveMenuInstanceDetail",
                    params: {
                        namespaceInstanceId: "",
                        namespaceInstanceName: "",
                        menuInstanceId: vm.menuInstanceId,
                        parentMenuInstanceId: vm.menuInstanceDetail.parentMenuInstanceId,
                        name: vm.menuInstanceDetail.MenuName,
                        description: vm.menuInstanceDetail.MenuDescription,
                        iconClass: vm.menuInstanceDetail.MenuIconClass,
                        navigateToUrl: vm.menuInstanceDetail.NavigateToUrl,
                        navigateToFragment: vm.menuInstanceDetail.NavigateToFragment,
                        methodToDisplayMenuCount: vm.menuInstanceDetail.MethodToDisplayMenuCount,
                        fragmentToDisplayMenuCount: vm.menuInstanceDetail.FragmentToDisplayMenuCount
                    },
                    callback: (error, response) => {
                        if (error) {
                            console.error("Save Menu Detail error => ", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                message: error.sqlMessage
                            });
                            return;
                        }

                        if (response) {
                            vm.$store.dispatch("toastr", {
                                type: "success",
                                message: "Menu Detail has been updated."
                            });
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
            menuInstanceId() {
                this._initializeComponent();
            }
        },
        mounted() {
            this._initializeComponent();
        }
    }
</script>