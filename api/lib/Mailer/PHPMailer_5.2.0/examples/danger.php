<?php
session_start();
function otp()
{
$otp=rand(1000,9999);
$_SESSION["otp"]=$otp;
return $otp;
}


?>