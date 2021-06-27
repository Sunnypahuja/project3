$(function(){
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
     
     //add class on the datatable buttons
     $(".dt-button").addClass("btn btn-danger btn-sm");
     $(".dt-buttons").css('text-align','center');
})