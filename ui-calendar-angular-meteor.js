CalEvents = new Mongo.Collection("calevents");
CalEvents.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});


if (Meteor.isClient) {

    angular.module('Calendardemo', ['angular-meteor', 'ui.calendar','ui.router', 'angularMoment']);

    Meteor.startup(function() {
        angular.bootstrap(document, ['Calendardemo']);
    });

    angular.module('Calendardemo').controller('MyCalendar', [
        '$scope',
        '$collection',
        function($scope, $collection) {
            $collection(CalEvents).bind($scope,'calevents',true,true);

            $scope.eventSources = [$scope.calevents];
            $scope.addCalEvent=function(date, jsEvent, view){
                var startDateTime = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
                var endDateTime = moment(date).add(1, 'h').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
                $scope.calevents.push({
                    title: 'New Event',
                    start: startDateTime,
                    end: endDateTime,
                    completed: null,
                    doing: null
                })

            };
            /* config object */
            $scope.uiConfig = {
                calendar:{
                    height: 450,
                    defaultView: 'month',
                    header:{
                        left: 'prev next today',
                        center: 'title',
                        right: 'month agendaWeek'
                    },
                    dayClick: $scope.addCalEvent
                }

            }
        }]);

}

if (Meteor.isServer) {

    Meteor.publish('calevents', function(){
        return CalEvents.find();
    })
}
