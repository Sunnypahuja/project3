<?php
// class ScheduleClass
// {
	
	
	function ScheduleClass($secretAcessKey,$access_key,$webServiceUrl,$class_id)
	{
		require_once("AuthBase.php");
		$authBase = new AuthBase($secretAcessKey,$access_key);
		$method = "add_copresenter";
		$requestParameters["signature"]=$authBase->GenerateSignature($method,$requestParameters);
		$resultArray=[];
		$resultArray['status']=false;
		#for teacher account pass parameter 'presenter_email'
                //This is the unique email of the presenter that will identify the presenter in WizIQ. Make sure to add
                //this presenter email to your organization�s teacher account. � For more information visit at: (http://developer.wiziq.com/faqs)
		// $requestParameters["presenter_email"]="rashi@gmail.com";
		#for room based account pass parameters 'presenter_id', 'presenter_name'
		 
		$requestParameters["class_id"]=$class_id; //Required
	 
	 
		$httpRequest=new HttpRequest();
		try
		{
			$XMLReturn=$httpRequest->wiziq_do_post_request($webServiceUrl.'?method=add_copresenter',http_build_query($requestParameters, '', '&')); 
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
			$class_idTag=$objDOM->getElementsByTagName("class_id");
			$class_id=$class_idTag->item(0)->nodeValue;
			$recording_urlTag=$objDOM->getElementsByTagName("recording_url");
			$recording_url=$recording_urlTag->item(0)->nodeValue;
			// $presenter_emailTag=$objDOM->getElementsByTagName("presenter_email");
			// $presenter_email=$presenter_emailTag->item(0)->nodeValue;
			// $class_status = $objDOM->getElementsByTagName("class_status");
			// echo $class_status = $class_status->item(0)->nodeValue;
			$presenter_urlTag=$objDOM->getElementsByTagName("presenter_url");
			$presenter_url=$presenter_urlTag->item(0)->nodeValue;
			$resultArray['status']=true;
			$resultArray['classid'] = $class_id;
			$resultArray['presenter_url'] = $presenter_url;
			$resultArray['recording_url'] = $recording_url;

		}
		else if($attribNode=="fail")
		{
			$error=$objDOM->getElementsByTagName("error")->item(0);
	   		$errorcode = $error->getAttribute("code");	
   			$errormsg = $error->getAttribute("msg");	
			$resultArray['error'] = $errormsg;	
			$resultArray['error_code'] = $errorcode;	
		}
		// print_r($objDOM);
	 }//end if	
	return $resultArray;
   }//end function
   
	
// }
?>