<?php

		$access_key="g99f0kW6HP8=";
		$secretAcessKey="zXAEJyc3x3bEoDAlVaH4qQ==";
		$webServiceUrl="http://classapi.wiziqxt.com/apimanager.ashx";

		require_once("create.php");
		$obj=new ScheduleClass($secretAcessKey,$access_key,$webServiceUrl,'2021-05-08','00:06',12,'Pancham','Demo Class');
		
		//require_once("ModifyClass.php");
		//$obj=new ModifyClass($secretAcessKey,$access_key,$webServiceUrl);
		
		//require_once("AddAttendee.php");
		//$obj=new AddAttendee($secretAcessKey,$access_key,$webServiceUrl);
		
		//require_once("CancelClass.php");
		//$obj=new CancelClass($secretAcessKey,$access_key,$webServiceUrl);

		
		//require_once("DownloadRecording.php");
		/*$obj = new DownloadRecording($secretAcessKey, $access_key, $webServiceUrl);
		 In the above download recording output xml there is a <status_xml_path> i.e. http://wiziq.com/download/1234.xml
		   this xml would contain all the necessary status for the recording download
		   e.g -:
		   <rsp status='ok'>
		   <method>download_recording</method>
		   <download_recording status='true'>
		   <download_status>false</download_status>
		   <message>Download Recording has been started..</message>
		   <recording_download_path>http://wiziq.com/download/recording_9195.exe</recording_download_path>
		   </download_recording>
		   </rsp>
		   Actual recording file path will be the value of node <recording_download_path> obtained by requesting above xml
		 */
?>