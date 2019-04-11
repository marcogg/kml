jQuery(document).ready(function($){
	var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

	//open team-member bio
	$('#cd-team').find('ul a').on('click', function(event){
		event.preventDefault();
		var selected_member = $(this).data('type');
		$('.cd-member-bio.'+selected_member+'').addClass('slide-in');
		$('.cd-member-bio-close').addClass('is-visible');

		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( is_firefox ) {
			$('main').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
		} else {
			$('main').addClass('slide-out');
			$('body').addClass('overflow-hidden');
		}

	});

	//close team-member bio
	$(document).on('click', '.cd-overlay, .cd-member-bio-close', function(event){
		event.preventDefault();
		$('.cd-member-bio').removeClass('slide-in');
		$('.cd-member-bio-close').removeClass('is-visible');

		if( is_firefox ) {
			$('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('main').removeClass('slide-out');
			$('body').removeClass('overflow-hidden');
		}
	});

});


// ================================================================================================================
//
// Formularios
//
// ================================================================================================================

function validateFormInformacionServicios() {
    // Servicios
	var nombre = $(".form-informacion-servicios #nombre");
	var apellidos = $(".form-informacion-servicios #apellidos");
	var email = $(".form-informacion-servicios #email");
	var telefono = $(".form-informacion-servicios #telefono");
	var puesto = $(".form-informacion-servicios #puesto");
	var servicioInteres = $(".form-informacion-servicios #servicioInteres");
	var comoNosEncontraste = $(".form-informacion-servicios #comoNosEncontraste");
	var comentarios = $(".form-informacion-servicios #comentarios");
	var errors = "";
	var noteMessage = $( ".note-servicios" );

	//alert( nombre );

	if( $.trim( nombre.val() ) == "" ) {
		errors += "Nombre es necesario<br>";
	}

	if( $.trim( apellidos.val() ) == "" ) {
		errors += "Apellidos es necesario<br>";
	}

    if( !validateEmail( $.trim( email.val() ) ) ) {
        errors += "Email no es una dirección válida<br>";
    }

    if( $.trim( telefono.val() ).length < 7 || $.trim( telefono.val() ).length > 15 ) {
        errors += "Telefono debe ser de 7 a 15 digitos numericos<br>";
    }

    /*
    if( !isPositiveInteger( $.trim( telefono.val() ) ) ) {
        errors += "Telefono no es un número válido<br>";
    }

	if( $.trim( servicioInteres.val() ) == "" ) {
		errors += "Servicio de Interés es necesario<br>";
	}

	if( $.trim( comoNosEncontraste.val() ) == "" ) {
		errors += "Como nos encontraste es necesario<br>";
	}
    */
	if( $.trim( comentarios.val() ) == "" ) {
		errors += "Comentarios es necesario<br>";
	}

	if( errors != "" ) {
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-success" );
        noteMessage.addClass( "alert-danger" );
        noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! Aviso !!</h4>" );
        noteMessage.append( errors );
        return false;
	}

    noteMessage.hide();
    noteMessage.show(300);
    noteMessage.html( errors );
    noteMessage.removeClass( "alert-danger" );
    noteMessage.addClass( "alert-success" );
    noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Estamos procesando tus datos, espera por favor." );

    $.ajax({
        data: $(".form-informacion-servicios").serialize(),
        type: "POST",
        url: "php/emails/email-informacion-servicios.php",
    }).done(function( data, textStatus, jqXHR ) {
            $(".form-informacion-servicios").trigger( "reset" );
            noteMessage.hide();
            noteMessage.show(300);
            noteMessage.html( errors );
            noteMessage.removeClass( "alert-danger" );
            noteMessage.addClass( "alert-success" );
            noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! GRACIAS !!</h4>Tus datos se han enviado correctamente.<br>En breve serás contactado." );
            console.log( "La solicitud se ha completado correctamente." );
	}).fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
                console.log( "La solicitud a fallado: " +  textStatus);
            }
        });


	return false;

}


