<template src="./menuInstanceListComponent.template.html"></template>
<script type="text/babel">
    export default {
        name: "vw-menu-instance-list-component",
        data() {
            return {
                menuList: [],
                showNewMenu: false
            }
        },
        methods: {
            getData() {
                this._getMenuInstanceList();
            },
            _getMenuInstanceList() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetParentMenuInstanceList",
                    params: {},
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error while retrieving menus list. => ", error);
                            return;
                        }

                        if (response) {
                            vm.menuList = response;
                        }
                    }
                })
            },
            createMenu() {
                let vm = this;

                vm.showNewMenu = true;
            },
            onClickCancelMenuCreation() {
                let vm = this;

                vm.showNewMenu = false;
            },
            onClick_goToMenuItemConfiguration(menuItem) {
                if (menuItem.hasOwnProperty("MenuInstanceIdText")) {
                    this.$store.commit("setParentMenuInstanceId", menuItem.MenuInstanceIdText);
                    window.location.href = this.$store.state.uiPageName + "#menuConfigure/" + menuItem.MenuInstanceIdText;
                }
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>