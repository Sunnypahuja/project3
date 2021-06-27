<?php

	function CancelClass($secretAcessKey,$access_key,$webServiceUrl,$class_id)
	{
		require_once("AuthBase.php");
		$authBase = new AuthBase($secretAcessKey,$access_key);
		$method = "cancel";
		$requestParameters["signature"]=$authBase->GenerateSignature($method,$requestParameters);
		$requestParameters["class_id"] = $class_id;
		$resultArray['status']=false;
		$httpRequest=new HttpRequest();
		try
		{
			$XMLReturn=$httpRequest->wiziq_do_post_request($webServiceUrl.'?method=cancel',http_build_query($requestParameters, '', '&')); 
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
				$method=$methodTag->item(0)->nodeValue;
				$cancelTag=$objDOM->getElementsByTagName("cancel")->item(0);
				$cancel = $cancelTag->getAttribute("status");
				$resultArray['status']=true;
			}
			else if($attribNode=="fail")
			{
				$error=$objDOM->getElementsByTagName("error")->item(0);
				$errorcode = $error->getAttribute("code");	
				$errormsg = $error->getAttribute("msg");	
				$resultArray['errormsg'] = $errormsg;
				$resultArray['errorcode']= $errorcode;
			}
	 	}//end if	
		 return $resultArray;
   }//end function
?>