// Owl Carousal
$("#owl-slider").owlCarousel({
	items: 1,
	nav: true,
	dots: false,
	loop: true,
	// autoplay: true,
	autoplayTimeout: 6000,
	responsive: {
		0: {
			items: 1,
			nav: true
		}
	}
});

// Owl Carousal
$("#owl-slider2").owlCarousel({
	items: 1,
	dots: false,
	loop: true,
	autoplay: true,
	responsiveClass: true,
	autoplayTimeout: 6000,
	responsive: {
		0: {
			items: 1,
			nav: false
		}
	}
});

$("#owl-slider3").owlCarousel({
	items: 6,
	dots: false,
	loop: true,
	// margin: 10,
	autoplay: true,
	responsiveClass: true,
	autoplayTimeout: 6000,
	responsive: {
		0: {
			items: 1,
			nav: true
		},
		480: {
			items: 2,
			nav: true
		},
		768: {
			items: 4,
			nav: true
		},
		1080: {
			items: 6,
			nav: true
		}
	}
});

$("#owl-slider4").owlCarousel({
	items: 6,
	dots: false,
	loop: true,
	// margin: 10,
	autoplay: true,
	responsiveClass: true,
	autoplayTimeout: 6000,
	responsive: {
		0: {
			items: 1,
			nav: true
		},
		480: {
			items: 2,
			nav: true
		},
		768: {
			items: 4,
			nav: true
		},
		1080: {
			items: 6,
			nav: true
		}
	}
});

function handleTickInit(tick) {

	// uncomment to set labels to different language

	var locale = {
		YEAR_PLURAL: 'Jaren',
		YEAR_SINGULAR: 'Jaar',
		MONTH_PLURAL: 'Maanden',
		MONTH_SINGULAR: 'Maand',
		WEEK_PLURAL: 'Weken',
		WEEK_SINGULAR: 'Week',
		DAY_PLURAL: 'DÍAS',
		DAY_SINGULAR: 'DÍA',
		HOUR_PLURAL: 'HORAS',
		HOUR_SINGULAR: 'HORA',
		MINUTE_PLURAL: 'MINUTOS',
		MINUTE_SINGULAR: 'MINUTO',
		SECOND_PLURAL: 'SEGUNDOS',
		SECOND_SINGULAR: 'SEGUNDO',
		MILLISECOND_PLURAL: 'Milliseconden',
		MILLISECOND_SINGULAR: 'Milliseconde'
	};

	for (var key in locale) {
		if (!locale.hasOwnProperty(key)) { continue; }
		tick.setConstant(key, locale[key]);
	}


	// format of due date is ISO8601
	// https://en.wikipedia.org/wiki/ISO_8601

	// '2018-01-31T12:00:00'        to count down to the 31st of January 2018 at 12 o'clock
	// '2019'                       to count down to 2019
	// '2018-01-15T10:00:00+01:00'  to count down to the 15th of January 2018 at 10 o'clock in timezone GMT+1

	// create the countdown counter
	var counter = Tick.count.down('2022-05-28T09:00:00');

	counter.onupdate = function (value) {
		tick.value = value;
	};

	counter.onended = function () {
		// redirect, uncomment the next line
		// window.location = 'my-location.html'

		// hide counter, uncomment the next line
		tick.root.style.display = 'none';

		// show message, uncomment the next line
		// document.querySelector('.tick-onended-message').style.display = '';
	};
}

let email = true;
var emailEnviar = true;

var nombre = document.getElementById('nombre');
var telefono = document.getElementById('tel');
var correo = document.getElementById('email');
// var checkTerminos = document.getElementById('exampleCheck1');

