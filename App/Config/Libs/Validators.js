import { map, split } from 'lodash'

export const RequiredFieldValidator = (txt) => {
	var isValid = false;
	if (txt !== null && txt !== undefined) {
		if (txt.trim() !== '') {
			isValid = true;
		}
	}
	return isValid;
}

export const RegularExpressionName = (txt) => {
	var isValid = false;
	var reg = /^[A-Za-z ]+$/g;
	//var reg = /^([A-Za-z ]+) {2,20}$/;

	if (txt !== '' && txt !== null) {
		if (txt.trim() !== '') {

			if (txt.length >= 2 && txt.length <= 20) {

				if (!txt.match(reg)) {
					isValid = false;

				} else {
					isValid = true;
				}

			} else {
				isValid = false;

			}

		}
	} else {

		isValid = false;
	}
	return isValid;
};

export const NumberValidator = (txt) => {
	var isValid = false;
	var reg = "^\+?\d*$";
	if (isNaN(txt) !== true && txt !== null) {
		isValid = true;
	}
	return isValid;
};

export const CheckForSpecialChars = (str) => {
	var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
	for (var i = 0; i < str.length; i++) {
		if (iChars.indexOf(str.charAt(i)) != -1) {

			return false;
		}
	}
	return true;
};


export const EmailValidator = (txt) => {
	var isValid = false;
	// var reg = /\S+@\S+\.\S+/;
	const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	if (txt !== '' && txt !== null) {
		if (reg.test(txt) === false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};

export const emojisValidator = (txt) => {
	var isValid = false;
	const reg = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
	if (txt !== '' && txt !== null) {
		if (reg.test(txt) === false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return !isValid;
};

export const UserNameValidator = (txt) => {
	var isValid = false;
	var reg = /^[A-Za-z0-9 ]+$/g;
	if (txt.value !== '' && txt.value.trim() !== '') {
		if (reg.test(txt.value) == false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}
	return isValid;
};

export const PasswordValidator = (txt) => {
	/*TODO need to make changes here*/
	var isValid = false;
	var str = txt.toString().trim();
	// var reg = /^([a-z0-9])|(?=.*[_$@.])+$/i;
	var letter = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;///[a-zA-Z]/;
	//var number = /[0-9]/;
	//var valid = number.test(str) && letter.test(str);
	if (str.length >= 6) {
		// isValid = false;
		var _valid = letter.test(str);
		//var _valid = number.test(str) && letter.test(str);

		// if (reg.test(str) == false) {
		if (_valid == false) {
			isValid = false;
		} else {
			isValid = true;
		}
	} else {
		isValid = false;
	}

	return isValid;
};

export const PasswordLengthValidator = (txt) => {
	var isValid = false;
	//Ti.API.info(JSON.stringify(txt));
	if (txt.value !== null) {
		if (txt.value.length >= 6) {
			if (txt.value.trim() !== '') {
				isValid = true;
			}
		}
	}
	return isValid;
};

export const MobileNumberValidator = (txt) => {
	var isValid = false;
	var reg = /^\+?\d*$/;
	if (isNaN(txt) === false && txt !== null) {
		//if (txt.length === 10) {
		if (txt.trim() !== '') {
			isValid = true;
		}
		//}
	}

	return isValid;
};

export const MobNumberValidator = (txt) => {
	let isValid = false
	const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

	if (regex.test(txt) == true) {
		isValid = true
	}

	return isValid;
}

export const UrlValidator = (txt) => {
	let isValid = false
	const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
	if (regex.test(txt) == true) {
		isValid = true
	}

	return isValid;
}

export const LinkValidator = (txt) => {
	var isValid = false;
	var reg = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	if (txt !== '' && txt !== null) {
		if (txt.trim() !== '') {
			if (!txt.match(reg)) {
				isValid = false;

			} else {
				isValid = true;
			}
		}
		else {
			isValid = true;
		}
	} else {
		isValid = true;
	}
	return isValid;
}

export const spaceValidator = (txt) => {
	const textX = split(txt, '')
	let isValid = true
	map(textX, value => {
		if (value == ' ') {

			isValid = false
		}
	})
	return isValid
}