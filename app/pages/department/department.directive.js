(function(){
/**
 * @author: H.Linh
 * created on Oct 18, 2016
 */
'use strict';
var Department = angular.module('BlurAdmin.pages.department');

Department.directive('selectpicker', selectpicker);

/** @ngInject */
function selectpicker() {
	return {
	  restrict: 'A',
	  require: '?ngOptions',
	  priority: 1500, // make priority bigger than ngOptions and ngRepeat
	  link: {
	    pre: function(scope, elem, attrs) {
	      elem.append('<option data-hidden="true" disabled value="">' + (attrs.title || 'Select something') + '</option>');
	    },
	    post: function(scope, elem, attrs) {
	      function refresh() {
	        elem.selectpicker('refresh');
	      }

	      if (attrs.ngModel) {
	        scope.$watch(attrs.ngModel, refresh);
	      }

	      if (attrs.ngDisabled) {
	        scope.$watch(attrs.ngDisabled, refresh);
	      }

	      elem.selectpicker({ dropupAuto: false, hideDisabled: true });
	    }
	  }
	};
}

})();