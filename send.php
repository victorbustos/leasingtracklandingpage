<?php

$sendto   = "v@victorbustos.com";
$name  		= $_POST['name'];
$usermail = $_POST['email'];
$content  = nl2br($_POST['message']);

$subject  = "Leasing Track Landing Page";
$headers  = "From: test@pure-falls-25921.herokuapp.com \r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

$msg  = "<html><body style='font-family:Arial,sans-serif; font-size:1.2em;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Message from Leasing Track Landing Page</h2>\r\n";
$msg .= "<p><strong>Sent by:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Email:</strong> ".$usermail."</p>\r\n";
$msg .= "<p><strong>Message:</strong><br><br> ".$content."</p>\r\n";
$msg .= "<br><br></body></html>";


if(@mail($sendto, $subject, $msg, $headers)) {
	echo "Success! Your Message has been sent. Thank you, we'll get back to you shortly.";
} else {
	echo "false";
}

?>
