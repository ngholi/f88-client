(function(){

'use strict';
angular.module('ApplicationConfig', [])
.value('AppConfig', {
	loginUrl: 'https://localhost:3000/authenticate/login'
});

})();

