<template src="./menuConfigureMetaDataComponent.template.html"></template>
<script type="text/babel">
    export default {
        name: "vw-menu-edit-meta-data-component",
        props: ["getMenuInstanceDetail", "cancelNewMenuCreation", "parentMenuInstanceId"],
        data() {
            return {
                menuInstanceDetail: {
                    namespaceInstanceId: "",
                    namespaceInstanceName: "",
                    menuInstanceId: null,
                    parentMenuInstanceId: this.parentMenuInstanceId,
                    name: "",
                    description: "",
                    iconClass: "",
                    navigateToUrl: "",
                    navigateToFragment: "",
                    methodToDisplayMenuCount: "",
                    fragmentToDisplayMenuCount: ""
                }
            }
        },
        methods: {
            onClick_createNewMenu() {
                let vm = this;

                vm.$store.dispatch("dataRequestHandler", {
                    key: "SaveMenuInstanceDetail",
                    params: JSON.parse(JSON.stringify(vm.menuInstanceDetail)),
                    callback: (error, response) => {
                        if (error) {
                            console.error("Error has occured while saving menu instance meta data.", error);
                            vm.$store.dispatch("toastr", {
                                type: "error",
                                message: error.sqlMessage
                            });
                            return;
                        }

                        if (response) {
                            vm.$store.dispatch("toastr", {
                                type: "success",
                                header: "Successful!",
                                message: "Menu Created."
                            });
                            if (!vm.parentMenuInstanceId) {
                                window.location.href = vm.$store.state.uiPageName + "#menuConfigure/" + response;
                            }

                            if (typeof vm.cancelNewMenuCreation === "function") {
                                vm.cancelNewMenuCreation();
                            }

                            setTimeout(function () {
                                if (typeof vm.getMenuInstanceDetail === "function") {
                                    vm.getMenuInstanceDetail();
                                }
                            }, 2000);
                        }
                    }
                });
            },
            onClick_cancelNewMenuCreation() {
                let vm = this;

                if (typeof vm.cancelNewMenuCreation === "function") {
                    vm.cancelNewMenuCreation();
                }
            }
        }
    }
</script>