<template src="./datePicker.template.html"></template>
<script type="text/javascript">
    import moment from 'moment-timezone'

    export default {
        name: "datePickerComponent",
        props: ["keyString", "value", "onUpdate", "format", "pickerType", "isDisabled", "isRequired", "errorMessage", "showErrorMessage"],
        data() {
            return {
                control: null,
                isChanging: false
            };
        },
        methods: {
            updateValue(momentDateTime) {
                this.onUpdate(this.keyString, momentDateTime);
            },
            isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
        },
        computed: {
            // format(){
            //     return 'HH:MM';
            // }
        },
        mounted() {
            let options = {
                format: this.format,
                useCurrent: false,
                showClear: true,
                showClose: false,
                showTodayButton: true,
                icons: {
                    time: 'fa fa-clock-o',
                    date: 'fa fa-calendar',
                    up: 'fa fa-chevron-up',
                    down: 'fa fa-chevron-down',
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-dot-circle-o',
                    clear: 'fa fa-trash',
                    close: 'fa fa-times'
                },
                inline: false,
                ignoreReadonly: true,
                allowInputToggle: true,
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'bottom'
                }
            };

            $(this.$el).datetimepicker(options);
            this.control = $(this.$el).data("DateTimePicker");
            this.control.hide();

            //set date if available
            if (this.value && this.value != "") {
                //console.log(moment(this.value));
                if (this.pickerType == 'date')
                    this.control.date(moment(this.value));
                else {
                    let someDate = new Date();
                    let savedTime = this.value.split(":");
                    someDate.setHours(savedTime[0]);
                    someDate.setMinutes(savedTime[1]);
                    this.control.date(moment(someDate));
                }

            }

            $(this.$el).on("dp.show", function () {
                //console.log("showed");
            });
            let me = this;
            $(this.$el).on("dp.change", function () {
                if (!me.isChanging) {
                    me.isChanging = true;
                    me.$nextTick(function () {
                        me.isChanging = false;
                        if (me.updateValue) {

                            //console.log(moment(me.control.date()).format("HH:mm"));
                            if (me.value && me.value.val === null && me.control.date() === null) {
                                return
                            }
                            else if (me.value && me.value.val && me.control.date() && me.control.date().isSame(moment(me.value.val), "second")) {
                                return
                            }
                            me.updateValue(me.control.date());
                        }
                    });
                }
            });
        },
        watch: {
            // format(newFormat) {
            //     console.log(newFormat);
            //     this.control.format(newFormat)
            // },
            value(newValue) {
                //set date if changed
                this.control.date(newValue ? moment(newValue) : null);
            },
            isDisabled: {
                handler: function (check) {
                    console.log(check);
                },
                deep: true
            }
        },
        destroyed() {
            //this.control.destroy();
            //console.log("date destroyed: ", this.control)
        }
    };

</script>