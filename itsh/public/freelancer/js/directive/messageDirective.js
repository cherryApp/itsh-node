// Directive for show messages.
itsh.directive('itshMessage', ['$timeout', function($timeout) {
    return {
        restrict: 'EA',
        templateUrl: '/template/itshMessage.html',
        scope: {
            options: '='
        },
        link: function(scope) {
            console.log(scope.options);

            scope.showMessage = function(options) {
                var delay = options.delay || 4000;
                scope.mClass = options.mClass || 'alert-info';
                scope.mMessage = options.mMessage;
                scope.mTitle = options.mTitle;
                scope.mShow = true;
                $timeout(function() {
                    scope.mShow = false;
                }, delay);
            };

            scope.$watchCollection('options', function(newVal, oldVal) {
                if (Object.keys(newVal).length < 1) return;
                scope.showMessage(newVal);
                scope.options = {};
            });

        }
    };
}]);