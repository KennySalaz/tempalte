<?php
/**
 * This example shows making an SMTP connection with authentication.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require 'PHPMailer/PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
$mail->CharSet = 'UTF-8';
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;

$mail->SMTPSecure = 'tls';

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = "smtp.gmail.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 587;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "osmanali85@gmail.com";
//Password to use for SMTP authentication
$mail->Password = "babil_11";
//Set who the message is to be sent from
$mail->setFrom('osmanali85@gmail.com', 'Wmedya');
//Set an alternative reply-to address
//$mail->addReplyTo('reply@host.com', 'company');
//Set who the message is to be sent to
$mail->addAddress('info@wmedya.com');
//Set the subject line
$mail->Subject = 'Luna Form Details';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body


$html="Form data<br/><br/>";
foreach($_POST as $key=>$data){
    if(is_array($data)){
        $html.="<b>".$key.":</b> ".implode(",",$data)."<br/>";
    } else {
        $html.="<b>".$key.":</b> ".$data."<br/>";
    }
}

$mail->msgHTML($html);


//Replace the plain text body with one created manually
//$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo '{"success":false,"msg":"'.$mail->ErrorInfo.'"}';
} else {
    echo '{"success":true}';
}