function post() {
	showLoader()
	var validated = true;
	var mensaje='';
	if(nombre.value === null || nombre.value === ''){
		console.log('entra')
		validated = false;
		mensaje += 'El campo de nombre esta vacío</br>'; 
	}
	if(telefono.value === null || telefono.value === ''){
		validated = false;
		mensaje += 'El campo de teléfono esta vacío</br>';
	}
	if(correo.value === null || correo.value === ''){
		validated = false;
		mensaje += 'El campo de correo esta vacío</br>';
	}

	mensaje += '</ul>';
	console.log(mensaje)
	if(validated == false){
		hideLoader()
		Swal.fire({
			title: "Error",
			html: mensaje,
			icon: "error",
		});
		return false;
	}
	
	else {
		edad = parseInt(document.getElementById('selectEdad').value);

		axios({
			method: 'POST',
			url: 'https://api.viajoporqueviajo.com/api/registrations',
			data: {
				name: document.getElementById('nombre').value,
				age: edad,
				gender: document.getElementById('selectGenero').value,
				travelingType: document.getElementById('selectt').value,
				phone: document.getElementById('tel').value,
				email: document.getElementById('email').value,
				termConditions: 1

			}
		}).then(res => {
			hideLoader()
			Swal.fire({
				title: "Registrado",
				text: "Su registro está completo",
				icon: "success",
			})
			$('#registro').modal('hide');
			document.getElementById('nombre').value = '';
			document.getElementById('email').value = '';
			document.getElementById('tel').value = '';
			document.getElementById('exampleCheck1').checked = false;
			document.getElementById('inputR').setAttribute('disabled', true)
		})
		.catch(err => {
			hideLoader()
			Swal.fire({
				title: "Error",
				text: err.response.data.message,
				icon: "error",
			});
		});
	}
}





function postInvitacion() {
	showLoader()
	var params = new URLSearchParams(window.location.search);
	console.log(params.get('user'))
	folio = params.get('invitedBy');
	// return false;
	if (document.getElementById('nombre').value == '' || document.getElementById('emailEnviar').value == '') {
		swal({
			title: "Error",
			text: "Llene todos los campos",
			icon: "error",
		});
	} else if (emailEnviar == false) {
		swal({
			title: "Error",
			text: "Correo inválido",
			icon: "error",
		});
	} else {
		axios({
			method: 'POST',
			url: 'https://api.viajoporqueviajo.com/api/invitations',
			data: {
				name: document.getElementById('nombre').value,
				email: document.getElementById('emailEnviar').value,
				invitedBy: folio
			}
		}).then(res => {
			hideLoader()
			// console.log(res.data);
			swal({
				title: "Invitación enviada a : " + document.getElementById('emailEnviar').value,
				text: "Gracias por compartir el outlet de viajes más grande de Mérida",
				icon: "success",
			});
			document.getElementById("invitar").reset();
		})
			.catch(err => {
				hideLoader()
				console.log(err);
				swal({
					title: "Error",
					text: err.response.data.message,
					icon: "error",
				});
				// document.getElementById("invitar").reset(); 
			})
	}
}

function check(e) {
	tecla = (document.all) ? e.keyCode : e.which;

	//Tecla de retroceso para borrar, siempre la permite
	if (tecla == 8) {
		return true;
	}

	// Patron de entrada, en este caso solo acepta numeros y letras
	patron = /[A-Za-z]/;
	tecla_final = String.fromCharCode(tecla);
	return patron.test(tecla_final);
}

function soloNumeros(e) {
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46))
		return true;
	return /\d/.test(String.fromCharCode(keynum));
}

function validarEmail(valor) {
	var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	var valido = expReg.test(valor)
	if (valido == true) {
		email = true
	} else {
		email = false
	}
}

function validarEmailInvitar(valor) {
	var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	var valido = expReg.test(valor)
	if (valido == true) {
		emailEnviar = true
	} else {
		emailEnviar = false
	}
}

function aceptTerms() {
	if (document.getElementById('exampleCheck1').checked == true) {
		document.getElementById('inputR').removeAttribute('disabled')
	} else {
		document.getElementById('inputR').setAttribute('disabled', true)
	}
}

/* const myPreloader = document.querySelector('.preloader');
const fadeOutEffect = setInterval(() => {
  if (!preloader.style.opacity) {
	preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
	preloader.style.opacity -= 0.1;
  } else {
	clearInterval(fadeEffect);
  }
}, 300);

window.addEventListener('load', fadeOutEffect); */
function showLoader() {
	document.getElementById('preloader').removeAttribute('hidden')
}
function hideLoader() {
	document.getElementById('preloader').setAttribute('hidden', true)
}


function abrirTerminos(){
	$('#aviso').modal('show');
}