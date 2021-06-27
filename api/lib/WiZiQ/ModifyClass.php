<?php

	function ModifyClass($secretAcessKey,$access_key,$webServiceUrl,$class_id, $class_title, $presenter_id, $presenter_name, $date, $time)
	{
		require_once("AuthBase.php");
		$authBase = new AuthBase($secretAcessKey,$access_key);
		$method = "modify";
		$resultArray['status']=true;
		$requestParameters["signature"]=$authBase->GenerateSignature($method,$requestParameters);
		$requestParameters["class_id"] = $class_id;
		$requestParameters["presenter_id"] = $presenter_id;
		$requestParameters["presenter_name"] = $presenter_name;  
		$requestParameters["start_time"] = "$date $time"; 
		$requestParameters["title"]=$class_title;
		$requestParameters["duration"]=""; //optional
		$requestParameters["time_zone"]=""; //optional
		$requestParameters["attendee_limit"]=""; //optional
		$requestParameters["control_category_id"]=""; //optional
		$requestParameters["create_recording"]=""; //optional
		$requestParameters["return_url"]=""; //optional
		$requestParameters["status_ping_url"]=""; //optional
        $requestParameters["language_culture_name"]="en-us";
		$httpRequest=new HttpRequest();
		try
		{
			$XMLReturn=$httpRequest->wiziq_do_post_request($webServiceUrl.'?method=modify',http_build_query($requestParameters, '', '&')); 
		}
		catch(Exception $e)
		{	
	  		echo $e->getMessage();
		}
 		if(!empty($XMLReturn))
 		{
 			try
			{
			  $objDOM = new DOMDocument();
			  $objDOM->loadXML($XMLReturn);
	  
			}
			catch(Exception $e)
			{
			  echo $e->getMessage();
			}
			$status=$objDOM->getElementsByTagName("rsp")->item(0);
    		$attribNode = $status->getAttribute("status");
			if($attribNode=="ok")
			{
				$methodTag=$objDOM->getElementsByTagName("method");
				// echo "method=".$method=$methodTag->item(0)->nodeValue;
				$modifyTag=$objDOM->getElementsByTagName("modify")->item(0);
				// echo "<br>modify=".$modify = $modifyTag->getAttribute("status");
				$resultArray['status']=true;
			}
			else if($attribNode=="fail")
			{
				$error=$objDOM->getElementsByTagName("error")->item(0);
				$errorcode = $error->getAttribute("code");	
				$errormsg = $error->getAttribute("msg");	
				$resultArray['error_msg']=$errormsg;
				$resultArray['error_code']=$errorcode;
			}
	 	}//end if
		 return $resultArray;	
   }//end function
?>