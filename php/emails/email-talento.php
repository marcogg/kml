
<?php

/*
Información de servicios: rodrigo@kmlmedia.mx y formularios@kmlmedia.mx
Soy empresa: rodrigo@kmlmedia.mx
Buscamos talento: rodrigo@kmlmedia.mx
Soporte al cliente: soporte@kmlmedia.mx y formularios@kmlmedia.mx
Newsletter footer y alerta: formularios@kmlmedia.mx y base de datos
*/

define( 'EMAIL_FROM', 'contacto@kmlmedia.mx' );
// Buscamos talento: rodrigo@kmlmedia.mx
$email_array_to = array( 'rodrigo@kmlmedia.mx' );


if( $_POST[ 'email' ] == TRUE ) {

    $dir_subida = getcwd() . '/curriculums/';
    $fichero_subido = $dir_subida . $_FILES['curriculum']['name'];
    //echo "Archivo: " . $dir_subida . chr(10);
    //echo "Tmp: " . $_FILES[ 'curriculum' ][ 'tmp_name' ] . ' = ' . $_FILES['curriculum']['name'];
    //print_r($_FILES);

    $email_subject  = "Informacion de Servicios";
    $email_message  = "<strong style='text-transform: uppercase;'>NUEVO CONTACTO<br>Quiero unirme al equipo</strong><br><br>";
    $email_message .= "<strong>Nombre</strong>: " . 	            $_POST[ 'nombre' ] . "<br>";
    $email_message .= "<strong>Apellidos</strong>: " . 		        $_POST[ 'apellidos' ] . "<br>";
    $email_message .= "<strong>Email</strong>: " . 		            $_POST[ 'email' ] . "<br>";
    $email_message .= "<strong>Teléfono</strong>: " . 	            $_POST[ 'telefono' ] . "<br>";
    $email_message .= "<strong>Puesto Deseado</strong>: " . 	    $_POST[ 'puestoDeseado' ] . "<br>";
    $email_message .= "<strong>Comentarios</strong>: " . 	        $_POST[ 'comentarios' ] . "<br>";

    if( move_uploaded_file( $_FILES[ 'curriculum' ][ 'tmp_name' ], $fichero_subido ) ) {
        echo "El fichero es válido y se subió con éxito.\n";
    }
    else {
        echo "¡Posible ataque de subida de ficheros!\n";
    }


    // Enviar el correo
    require("../php-mailer/PHPMailerAutoload.php");

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->From     = EMAIL_FROM;
    $mail->FromName = "KML - Quiero unirme al equipo";

    foreach( $email_array_to as $key => $value ) {
        $mail->AddAddress( $value );
    }

    $mail->Subject  =  $email_subject;
    $mail->Body     =  $email_message;
    $mail->AddAttachment( $fichero_subido );
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
        $nombreGrupo = "KML Bolsa de trabajo";

        $ymlp = new newsletter($ApiKey, $ApiUsername);

        $ymlp->AgregarALista(trim( $_POST[ 'email' ] ), $ymlp->ListaGrupos($nombreGrupo));

        echo "1";
    }


}
?>
