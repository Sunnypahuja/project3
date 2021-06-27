
<?php

//$data = $_POST['img'];

//echo sizeof($_POST['img']);

//echo $_POST['img'][$i];

$size=sizeof($_POST['img']);
for($i=0;$i<$size;$i++)
{
    echo $i;
    $data=$_POST['img'][$i];
     list($type, $data) = explode(';', $data);

    list(, $data)      = explode(',', $data);


    $data = base64_decode($data);

    $imageName = $i.'.png';

    file_put_contents('upload/'.$imageName, $data); 
    
}






//echo 'done';
?>