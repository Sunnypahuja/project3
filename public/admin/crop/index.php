<html lang="en">

<head>

  <title>PHP - jquery ajax crop image before upload using croppie plugins</title>
  
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">

  <script src="http://demo.itsolutionstuff.com/plugin/jquery.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  <script src="http://demo.itsolutionstuff.com/plugin/croppie.js"></script>

  
  <link rel="stylesheet" href="http://demo.itsolutionstuff.com/plugin/croppie.css">

</head>

<body>

 <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
          <div class="modal-content">
           <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
        
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
 <div id="upload-demo" class='demo1' style="width:350px"></div>
<div class="container">

	<div class="panel panel-default">

	  <div class="panel-heading">Image Upluad</div>

	  <div class="panel-body">


	  	<div class="row">

	  		<div class="col-md-4 text-center">

	  		</div>

	  		<div class="col-md-4" style="padding-top:30px;">

				<strong>Select Image:</strong>

				<br/>

				<input type="file"  id="1" >
				<input type="file" id="2">
				<input type="file" id="3">

				<br/>

				<button class="btn btn-success upload-result">Upload Image</button>

	  		</div>

	  		<div class="col-md-4" style="">

				<div id="upload-demo-i" style="background:#e1e1e1;width:300px;padding:30px;height:300px;margin-top:30px"></div>

	  		</div>

	  	</div>


	  </div>

	</div>

    <form id="one" action="ajaxpro.php" method="post" enctype="multipart/form-data">
        <input type="text" name="img[]" id="data1">
        <input type="text" name="img[]" id="data2">
        <input type="text" name="img[]" id="data3">
        <button type="submit" >Upload Images</button>
    </form>


</div>




<script type="text/javascript">


    
$uploadCrop = $('#upload-demo').croppie({

    enableExif: true,

    viewport: {
        width: 200,
        height: 200,
        type: 'square'

    },
});


$('input[type="file"]').on('change', function () { 
    divId=this.id;
	var reader = new FileReader();

    reader.onload = function (e) {

    	$uploadCrop.croppie('bind', {

    		url: e.target.result

    	}).then(function(){

    		console.log('jQuery bind complete');
            $('.upload-result').val(divId);
    	});

    	

    }

    reader.readAsDataURL(this.files[0]);
    
    //$('#myModal').modal('show');

});


$('.upload-result').on('click', function (ev) {

	    buttonval=this.value;
    $uploadCrop.croppie('result', {

		type: 'canvas',

		size: 'viewport'

	}).then(function (resp) {
        imgId='#data'+buttonval;
       $(imgId).val(resp);
       //  alert($(imgId).val());
				html = '<img src="' + resp + '" />';

				$("#upload-demo-i").html(html);
        
    });
    
});
    
    /*
        $("#one").on('submit',function(e){
       e.preventDefault();
          $.ajax({
				type: 'POST',
				url: 'ajaxpro.php',
				data: new FormData(this),
				contentType: false,
				cache: false,
				processData:false,
				
				success:function(msg){
                  alert(msg);
				}



	});

});

*/
</script>




</body>

</html>