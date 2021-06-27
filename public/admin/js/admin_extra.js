    $(document).ready(function() { 

          if ("IntersectionObserver" in window) {
            lazyloadImages = document.querySelectorAll(".lazy");
            var imageObserver = new IntersectionObserver(function(entries, observer) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  var image = entry.target;
                  image.src = image.dataset.src;
                  image.classList.remove("lazy");
                  imageObserver.unobserve(image);
                }
              });
            });

            lazyloadImages.forEach(function(image) {
              imageObserver.observe(image);
            });
          } else {  
            var lazyloadThrottleTimeout;
            lazyloadImages = $(".lazy");

            function lazyload () {
              if(lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
              }    

              lazyloadThrottleTimeout = setTimeout(function() {
                  var scrollTop = $(window).scrollTop();
                  lazyloadImages.each(function() {
                      var el = $(this);
                      if(el.offset().top - scrollTop < window.innerHeight) {
                        var url = el.attr("data-src");
                        el.attr("src", url);
                        el.removeClass("lazy");
                        lazyloadImages = $(".lazy");
                      }
                  });
                  if(lazyloadImages.length == 0) { 
                    $(document).off("scroll");
                    $(window).off("resize");
                  }
              }, 20);
            }

            $(document).on("scroll", lazyload);
            $(window).on("resize", lazyload);
          }
          
      $('#example1').DataTable({
          'destroy'     : true,
          'paging'      : true,
          'lengthChange': true,
          'searching'   : true,
          'ordering'    : true,
          'info'        : true,
          'autoWidth'   : true,
          'dom': 'Bfrtip',
          'buttons': [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]

      });

      $('#example2').DataTable({
          'destroy'     : true,
          'paging'      : true,
          'lengthChange': true,
          'searching'   : true,
          'ordering'    : true,
          'info'        : true,
          'autoWidth'   : true,

      });
        
      $('#example3').DataTable({
          'destroy'     : true,
          'paging'      : true,
          'lengthChange': false,
          'searching'   : true,
          'ordering'    : true,
          'info'        : true,
          'autoWidth'   : true,

      });

        $('#mobile_table').DataTable({
          'paging'      : true,
          'lengthChange': false,
          'searching'   : true,
          'ordering'    : false,
          'info'        : true,
          'autoWidth'   : true,

        });

        //add class on the datatable buttons
        $(".dt-button").addClass("btn btn-danger btn-sm");
        $(".dt-buttons").css('text-align','center');

        //Toggle the switch if website status is enabled
        if($("#website_status_value").val()=="Enable")
        {

           $("#website_status").attr("checked", true);
        }	

        //Creating Ajax Call on Shop Switch Click
        $('#website_status'). click(function(){
            var website_status_value="";
            if($(this). prop("checked") == true){
                website_status_value="Enable";

            }
            else if($(this). prop("checked") == false){
                website_status_value="Disable";
            }
            $.ajax({
               type:"post",
               url:"ajax_admin.php",
               data:{website_status_value:website_status_value},
               success:function(result)
               {
                   if(result=="ok")
                   {
                   }
                   else
                   {
                         alert("Some Error Occured!");
                   }
               }
            });
        });

        // Disable scroll when focused on a number input.
        $('form').on('focus', 'input[type=number]', function(e) {
            $(this).on('wheel', function(e) {
                e.preventDefault();
            });
        });

        // Restore scroll on number inputs.
        $('form').on('blur', 'input[type=number]', function(e) {
            $(this).off('wheel');
        });

        // Disable up and down keys.
        $('form').on('keydown', 'input[type=number]', function(e) {
            if ( e.which == 38 || e.which == 40 )
                e.preventDefault();
        });  

        //Restricting Only Number Inputs
        $("input[type=number]").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                 // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
                 // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

      });

        //file type validation
        function deleteImage(str,nameimage){
          $.post("ajax_admin.php",{
            image_id:str,
            nameimage:nameimage,
            },
            function(data,status){
              const res=document.getElementById('message');
              var tag=document.createElement('div');
              tag.setAttribute('id','uninque');
              if (data==='fail') {
                tag.setAttribute('class','alert alert-danger uninque');
                var t=document.createTextNode("Error Deleting The Image");
                tag.appendChild(t);
                res.appendChild(tag);
              }
              if (data==='success') {
                $('.alert').hide();
                tag.setAttribute('class','alert alert-success uninque');
                var t=document.createTextNode("Successfully Deleted the Image");
                tag.appendChild(t);
                res.appendChild(tag);
                document.getElementById("div"+str).remove();
                //location.reload();
              }
              //setTimeout(() => {
                //document.getElementById("uninque").remove();
                //
              //}, 3000);
            });
        }

    $(document).on('change', '#image_upload_file', function () {
    var progressBar = $('.progressBar'), bar = $('.progressBar .bar'), percent = $('.progressBar .percent');

    $('#image_upload_form').ajaxForm({
        beforeSend: function() {
            progressBar.fadeIn();
            var percentVal = '0%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        success: function(html, statusText, xhr, $form) {
          console.log(html);
            obj = $.parseJSON(html);	
            if(obj.status){		
                var percentVal = '100%';
                bar.width(percentVal)
                percent.html(percentVal);
                $("#imgArea>img").prop('src',obj.image_medium);			
            }else{
                alert(obj.error);
            }
        },
        complete: function(xhr) {
            progressBar.fadeOut();			
        }	
    }).submit();		

    });


    //Left navigatyion bar search

        $(document).on('click','#search',function(){
        $('#main_nav_head').html(`  
        <div class="input-group add-on">
          <input type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term">
          <div class="input-group-btn">
            <button type="button" class="btn btn-default btn_close" ><i class="fa fa-times"></i></button>
          </div>
        </div>
      `)
        $("#srch-term").focus()
    });

    $(document).on('click','.btn_close',function(){
        $('#main_nav_head').html(`MAIN NAVIGATION <i class="fa fa-search pull-right" id="search" style="color:#00c0EF"></i>`);
        $('#main_nav_head').siblings('li').show();
    });

      $(document).on('keyup','#srch-term',function(){
          $('#main_nav_head').siblings('li').hide();
          var value=$(this).val();
          var i=0
          $('#main_nav_head').siblings('li').each(function(){
            if($(this).html().toLowerCase().includes(value.toLowerCase()))
                {
                    $(this).show();
                }
        });   
      });


    function adminNav(btn)
    {
        if($(btn).find(".treeview-menu").length)
        {
            var status=true;
            if($(btn).attr("class").includes("active"))
            {
                status=false;
            }
            $(".treeview").removeClass("active").removeClass("menu-open")
            if(status)
            {
                $(btn).addClass("active").addClass("menu-open")
            }
        }
        else
        {
            $(".treeview").removeClass("active").removeClass("menu-open")
        }
    }