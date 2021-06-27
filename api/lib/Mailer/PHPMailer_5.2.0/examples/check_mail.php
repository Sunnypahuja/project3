<?php
session_start();
$otp=$_POST["otp"];
$otp1=$_SESSION["otp"];
if($otp==$otp1)
	echo "Your email have been verified";
else
	echo "Wrong OTP";

?>