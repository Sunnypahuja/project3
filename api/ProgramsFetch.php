<?php
    require_once 'lib/core.php';

    //FETCH ALL PRODUCTS
    if(isset($_POST['programmes_and_courses']))
    {
        $data=[];
        if($conn->real_escape_string($_POST['programmes_and_courses']) == "featured")
        {
            $sql="select * from programs_and_courses where status in('active', 'inactive') and id not in(select course_id from featured_courses) order by id desc ";
        }
        else
        {
            $sql="select * from programs_and_courses where status in('active', 'inactive') order by id desc ";
        }
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
        }
        echo json_encode($data);
    }
    
    //FETCH ALL PRODUCTS
    if(isset($_POST['programmes']))
    {
        $data=[];
        $sql="select * from programs_and_courses where type='program' and status in('active', 'inactive') order by id desc ";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
        }
        echo json_encode($data);
    }

    if(isset($_POST['student_programmes']))
    {
        $data=[];
        $type=$_POST['type'];
        $sql="select * from programs_and_courses where fees!=0 and type='program' and status='active' order by id desc";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
                $sql="select item_id from user_purchase_lib where purchase_type='$type'";
                if($result=$conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        while($row=$result->fetch_assoc())
                        {
                            $data['program_id'][]=$row['item_id'];
                        }
                        $data['msg2']="done";
                    }
                    else
                    {
                        $data['msg2']="No Data Available";
                    }
                }
                
            }
        }
        echo json_encode($data);
    }
    if(isset($_POST['student_programmes_free']))
    {
        $data=[];
        $type=$_POST['type'];
        $sql="select * from programs_and_courses where fees=0 and type='program' and status='active' order by id desc";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
        }
        echo json_encode($data);
    }



    //FETCH PARTICULAR PRODUCT DETAILS
    if(isset($_POST['edit_programme']))
    {
        $id=test_input($_POST['edit_programme']);
        $data=[];
        $sql="select * from programs_and_courses where id=$id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                if($row=$result->fetch_assoc())
                {                   
                    $data[]=$row;
                }
            }
        }
        echo json_encode($data);
    }

    //FETCH ALL PRODUCTS
    if(isset($_POST['courses']))
    {
        $data=[];
        $sql="select * from programs_and_courses where type='course' and status in('active', 'inactive') order by id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }

        }
        echo json_encode($data);
    }

    if(isset($_POST['student_courses']))
    {
        $data=[];
        $type=$_POST['type'];
        $sql="select * from programs_and_courses where type='course' and fees!=0 and status='active' order by id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
                $sql="select item_id from user_purchase_lib where purchase_type='$type'";
                if($result=$conn->query($sql))
                {
                    if($result->num_rows)
                    {
                        while($row=$result->fetch_assoc())
                        {
                            $data['course_id'][]=$row['item_id'];
                        }
                        $data['msg2']="done";
                    }
                    else
                    {
                        $data['msg2']="No Data Available";
                    }
                }
            }

        }
        
        echo json_encode($data);
    }


    if(isset($_POST['student_courses_free']))
    {
        $data=[];
        $type=$_POST['type'];
        $sql="select * from programs_and_courses where type='course' and fees=0 and status='active' order by id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
                // $sql="select item_id from user_purchase_lib where purchase_type='$type'";
                // if($result=$conn->query($sql))
                // {
                //     if($result->num_rows)
                //     {
                //         while($row=$result->fetch_assoc())
                //         {
                //             $data['course_id'][]=$row['item_id'];
                //         }
                //         $data['msg2']="done";
                //     }
                //     else
                //     {
                //         $data['msg2']="No Data Available";
                //     }
                // }
            }

        }
        
        echo json_encode($data);
    }

    //FETCH PARTICULAR PRODUCT DETAILS
    if(isset($_POST['edit_course']))
    {
        $id=test_input($_POST['edit_course']);
        $data=[];
        $sql="select * from programs_and_courses where id=$id";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                if($row=$result->fetch_assoc())
                {                   
                    $data[]=$row;
                }
            }
        }
        echo json_encode($data);
    }

    //FETCH ALL QUIZ
    if(isset($_POST['quiz']))
    {
        $type=$_POST['type'];
        $data=[];
        $sql="select q.*, COALESCE(dp.title, pc.name, q.free_under) comes_under from quiz q left outer join dynamic_pages dp on dp.id=q.free_under left outer join programs_and_courses pc on pc.id=q.paid_under where q.type='$type' order by q.id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data[]=$row;
                }
            }
        }
        echo json_encode($data);
    }

    if(isset($_POST['previous_quiz']))
    {
        $data=[];
        $type=$_POST['type'];
        $sql="select q.* from quiz q where q.type='$type' and prev_year=1 order by q.id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="no rows";
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }

    //FETCH QUIZ DETAILS
    if(isset($_POST['quiz_details']))
    {
        $id=$conn->real_escape_string($_POST['quiz_details']);

        $data=[];
        $sql="select * from quiz where id=$id";
        if($result=$conn->query($sql))
        {
            if($result->num_rows)
            {
                if($row=$result->fetch_assoc())
                {
                    $row['questions']=[];
                    $sql="select qz.*, qo.option_value from quiz_questions qz, quiz_options qo where qz.id=qo.question_id and qz.quiz_id=$id";

                    if($res=$conn->query($sql))
                    {
                        if($res->num_rows)
                        {
                            while($r=$res->fetch_assoc())
                            {
                                if(isset($row['questions'][$r['id']]))
                                {
                                    $row['questions'][$r['id']]['options'][]=$r['option_value'];
                                }
                                else
                                {
                                    $row['questions'][$r['id']]=[];
                                    $row['questions'][$r['id']]['options']=[];

                                    $row['questions'][$r['id']]['question']=$r['question'];
                                    $row['questions'][$r['id']]['correct_answer']=$r['correct_answer'];
                                    $row['questions'][$r['id']]['explanation']=$r['explanation'];
                                    $row['questions'][$r['id']]['options'][]=$r['option_value'];
                                }
                            }
                        }
                    }

                    $data[]=$row;
                }
            }
        }
        echo json_encode($data);
    }

    // if(isset($_POST['fetch_purchaselib']))
    // {
    //     $type=$_POST['type'];
       
    //     else
    //     {
    //         $data['msg']=$conn->query($sql);
    //     }
    //     echo json_encode($data);
    // }

    if(isset($_POST['fetch_allproducts']))
    {
        $sql="select * from programs_and_courses where status in('active', 'inactive') order by id desc ";
        if($result=$conn->query($sql))
        {
            $data=[];
            if($result->num_rows)
            {
                while($row=$result->fetch_assoc())
                {
                    $data['data'][]=$row;
                }
                $data['msg']="ok";
            }
            else
            {
                $data['msg']="No Data Available";
            }
        }
        else
        {
            $data['msg']=$conn->error;
        }
        echo json_encode($data);
    }
    
    

    
?>