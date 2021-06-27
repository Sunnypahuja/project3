    $(function(){ 
        //alert(JSON.stringify(p_list));
        //alert(JSON.stringify(p_option_list));
//        alert(JSON.stringify(p_option_details));
        $("#contact").keypress(function(e) {
            if($(this).val().length == 10)
            {
                if(e.which == 13) {

                    $("#add_contact").click();
                }
            }
        });
    });

    function check_max_gram(min_quantity, max_quantity)
    {
        if($("#kg_option").val() == $("#kg_option option:last").val())
        {
            if(max_quantity == parseInt($("#kg_option").val())*1000)
            {
                if($("#gram_option option:first").val() != 0)
                {
                    $("#gram_option").prepend("<option value='0'>0</option>");
                }
                
                $("#gram_option").val($("#gram_option option:first").val())
            }
        }
        
        if($("#kg_option").val()*1000 + $("#gram_option").val() < min_quantity)
        {
            if($("#gram_option option:first").val() == 0)
            {
                $("#gram_option option:first").remove();
            }
                
            $("#gram_option").val($("#gram_option option:first").val())
        }
    }
    
    function check_max_litre(min_quantity, max_quantity)
    {
        if($("#l_option").val() == $("#l_option option:last").val())
        {
            if(max_quantity == parseInt($("#l_option").val())*1000)
            {
                if($("#ml_option option:first").val() != 0)
                {
                    $("#ml_option").prepend("<option value='0'>0</option>");
                }
                
                $("#ml_option").val($("#ml_option option:first").val())
            }
        }
        
        if($("#l_option").val()*1000 + $("#ml_option").val() < min_quantity)
        {
            if($("#ml_option option:first").val() == 0)
            {
                $("#ml_option option:first").remove();
            }
                
            $("#ml_option").val($("#ml_option option:first").val())
        }
    }