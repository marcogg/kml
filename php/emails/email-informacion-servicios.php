
<?php

/*
Información de servicios: rodrigo@kmlmedia.mx y formularios@kmlmedia.mx
Soy empresa: rodrigo@kmlmedia.mx
Buscamos talento: rodrigo@kmlmedia.mx
Soporte al cliente: soporte@kmlmedia.mx y formularios@kmlmedia.mx
Newsletter footer y alerta: formularios@kmlmedia.mx y base de datos
*/

//define( 'EMAIL_TO', '' );
define( 'EMAIL_FROM',   'contacto@kmlmedia.mx' );
// Información de servicios: rodrigo@kmlmedia.mx y formularios@kmlmedia.mx
$email_array_to = array( 'rodrigo@kmlmedia.mx' );
//$email_array_to = array( 'jesus@kmlmedia.mx' );

if( $_POST[ 'email' ] == TRUE ) {
    //$email_subject  = "Informacion de Servicios";
    $email_subject = $_POST[ 'titulo' ];
    $email_message  = "<strong style='text-transform: uppercase;'>" . $email_subject . "</strong><br><br>";
    $email_message .= "<strong>Nombre</strong>: " . 	            $_POST[ 'nombre' ] . "<br>";
    $email_message .= "<strong>Apellidos</strong>: " . 		        $_POST[ 'apellidos' ] . "<br>";
    $email_message .= "<strong>Email</strong>: " . 		            $_POST[ 'email' ] . "<br>";
    $email_message .= "<strong>Teléfono</strong>: " . 	            $_POST[ 'telefono' ] . "<br>";
    /*
    $email_message .= "<strong>Puesto</strong>: " . 	            $_POST[ 'puesto' ] . "<br>";
    $email_message .= "<strong>Servicio de Interes</strong>: " . 	$_POST[ 'servicioInteres' ] . "<br>";
    $email_message .= "<strong>Como no encontraste</strong>: " . 	$_POST[ 'comoNosEncontraste' ] . "<br>";
    */
    $email_message .= "<strong>Comentarios</strong>: " . 	        $_POST[ 'comentarios' ] . "<br>";

    // Enviar el correo
    require("../php-mailer/PHPMailerAutoload.php");

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->From     = EMAIL_FROM;
    $mail->FromName = "KML - " . $email_subject;

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
        $nombreGrupo = "KML Servicios";

        $ymlp = new newsletter($ApiKey, $ApiUsername);

        $ymlp->AgregarALista(trim( $_POST[ 'email' ] ), $ymlp->ListaGrupos($nombreGrupo));

        echo "1";
    }

}
?>
