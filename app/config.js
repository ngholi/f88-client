(function(){
/**
 * @author: H.Linh
 * created on Oct 11, 2016
 */
'use strict';
var apiHost = 'https://localhost:3000/';
angular.module('ApplicationConfig', [])
.value('AppConfig', {
	api: {
		loginUrl: apiHost + 'authenticate/login',
		signupUrl: apiHost + 'users/create',
		createDepartment: apiHost + 'departments/create',
		allUser: apiHost + 'u',
		allDepartment: apiHost + 'departments/all',
		editDepartment: apiHost + 'departments/edit',
	},
	msg: {
		CREATING_NEW_USER: 'Creating new user',
		USER_CREATED: 'User created',
		CREATE_USER_ERROR: 'Can\'t create new user',
		UNAUTHORIZED: 'Unauthorized',
		FORCE_OUT_UNAUTHORIZED: 'You have been logout due to Unauthorized. Please re-login!',
		USER_EXISTS: 'Email already exists.',
		NOT_FILL_ALL_REQUIRED_FIELD: 'You aren\'t fill all required fields',
		LOGIN_FAIL: 'Login fail',
		INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
		DEPARTMENT_CREATED: 'Department created',
		CREATE_DEPARTMENT_ERROR: 'Can\'t create new department',
		EDIT_SUCCESSFULLY: 'Edit successfully',
		EDIT_FAIL: 'Edit fail',
		ERROR_SELF_DEPEND: 'Department can\'t belong to itself. Please choose another department!',
	},
	broadcast: {
		Unauthorized: 'Unauthorized',
		SubmitForm: 'submit',
		GetAllUsersDone: 'get-all-user-done',
		GetAllDepartmentsDone: 'get-all-department-done',
		EditedDepartment: 'edited-department',
		AddedDepartment: 'added-department',
	},
	sqlError: {
		ER_DUP_ENTRY: 1062
	},
	storage: {
		users: 'users',
		departments: 'departments'
	}
});

})();

