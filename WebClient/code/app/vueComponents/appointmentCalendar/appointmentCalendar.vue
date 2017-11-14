<template src="./appointmentCalendar.template.html"></template>
<style type="text/css">
    .modal-container {
        width: 900px;
        margin: 0px auto;
        padding: 0px 0px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-body {
        margin: 0 0;
    }
</style>
<script type="text/javascript">
    import moment from 'moment-timezone'

    export default {
        name: "appointmentCalendaromponent",
        props: ["param", "onUpdate", "entityInstance", "entity", "isDisabled", "userId"],
        data() {
            return {
                control: null,
                isChanging: false,
                fcEvents: [
                    // {
                    //     title: 'Aug 8 first',
                    //     start: '2017-08-08T01:00:00',
                    //     end: '2017-08-08T02:59:59',
                    //     color: '#378006',
                    //     cssClass: 'firsthalf'
                    // },
                    // {
                    //     title: 'Aug 8 second',
                    //     start: '2017-08-08T04:00:00',
                    //     end: '2017-08-08T05:59:59',
                    //     color: '#ff0000',
                    //     cssClass: 'secondhalf'
                    // },
                    // {
                    //     title: 'event2',
                    //     start: '2017-08-05',
                    //     end: '2017-08-07'
                    // },
                    // {
                    //     title: 'event3',
                    //     start: '2017-08-09T12:30:00',
                    //     allDay: false // will make the time show
                    // }
                ],
                showModal: false,
                popupHeader: 'Event details',
                popupDetails: null
            };
        },
        methods: {
            updateValue(momentDateTime) {

                // if (this.controlType == "startTime")
                //     this.param.startTime = momentDateTime.utc().format();
                // else if (this.controlType == "endTime")
                //     this.param.endTime = momentDateTime.utc().format();
                //console.log(moment(momentDateTime).utc().format("HH:mm"));
                //console.log(momentDateTime.utc().format());
                //this.onUpdate(this.param, this.paramKey, momentDateTime);
            },
            isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            },
            changeMonth(start, end, current) {
                console.log('changeMonth', start, end, current)
                this.getEntityInstanceData(current, end);
            },
            eventClick(event, jsEvent, pos) {
                console.log('eventClick', event, jsEvent, pos)
                // // this.popupDetails = event;
                // // this.showModal = true;
            },
            dayClick(day, jsEvent) {
                console.log('dayClick', day, jsEvent)
            },
            moreClick(day, events, jsEvent) {
                console.log('moreCLick', day, events, jsEvent)
            },
            closePopup() {
                this.showModal = false;
            },
            getEntityInstanceData(startDate, endDate) {
                let vm = this;
                vm.$store.dispatch("dataRequestHandler", {
                    key: "GetUserMonthlyAppoinments",
                    params: {
                        userId: this.userId,
                        startDate: startDate,
                        endDate: endDate
                    },
                    callback: (err, response) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(response);
                        vm.fcEvents = response;
                        // vm.fcEvents = [
                        //     {
                        //         title: 'Sunny Out of Office',
                        //         start: '2017-09-25T13:30:00',
                        //         end: '2017-09-27T13:30:00'
                        //     },
                        //     {
                        //         title: 'Sunny Out of Office2',
                        //         start: '2017-09-15',
                        //         end: '2017-09-15'
                        //     }
                        // ];
                    }
                });
            }
        },
        computed: {
            // format(){
            //     return 'HH:MM';
            // }
        },
        mounted() {
        },
        watch: {
            value(newValue) {
                console.log(newValue);
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
        },
        components: {
            'full-calendar': require('vue-fullcalendar'),
            'modal': {
                template: '#appointmentEvent-modal-template',
                methods: {
                    save: function (flag) {
                        this.$parent.closePopup();
                    },
                },
            }
        }
    };

</script>