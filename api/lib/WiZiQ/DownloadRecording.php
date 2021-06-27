<?php

header('Content-type: text/xml');

class DownloadRecording
{

	function DownloadRecording($secretAcessKey,$access_key,$webServiceUrl)
	{

		require_once("AuthBase.php");
		$authBase = new AuthBase($secretAcessKey,$access_key);
		$method = "download_recording";
		$requestParameters["signature"]=$authBase->GenerateSignature($method,$requestParameters);
		$requestParameters["class_id"] = "15754";
		
		//recording_format value can be zip, exe or mp4
		//mp4 recording is available only for classes conducted on WizIQ desktop app
		$requestParameters["recording_format"] = "zip";
		

		$httpRequest=new HttpRequest();
		try
		{
			$XMLReturn=$httpRequest->wiziq_do_post_request($webServiceUrl.'?method=download_recording',http_build_query($requestParameters, '', '&'));
                        echo $XMLReturn;
		}
		catch(Exception $e)
		{
                        header('Content-type: text/html');
	  		echo $e->getMessage();
		}

         }//end function

}
?>