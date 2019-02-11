export default {
	required: {
		fn: function(value) {
			return value.length > 0;
		},
		msg: function() {
			return 'This field is required';
		}
	},
	string: {
		fn: function(value) {
			return typeof value !== 'string';
		},
		msg: function() {
			return 'This field must be a string';
		}
	},
	email: {
		fn: function(value) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(value).toLowerCase());
		},
		msg: function() {
			return 'This field must be a valid email';
		}
	},
	match: {
		fn: function(value, param) {
			let fieldToMatch = document.querySelector(`[name="${param}"]`);
			return value === fieldToMatch.value;
		},
		msg: function(field) {
			return `This field must match against ${field} field`;
		}
	}

};
