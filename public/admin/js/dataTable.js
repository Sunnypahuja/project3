$(function(){
     $('#example1').DataTable({
          'destroy'     : true,
          'paging'      : true,
          'lengthChange': true,
          'searching'   : true,
          'ordering'    : true,
          'info'        : true,
          'autoWidth'   : true,
          'dom'         : 'Bfrtip',
          'buttons'     : [
                              {
                                   extend: 'copy',
                                   exportOptions: {
                                       columns: "thead th:not(.noExport)"
                                   }
                              },
                              {
                                   extend: 'csv',
                                   exportOptions: {
                                       columns: "thead th:not(.noExport)"
                                   }
                              },
                              {
                                   extend: 'pdf',
                                   exportOptions: {
                                       columns: "thead th:not(.noExport)"
                                   }
                              },
                              {
                                   extend: 'excel',
                                   exportOptions: {
                                       columns: "thead th:not(.noExport)"
                                   }
                              }, 
                              {
                                   extend: 'print',
                                   exportOptions: {
                                       columns: "thead th:not(.noExport)"
                                   }
                              },
                              'pageLength'
                         ],

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
     
     //add class on the datatable buttons
     $(".dt-button").addClass("btn btn-danger btn-sm");
     $(".dt-buttons").css('text-align','center');
})