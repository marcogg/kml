
<?php

/*
Información de servicios: rodrigo@kmlmedia.mx y formularios@kmlmedia.mx
Soy empresa: rodrigo@kmlmedia.mx
Buscamos talento: rodrigo@kmlmedia.mx
Soporte al cliente: soporte@kmlmedia.mx y formularios@kmlmedia.mx
Newsletter footer y alerta: formularios@kmlmedia.mx y base de datos
*/

define( 'EMAIL_FROM',   'contacto@kmlmedia.mx' );
// Soy empresa: rodrigo@kmlmedia.mx
$email_array_to = array( 'rodrigo@kmlmedia.mx' );

if( $_POST[ 'email' ] == TRUE ) {
    $email_subject  = "Informacion de Servicios";
    $email_message  = "<strong style='text-transform: uppercase;'>NUEVO CONTACTO<br>OFRECER MIS SERVICIOS COMO EMPRESA</strong><br><br>";
    $email_message .= "<strong>Nombre</strong>: " . 	            $_POST[ 'nombre' ] . "<br>";
    $email_message .= "<strong>Empresa</strong>: " . 		        $_POST[ 'empresa' ] . "<br>";
    $email_message .= "<strong>Email</strong>: " . 		            $_POST[ 'email' ] . "<br>";
    $email_message .= "<strong>Teléfono</strong>: " . 	            $_POST[ 'telefono' ] . "<br>";
    $email_message .= "<strong>Servicio ofrecido</strong>: " . 	    $_POST[ 'servicioOfrecido' ] . "<br>";
    $email_message .= "<strong>Comentarios</strong>: " . 	        $_POST[ 'comentarios' ] . "<br>";

    // Enviar el correo
    require("../php-mailer/PHPMailerAutoload.php");

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->From     = EMAIL_FROM;
    $mail->FromName = "KML - Ofrecer Mis Servicios como Empresa";

    foreach( $email_array_to as $key => $value ) {
        $mail->AddAddress( $value );
    }

    $mail->Subject  =  $email_subject;
    $mail->Body     =  $email_message;
    $mail->IsHTML(true);

    //send the message, check for errors
    if( !$mail->send() ) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
    else {
        require_once("../classes/classYMLP.php");

        // variables: la clave del api y el usuario
        $ApiKey = "CMBR523QZ9JY0HBGQBWH";
        $ApiUsername = "sk08";
        $nombreGrupo = "KML Socios y Proveedores";

        $ymlp = new newsletter($ApiKey, $ApiUsername);

        $ymlp->AgregarALista(trim( $_POST[ 'email' ] ), $ymlp->ListaGrupos($nombreGrupo));

        echo "1";
    }

}
?>
