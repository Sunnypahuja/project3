<?php
    require_once 'lib/core.php';
    require_once 'lib/config_admin.php';
	require_once 'lib/Mobile_Detect.php';
	$detect = new Mobile_Detect();
    
    $sql="select * from customer_navbar where status='active' order by sort_order,head";
	$result=$conn_admin->query($sql);
	if($result->num_rows>0)
	{
		while($row=$result->fetch_assoc())
		{
			$navbar[]=$row;
		}
	}
	$sql="select child.head as chead,child.link as clink,child.icon as cicon,child.parent as cparent,parent.head as phead,parent.icon as picon ";
    $sql.="from customer_navbar child,customer_navbar parent where child.parent=parent.id and child.status='active' and parent.status='active' order by chead";
	$result=$conn_admin->query($sql);
	if($result->num_rows>0)
	{
		while($row=$result->fetch_assoc())
		{
			$nav_with_parents[]=$row;
			$ids[]=$row['cparent'];
		}
	}
	
	$data=[];
	$i=0;

	if(isset($navbar))
	{
	?>
		
	<?php
		foreach($navbar as $navbar)
		{
			if ($detect->isMobile() && strtolower(html_entity_decode($navbar['head'])) == "point of sale")
			{
				continue;
			}
			$id=$navbar['id'];
			$drop_i='no';
			$active="";
			if(in_array($id,$ids))
			{
				$parent_exist=true;
				$drop_i='<span class="pull-right-container"><i class="fa fa-angle-left pull-right">&nbsp;&nbsp;&nbsp;&nbsp;</i></span>';
				foreach($nav_with_parents as $nvp)
				{
					if($id==$nvp['cparent'])
					{
						$child_data[]=$nvp;
						if(basename($_SERVER['PHP_SELF'])=="".$nvp['clink'].".php")
						{
							$active="active menu-open";
						}
					}
				}

			}
			$head=$navbar['head'];
			$parent=$navbar['parent'];
			$link=$navbar['link'];
			$icon=$navbar['icon'];

			if(isset($parent))
			{
				continue;
			}

			if(isset($child_data))
			{
				$class="treeview";
			}
			else
			{
				$class="";
			} 

			$main_active="";
			if(basename($_SERVER['PHP_SELF']) == "".$link.".php")
			{
				$main_active="active";
			}

			$data[$i]['class'] = $class.' '.$active.' '.$main_active;
			
			if($link == "#")
			{
				$data[$i]['link']="#";
				$data[$i]['icon']=$icon;
				$data[$i]['head']=$head;
				$data[$i]['drop_i']=html_entity_decode($drop_i);
			}
			else
			{
				$data[$i]['link']="$link";
				$data[$i]['icon']=$icon;
				$data[$i]['head']=html_entity_decode($head);
				$data[$i]['drop_i']=html_entity_decode($drop_i);
			}
	
			if(isset($child_data))
			{
				$open_sub="";
				if($active != "")
				{
					$open_sub="display: 'block'";
				}
//				$data[$i]['child_open_sub']=$open_sub;
				$j=0;
				foreach($child_data as $cd)
				{
					if($detect->isMobile() &&  $cd['clink'] == "create_orders")
					{
						continue;
					}
					$child_active="";

					if(basename($_SERVER['PHP_SELF'])=="".$cd['clink'].".php")
					{
						$child_active="active";
					}

				  	$data[$i]['child'][$j]['class']=$child_active;
					$data[$i]['child'][$j]['link']=$cd['clink'];
					$data[$i]['child'][$j]['icon']=$cd['cicon'];
					$data[$i]['child'][$j]['head']=$cd['chead'];
					$j++;
				}
			}
			unset($child_data);
			$i++;
		}
	}

	echo json_encode($data);
?>