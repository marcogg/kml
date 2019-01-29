<?php 
//funcion para enviar correo
function form_mail($sPara, $sAsunto, $sTexto, $sDe){
	$bHayFicheros = 0;
	$sCabeceraTexto = "";
	$sAdjuntos = "";

	if ($sDe) {
		$sCabeceras = "From:".$sDe."\n";
	}else{
		$sCabeceras = "";
	}
	$sCabeceras .= "MIME-version: 1.0\n";
	
	foreach ($_FILES as $vAdjunto)
	{
		if ($bHayFicheros == 0)
		{
			$bHayFicheros = 1;
			$sCabeceras .= "Content-type: multipart/mixed;";
			$sCabeceras .= "boundary=\"--_Separador-de-mensajes_--\"\n";

			$sCabeceraTexto = "----_Separador-de-mensajes_--\n";
			$sCabeceraTexto .= "Content-type: text/plain;charset=UTF-8\n";
			$sCabeceraTexto .= "Content-transfer-encoding: 7BIT\n";

			$sTexto = $sCabeceraTexto.$sTexto;
		}
		if ($vAdjunto["size"] > 0)
		{
			$sAdjuntos .= "\n\n----_Separador-de-mensajes_--\n";
			$sAdjuntos .= "Content-type: ".$vAdjunto["type"].";name=\"".$vAdjunto["name"]."\"\n";;
			$sAdjuntos .= "Content-Transfer-Encoding: BASE64\n";
			$sAdjuntos .= "Content-disposition: attachment;filename=\"".$vAdjunto["name"]."\"\n\n";

			$oFichero = fopen($vAdjunto["tmp_name"], 'r');
			$sContenido = fread($oFichero, filesize($vAdjunto["tmp_name"]));
			$sAdjuntos .= chunk_split(base64_encode($sContenido));
			fclose($oFichero);
		}
	}

	if ($bHayFicheros){
		$sTexto .= $sAdjuntos."\n\n----_Separador-de-mensajes_----\n";
	}

	//echo "Prueba: ".$_POST['oculto'];
	//if($_POST['oculto']==2) {
		return (mail($sPara, $sAsunto, $sTexto, $sCabeceras));
	//}else{
	//	return FALSE;
	//}
}

//sanitizar variables de entrada
foreach($_POST as $key => $value){
	$_POST[$key] = addslashes(strip_tags($value));
}