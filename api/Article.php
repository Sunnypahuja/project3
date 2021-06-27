    
<?php
    require_once 'lib/core.php';
    
    if(isset($_POST['fetch_singleArticle']))
    {
        $id=$_POST['fetch_singleArticle'];
        $sql="select * from article where id=$id";
        if($res=$conn->query($sql))
        {
            if($res->num_rows)
            {
                $row=$res->fetch_assoc();
                $data=$row;
            }
            else
            {
                $data['msg']="no_rows";
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }
    ?>