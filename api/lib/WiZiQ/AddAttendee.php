<?php
	function AddAttendee($secretAcessKey,$access_key,$webServiceUrl,$cid)
	{
		require_once("AuthBase.php");
		$authBase = new AuthBase($secretAcessKey,$access_key);
		$XMLAttendee="<attendee_list>
			<attendee>
			  <attendee_id><![CDATA[101]]></attendee_id>
			  <screen_name><![CDATA[john]]></screen_name>
                          <language_culture_name><![CDATA[es-ES]]></language_culture_name>
			</attendee>
			<attendee>
			  <attendee_id><![CDATA[102]]></attendee_id>
			  <screen_name><![CDATA[mark]]></screen_name>
                          <language_culture_name><![CDATA[ru-RU]]></language_culture_name>
			</attendee>
		  </attendee_list>";
		  $resultArray['status']=false;
		$method = "add_attendees";
		$requestParameters["signature"]=$authBase->GenerateSignature($method,$requestParameters);
		$requestParameters["class_id"] = $cid;//required
		$requestParameters["attendee_list"]=$XMLAttendee;
		$httpRequest=new HttpRequest();
		try
		{
			$XMLReturn=$httpRequest->wiziq_do_post_request($webServiceUrl.'?method=add_attendees',http_build_query($requestParameters, '', '&')); 
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
				
				$add_attendeesTag=$objDOM->getElementsByTagName("add_attendees")->item(0);
				$add_attendeesStatus = $add_attendeesTag->getAttribute("status");
				
				$attendeeTag=$objDOM->getElementsByTagName("attendee");
				$length=$attendeeTag->length;
				for($i=0;$i<$length;$i++)
				{
					$attendee_idTag=$objDOM->getElementsByTagName("attendee_id");
					$attendee_id=$attendee_idTag->item($i)->nodeValue;
					
					$attendee_urlTag=$objDOM->getElementsByTagName("attendee_url");
					$attendee_url=$attendee_urlTag->item($i)->nodeValue;
				}
				$resultArray['status']=true;
				$resultArray['id']=$attendee_id;
				$resultArray['url']=$attendee_url;
 			}
			else if($attribNode=="fail")
			{
				$error=$objDOM->getElementsByTagName("error")->item(0);
				$errorcode = $error->getAttribute("code");	
				$errormsg = $error->getAttribute("msg");
				$resultArray['errorcode']=$errorcode;	
				$resultArray['errormsg']=$errormsg;	
			}
	 	}//end if
		//  print_r($resultArray);
		return $resultArray;	
   }//end function
?>