function validateFormEmpresa() {
    // Servicios
    var nombre 			 = $(".form-empresa #nombre");
    var empresa 		 = $(".form-empresa #empresa");
    var email 			 = $(".form-empresa #email");
    var telefono 		 = $(".form-empresa #telefono");
    var servicioOfrecido = $(".form-empresa #servicioOfrecido");
    var comentarios 	 = $(".form-empresa #comentarios");
    var errors = "";
    var form			 = $(".form-empresa");
    var noteMessage 	 = $( ".note-empresa" );

    //alert( nombre );

    if( $.trim( nombre.val() ) == "" ) {
        errors += "Nombre es necesario<br>";
    }

    if( $.trim( empresa.val() ) == "" ) {
        errors += "Empresa es necesario<br>";
    }

    if( !validateEmail( $.trim( email.val() ) ) ) {
        errors += "Email no es una dirección válida<br>";
    }

    if( $.trim( telefono.val() ).length < 7 || $.trim( telefono.val() ).length > 15 ) {
        errors += "Telefono debe ser de 7 a 15 digitos numericos<br>";
    }

    if( !isPositiveInteger( $.trim( telefono.val() ) ) ) {
        errors += "Telefono no es un número válido<br>";
    }

    if( $.trim( servicioOfrecido.val() ) == "" ) {
        errors += "Servicio ofrecido es necesario<br>";
    }

    if( $.trim( comentarios.val() ) == "" ) {
        errors += "Comentarios es necesario<br>";
    }

    if( errors != "" ) {
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-success" );
        noteMessage.addClass( "alert-danger" );
        noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! Aviso !!</h4>" );
        noteMessage.append( errors );
        return false;
    }

    noteMessage.hide();
    noteMessage.show(300);
    noteMessage.html( errors );
    noteMessage.removeClass( "alert-danger" );
    noteMessage.addClass( "alert-success" );
    noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Estamos procesando tus datos, espera por favor." );

    $.ajax({
        data: form.serialize(),
        type: "POST",
        url: "php/emails/email-empresa.php",
    }).done(function( data, textStatus, jqXHR ) {
            form.trigger( "reset" );
            noteMessage.hide();
            noteMessage.show(300);
            noteMessage.html( errors );
            noteMessage.removeClass( "alert-danger" );
            noteMessage.addClass( "alert-success" );
            noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! GRACIAS !!</h4>Tus datos se han enviado correctamente.<br>En breve serás contactado." );
            console.log( "La solicitud se ha completado correctamente." );
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });


    return false;

}


function validateFormTalento() {
    // Servicios
    var nombre 			 = $(".form-talento #nombre");
    var apellidos 		 = $(".form-talento #apellidos");
    var email 			 = $(".form-talento #email");
    var telefono 		 = $(".form-talento #telefono");
    var puestoDeseado	 = $(".form-talento #puestoDeseado");
    var curriculum	     = $(".form-talento #curriculum");
    var comentarios 	 = $(".form-talento #comentarios");
    var errors = "";
    var form			 = $(".form-talento");
    var noteMessage 	 = $( ".note-talento" );

    //alert( nombre );

    if( $.trim( nombre.val() ) == "" ) {
        errors += "Nombre es necesario<br>";
    }

    if( $.trim( apellidos.val() ) == "" ) {
        errors += "Apellidos es necesario<br>";
    }

    if( !validateEmail( $.trim( email.val() ) ) ) {
        errors += "Email no es una dirección válida<br>";
    }

    if( $.trim( telefono.val() ).length < 7 || $.trim( telefono.val() ).length > 15 ) {
        errors += "Telefono debe ser de 7 a 15 digitos numericos<br>";
    }

    if( !isPositiveInteger( $.trim( telefono.val() ) ) ) {
        errors += "Telefono no es un número válido<br>";
    }

    if( $.trim( puestoDeseado.val() ) == "" ) {
        errors += "Puesto deseado es necesario<br>";
    }

    if( $.trim( curriculum.val() ) == "" ) {
        errors += "Curriculum Vitae es necesario<br>";
    }

    if( $.trim( comentarios.val() ) == "" ) {
        errors += "Comentarios es necesario<br>";
    }

    if( errors != "" ) {
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-success" );
        noteMessage.addClass( "alert-danger" );
        noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! Aviso !!</h4>" );
        noteMessage.append( errors );
        return false;
    }

    noteMessage.hide();
    noteMessage.show(300);
    noteMessage.html( errors );
    noteMessage.removeClass( "alert-danger" );
    noteMessage.addClass( "alert-success" );
    noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Estamos procesando tus datos, espera por favor." );

    // Form data para el attachment
    var formData = new FormData();
    formData.append( "nombre",        nombre.val() );
    formData.append( "apellidos",     apellidos.val() );
    formData.append( "email",         email.val() );
    formData.append( "telefono",      telefono.val() );
    formData.append( "puestoDeseado", puestoDeseado.val() );
    formData.append( "curriculum",    curriculum.get(0).files[0], curriculum.val() );
    formData.append( "comentarios",   comentarios.val() );

    $.ajax({
        data: formData,
        type: "POST",
        url: "php/emails/email-talento.php",
        processData: false,
        contentType: false
    }).done(function( data, textStatus, jqXHR ) {
            form.trigger( "reset" );
            noteMessage.hide();
            noteMessage.show(300);
            noteMessage.html( errors );
            noteMessage.removeClass( "alert-danger" );
            noteMessage.addClass( "alert-success" );
            noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! GRACIAS !!</h4>Tus datos se han enviado correctamente.<br>En breve serás contactado." );
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });


    return false;

}


