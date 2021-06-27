<?php

    require_once 'lib/core.php';
    if(isset($_GET['class_id'])&&!empty($_GET['class_id'])&&isset($_GET['ispresenter'])&&!empty($_GET['ispresenter']))
    {
        $class_id =$_GET['class_id'];
        $presenter= $_GET['ispresenter'];
        $time=date('H:i:s');
        $sql="update live_class set status=2, end_time='$time' where class_id='$class_id'";
        if($conn->query($sql))
        {
            $data['msg']="ok";
        }
        else
        {
            $data['msg']=$conn->error;
        }
    }
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">

	 <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Jost&display=swap" rel="stylesheet">

	<script src="https://kit.fontawesome.com/251c1ad996.js"></script>
	<style>

		body{
			font-family: 'Jost', sans-serif;
			overflow: hidden;
		}



		.yellow{
		background-color: #f78200;
		min-height: 140px;			
		}

		.blue{
			background-color: #1d82d4;
			min-height: 400px;
		}


		.container{
			background-color: white;
			min-height: 560px;
			position: absolute;
			z-index: 20;
			top: 50px;
			margin: 0 auto;
			width: 70%;
			margin-left: 15%;
		}

		h1, button{
			top: 50%;
			transform: translateY(250px);
		}


		@media (max-width: 768px) {
			.container{
				width: 80%;
				margin-left: 10%;
			}
		}


	</style>
</head>
<body>


		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12 yellow"></div>
			</div>

			<div class="row">
				<div class="col-lg-12 blue"></div>
			</div>

			<div class="row">
				<div class="col-lg-12 yellow"></div>
			</div>
		</div>


	
		<div class="container text-center shadow align-middle">
			<h1>Class Ended</h1>
			
			<button type="button" class="btn btn-success py-2 px-3 mt-3"><i class="fas fa-home"></i> Home</button>
			
		</div>


	






	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<!-- <script src="js/main.js"></script> -->
	<!-- Optional JavaScript -->
	    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
	    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	
</body>
</html>