function validateFormSoporteCliente() {
    // Servicios
    var nombre 			 = $(".form-soporte-cliente #nombre");
    var empresa 		 = $(".form-soporte-cliente #empresa");
    var email 			 = $(".form-soporte-cliente #email");
    var telefono 		 = $(".form-soporte-cliente #telefono");
    var descripcion		 = $(".form-soporte-cliente #descripcion");
    var errors = "";
    var form			 = $(".form-soporte-cliente");
    var noteMessage 	 = $( ".note-soporte-cliente" );

    //alert( nombre );

    if( $.trim( nombre.val() ) == "" ) {
        errors += "Nombre es necesario<br>";
    }

    if( $.trim( empresa.val() ) == "" ) {
        errors += "Empresa es necesario<br>";
    }

    if( !validateEmail( $.trim( email.val() ) ) ) {
        errors += "Email no es una dirección válida<br>";
    }

    if( $.trim( telefono.val() ).length < 7 || $.trim( telefono.val() ).length > 15 ) {
        errors += "Telefono debe ser de 7 a 15 digitos numericos<br>";
    }

    if( !isPositiveInteger( $.trim( telefono.val() ) ) ) {
        errors += "Telefono no es un número válido<br>";
    }

    if( $.trim( descripcion.val() ) == "" ) {
        errors += "Descripción del problema es necesario<br>";
    }

    if( errors != "" ) {
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-success" );
        noteMessage.addClass( "alert-danger" );
        noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! Aviso !!</h4>" );
        noteMessage.append( errors );
        return false;
    }

    noteMessage.hide();
    noteMessage.show(300);
    noteMessage.html( errors );
    noteMessage.removeClass( "alert-danger" );
    noteMessage.addClass( "alert-success" );
    noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Estamos procesando tus datos, espera por favor." );

    $.ajax({
        data: form.serialize(),
        type: "POST",
        url: "php/emails/email-soporte-cliente.php",
    }).done(function( data, textStatus, jqXHR ) {
        form.trigger( "reset" );
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.html( errors );
        noteMessage.removeClass( "alert-danger" );
        noteMessage.addClass( "alert-success" );
        noteMessage.html( "<h4 style='margin-bottom: 0px;'>!! GRACIAS !!</h4>Tus datos se han enviado correctamente.<br>En breve serás contactado." );
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });


    return false;

}


function validateNewsletter() {
    // Servicios
    var email 			 = $(".form-newsletter #email");
    var form			 = $(".form-newsletter");
    var noteMessage 	 = $( ".note-newsletter" );
    var errors           = "";

    //alert( email.val() );

    if( !validateEmail( $.trim( email.val() ) ) ) {
        errors += "Email no es una dirección válida<br>";
    }

    if( errors != "" ) {
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-success" );
        noteMessage.addClass( "alert-danger" );
        noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>" );
        noteMessage.append( errors );
        return false;
    }

    noteMessage.hide();
    noteMessage.show(300);
    noteMessage.removeClass( "alert-danger" );
    noteMessage.addClass( "alert-success" );
    noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Estamos procesando tus datos, espera por favor." );

    $.ajax({
        data: form.serialize(),
        type: "POST",
        url: "php/emails/email-newsletter.php",
    }).done(function( data, textStatus, jqXHR ) {
        form.trigger( "reset" );
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-danger" );
        noteMessage.addClass( "alert-success" );
        noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Tus datos se han enviado correctamente.<br>En breve serás contactado." );
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });


    return false;

}


function validateNewsletterRight() {
    // Servicios
    var email 			 = $(".form-newsletter-right #email");
    var form			 = $(".form-newsletter-right");
    var noteMessage 	 = $( ".note-newsletter-right" );
    var errors           = "";

    //alert( email.val() );

    if( !validateEmail( $.trim( email.val() ) ) ) {
        errors += "Email no es una dirección válida<br>";
    }

    if( errors != "" ) {
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-success" );
        noteMessage.addClass( "alert-danger" );
        noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>" );
        noteMessage.append( errors );
        return false;
    }

    noteMessage.hide();
    noteMessage.show(300);
    noteMessage.removeClass( "alert-danger" );
    noteMessage.addClass( "alert-success" );
    noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Estamos procesando tus datos, espera por favor." );

    $.ajax({
        data: form.serialize(),
        type: "POST",
        url: "php/emails/email-newsletter.php",
    }).done(function( data, textStatus, jqXHR ) {
        form.trigger( "reset" );
        noteMessage.hide();
        noteMessage.show(300);
        noteMessage.removeClass( "alert-danger" );
        noteMessage.addClass( "alert-success" );
        noteMessage.html( "<div style='font-weight: bold; font-size: 15px;'>!! Aviso !!</div>Tus datos se han enviado correctamente.<br>En breve serás contactado." );
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        if ( console && console.log ) {
            console.log( "La solicitud a fallado: " +  textStatus);
        }
    });


    return false;

}


function validateEmail($email) {
    if( $.trim( $email ) == "" ) {
        return false;
    }

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function isPositiveInteger(n) {
    return n == "0" || ((n | 0) > 0 && n % 1 == 0);
}





















