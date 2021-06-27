import React from 'react';

import { Link } from "react-router-dom";
import { api_link } from './AdminLogin';

import axios from 'axios';
import $ from 'jquery';

const parse = require('html-react-parser');

class SingleOrderDetails extends React.Component{

    constructor(props) {
        super();
        this.state = {
            id: props.match.params.order_id,
            name: props.match.params.name,
            order_details: [],
            prod_details: [],
            coupon_details: [],
            history_details:[],
            status_details: [],
            products: [],
            logo: '',
            contact: '',
            refresh: false,
            modalVisible: false,
            editModalVisible: false,
            slotModalVisible: false,
            itemModalVisible: false,
            addModalVisible: false,
            doingModal: false,
            current_product:'',
            current_id:'',
            current_type:'',
            current_price:'',
            current_product_price:'',
            current_product_quantity:'',
        }
        
        this.childKey = 0;    
        this.handleOrderHistory = this.handleOrderHistory.bind(this);
        this.handleTimeslotFormSubmit = this.handleTimeslotFormSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.provideGramOptions = this.provideGramOptions.bind(this);
        this.provideLitreOptions = this.provideLitreOptions.bind(this);
        this.provideOptions = this.provideOptions.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.addModal = this.addModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.fetchAllProducts = this.fetchAllProducts.bind(this);
        this.itemOptionModal = this.itemOptionModal.bind(this);
        this.openAddItemModal = this.openAddItemModal.bind(this);
        this.openSlotModal = this.openSlotModal.bind(this);
        this.addProduct = this.addProduct.bind(this);
        
        //GET LOGO
        let profileForm=new FormData();
        profileForm.append("profile","get");
        axios({
            method: 'post',
            url: api_link+'SetupFetch.php',
            data: profileForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            this.setState({ 
                logo: data[0]['logo'],
                contact: data[0]['contact'],
            })
         })
        
        const script = document.createElement("script");
        script.src = "/agent/js/create_order.js";
        script.async = true;
        document.body.appendChild(script);
    }
    
    componentDidMount() {
        document.title="Orders of "+this.state.name
        
        let formOrder = new FormData();
        formOrder.append('order_id', this.state.id)

        var obj=this
        
        //GET ORDER DETAILS
        axios({
            method: 'post',
            url: api_link+'CustomerOrdersFetch.php',
            data: formOrder,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ order_details: data})
            obj.fetchProducts();
         })
        
        //GET COUPON DETAILS
        let couponFormData = new FormData();
        couponFormData.append('coupon_id', this.state.id)
        axios({
            method: 'post',
            url: api_link+'CustomerOrdersFetch.php',
            data: couponFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ coupon_details: data})
         })
        
        //GET ORDER HISTORY
        let historyFormData = new FormData();
        historyFormData.append('history_id', this.state.id)
        axios({
            method: 'post',
            url: api_link+'CustomerOrdersFetch.php',
            data: historyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ history_details: data})
         })
        
        //GET STATUS DETAILS
        let orderStatusData = new FormData();
        orderStatusData.append('order_status', this.state.id)
        axios({
            method: 'post',
            url: api_link+'OrdersFetch.php',
            data: orderStatusData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ status_details: data})
         })       
            
    }
    
    shouldComponentUpdate(nextProps,nextState){
          if(JSON.stringify(this.state.order_details) === JSON.stringify(nextState.order_details))
          {
                return true;
          }
          else 
          {
                if(this.state.refresh)
                {
                    $("script[src='js/dataTable.js']").remove();
                    const script = document.createElement("script");
                    script.src = "/js/dataTable.js";
                    script.async = true;
                    document.body.appendChild(script);
                    ++this.childKey
                }
                else
                {
                    this.setState({
                        refresh: true
                    })
                }
                return true;
          }
    }
    
    fetchProducts(){
        
        var obj=this;
        
        //GET PRODUCTS
        let formData1 = new FormData();
        formData1.append('prod_id', this.state.id)
        axios({
            method: 'post',
            url: api_link+'CustomerOrdersFetch.php',
            data: formData1,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ prod_details: data})
            if(this.state.prod_details.length)
            {
                var delivered_items=0;
                
                var cart_items=this.state.prod_details;
                
                var temp_add=this.state.order_details.shipping_address;
                
                
                var cart_string='';

                var categories=[];
                var home_products=[];
                var sum=0;
                var total=0;

                for(var i=0; i<cart_items.length; i++)
                {
                    if(cart_items[i])
                    {
                        if(!categories.includes(cart_items[i]['product_category']))
                        {
                            if(cart_items[i]['m_id'])
                            {
                                categories.push(cart_items[i]['product_category'])
                            }
                            else
                            {
                                home_products.push(cart_items[i]);
                            }
                        }
                    }
                }

                //HOME PRODUCTS FINALIZE
                if(home_products.length)
                {
                    cart_string+="<tr>";
                    cart_string+="<td colspan='6'></td>";
                    cart_string+="<td class='hidden-print'></td>";
                    cart_string+="</tr>";

                    cart_string+="<tr>";
                    cart_string+="<td class=''></td>";
                    cart_string+="<td class=''><b>Home and Kitchen</b></td>";
                    cart_string+="<td class='' colspan='4'></td>";
                    cart_string+="<td class='hidden-print'></td>";
                    cart_string+="</tr>";
                }

                for(var m=0; m<home_products.length; m++)
                {
                    cart_string+="<tr>";
                    cart_string+="<td class=''>"+(m+1)+"</td>";
                    cart_string+="<td class=''>"+home_products[m]['name'];
                    
                    if(home_products[m]['modal'] !== "" || home_products[m]['modal'] !== " ")
                    {
                        cart_string+=" - "+home_products[m]['modal'];
                    }
                    
                    if(home_products[m]['tamil_name'] !== "" || home_products[m]['tamil_name'] !== " ")
                    {
                        cart_string+="<br/>("+home_products[m]['tamil_name']+")";
                    }
                    
                    cart_string+="</td>";
                    cart_string+="<td class=''>"+home_products[m]['product_quantity']+"</td>";
                    cart_string+="<td class=''>"+home_products[m]['product_quantity_type']+"</td>";
                    cart_string+="<td class=''>"+home_products[m]['product_price']+"</td>";
                    
                    let sum_price=0;
                    if(home_products[m]['product_quantity_type'] === "KG" || home_products[m]['product_quantity_type'] === "Litre")
                    {
                        sum_price=window.Math.round((home_products[m]['product_quantity']*(home_products[m]['product_price']/1000) + window.Number.EPSILON) * 100) / 100;
                        cart_string+="<td class='amount'>"+sum_price+"</td>";
                    }
                    else
                    {
                        sum_price=home_products[m]['product_quantity']*home_products[m]['product_price'];
                        cart_string+="<td class='amount'>"+sum_price+"</td>";
                    }
                    
                    cart_string+="<td class='hidden-print'>";
                    cart_string+="<button class='btn btn-success edit_button' value='"+JSON.stringify(home_products[m])+"'><i class='fa fa-edit'></i> Edit</button>";
                    cart_string+="<button class='btn btn-danger remove_button' value='"+JSON.stringify(home_products[m])+"'><i class='fa fa-trash'></i> Remove</button>";
                    if(obj.state.order_details.order_status === "placed")
                    {
                        cart_string+="<button class='btn btn-danger cancel_button' value='"+JSON.stringify(home_products[m])+"'><i class='fa fa-ban'></i> Cancel</button>";
                    }
                    cart_string+="</td>";
                    cart_string+="</tr>";
                    sum+=sum_price;
                    
                    if(home_products[m]['order_item_status'] === "Delivered")
                    {
                        delivered_items++;
                    }
                }

                if(home_products.length)
                {
                    cart_string+="<tr>";
                    cart_string+="<td></td>";
                    cart_string+="<td><b>Subtotal</b></td>";
                    cart_string+="<td></td>";
                    cart_string+="<td></td>";
                    cart_string+="<td></td>";
                    cart_string+="<td class='amount'><b>"+sum+"</b></td>";
                    cart_string+="<td class='hidden-print'></td>";
                    cart_string+="</tr>";

                    cart_string+="<tr>";
                    cart_string+="<td colspan='6'></td>";
                    cart_string+="<td class='hidden-print'></td>";
                    cart_string+="</tr>";
                }

                total+=sum;
                //HOME PRODUCTS FINALIZE END

                //FOR ALL CATEGORIES
                if(categories.length)
                {
                    for(var b=0; b<categories.length; b++)
                    {
                        sum=0;

                        cart_string+="<tr>";
                        cart_string+="<td colspan='6'></td>";
                        cart_string+="<td class='hidden-print'></td>";
                        cart_string+="</tr>";

                        cart_string+="<tr>";
                        cart_string+="<td></td>";
                        cart_string+="<td><b>"+categories[b]+"</b></td>";
                        cart_string+="<td colspan='4'></td>";
                        cart_string+="<td class='hidden-print'></td>";
                        cart_string+="</tr>";

                        var count=1;
                        //ATTACH ALL PRODUCTS UNDER THIS CATEGORY
                        for(var k=0; k<cart_items.length; k++)
                        {
                            if(cart_items[k])
                            {
                                if(cart_items[k]['product_category'] === categories[b])
                                {
                                      cart_string+="<tr>";
                                      cart_string+="<td>"+(count++)+"</td>";
                                    
                                      cart_string+="<td class=''>"+cart_items[k]['name'];
                    
                                      if(cart_items[k]['modal'] !== "" || cart_items[k]['modal'] !== " ")
                                      {
                                          cart_string+=" - "+cart_items[k]['modal'];
                                      }
  
                                      if(cart_items[k]['tamil_name'] !== "" || cart_items[k]['tamil_name'] !== " ")
                                      {
                                          cart_string+="<br/>("+cart_items[k]['tamil_name']+")";
                                      }
  
                                      cart_string+="</td>";
                                    
                                      if(cart_items[k]['cleaning_charge'] > 0)
                                      {
                                          cart_string+="<br/>(Cleaning - ₹"+cart_items[k]['cleaning_charge']+", Cutting Charge - ₹"+cart_items[k]['cutting_charge']+")";
                                      }
                                      cart_string+="</td>";

                                      if(cart_items[k]['product_quantity_type'] === "KG")
                                      {
                                          cart_string+="<td>"+(cart_items[k]['product_quantity']/1000)+"</td>"; 
                                          cart_string+="<td>K.G.</td>";
                                      }
                                      else if(cart_items[k]['product_quantity_type'] === "Litre")
                                      {
                                          cart_string+="<td>"+(cart_items[k]['product_quantity']/1000)+"</td>"; 
                                          cart_string+="<td>Litre</td>";
                                      }
                                      else
                                      {
                                          cart_string+="<td>"+cart_items[k]['product_quantity']+"</td>";
                                          cart_string+="<td>"+cart_items[k]['product_quantity_type']+"</td>";
                                      }

                                      cart_string+="<td>"+cart_items[k]['product_price']+"</td>";
                                      let sum_price=0;
                                      if(cart_items[k]['product_quantity_type'] === "KG" || cart_items[k]['product_quantity_type'] === "Litre")
                                      {
                                          if(cart_items[k]['cleaning_charge'] > 0)
                                          {
                                              sum_price+=window.parseInt(cart_items[k]['cleaning_charge'])+window.parseInt(cart_items[k]['cutting_charge']);
                                          }
                                          sum_price+=cart_items[k]['product_quantity']*(cart_items[k]['product_price']/1000);
                                          sum_price=window.Math.round((sum_price + window.Number.EPSILON) * 100) / 100;
                                          cart_string+="<td>"+sum_price+"</td>";
                                      }
                                      else
                                      {
                                          sum_price+=cart_items[k]['product_quantity']*cart_items[k]['product_price'];
                                          sum_price=window.Math.round((sum_price + window.Number.EPSILON) * 100) / 100;
                                          if(cart_items[k]['cleaning_charge'] > 0)
                                          {
                                              sum_price+=window.parseInt(cart_items[k]['cleaning_charge'])+window.parseInt(cart_items[k]['cutting_charge']);
                                          }
                                          cart_string+="<td>"+sum_price+"</td>";
                                      }
                                    
                                      cart_string+="<td class='hidden-print'>";
                                      cart_string+="<button class='btn btn-success edit_button' value='"+JSON.stringify(cart_items[k])+"'><i class='fa fa-edit'></i>  Edit</button>";
                                      cart_string+="<button class='btn btn-danger remove_button' value='"+JSON.stringify(cart_items[k])+"'><i class='fa fa-trash'></i>  Remove</button>";
                                    
                                      if(obj.state.order_details.order_status === "placed")
                                      {
                                        cart_string+="<button class='btn btn-danger cancel_button' value='"+JSON.stringify(cart_items[k])+"'><i class='fa fa-ban'></i>  Cancel</button>";
                                      }
                                      cart_string+="</td>";
                                      cart_string+="</tr>";
                                      sum+=window.parseInt(sum_price);
                                    
                                      if(cart_items[k]['order_item_status'] === "Delivered")
                                      {
                                          delivered_items++;
                                      }
                                }
                            }
                        }

                        cart_string+="<tr>";
                        cart_string+="<td></td>";
                        cart_string+="<td><b>Subtotal</b></td>";
                        cart_string+="<td></td>";
                        cart_string+="<td></td>";
                        cart_string+="<td></td>";
                        cart_string+="<td><b>"+sum+"</b></td>";
                        cart_string+="<td class='hidden-print'></td>";
                        cart_string+="</tr>";

                        cart_string+="<tr>";
                        cart_string+="<td colspan='6'></td>";
                        cart_string+="<td class='hidden-print'></td>";
                        cart_string+="</tr>";

                        total+=sum;
                    }
                }
                //FOR ALL CATEGORIES END

                //SHOWING TOTAL AND OTHER CHARGES
                cart_string+="<tr>";
                cart_string+="<td colspan='6'></td>";
                cart_string+="<td class='hidden-print'></td>";
                cart_string+="</tr>";
                
                //PAYMENT MODE DETAILS
                cart_string+="<tr>";
                cart_string+="<td colspan='5' style='text-align: right'><b>Payment Mode</b></td>";
                cart_string+="<td><b>"+this.state.order_details.payment_mode+"</b></td>";
                cart_string+="<td class='hidden-print'></td>";
                cart_string+="</tr>";
                
                //TIME SLOT DETAILS
                cart_string+="<tr class='hidden-print'>";
                cart_string+="<td colspan='5' style='text-align: right'><b>Time Slot("+this.state.order_details['time_slot_type']+")</b></td>";
                cart_string+="<td><b>"+this.state.order_details['time_slot']+"</b></td>";
                cart_string+="<td class='hidden-print'>";
                cart_string+='<button class="btn btn-success slot_button"><i class="fa fa-edit"></i> Edit</button>';
                cart_string+="</td>";
                cart_string+="</tr>";

                //DELIVERY CHARGE
                cart_string+="<tr>";
                cart_string+="<td colspan='5' style='text-align: right'><b>Delivery Charge</b></td>";
                cart_string+="<td><b>"+this.state.order_details['shipping_charge']+"</b></td>";
                cart_string+="<td class='hidden-print'></td>";
                cart_string+="</tr>";
                
                //GRAND TOTAL
                cart_string+="<tr>";
                cart_string+="<td colspan='5' style='text-align: right'><b>Grand Total</b></td>";
                cart_string+="<td><b>"+(total+window.parseInt(this.state.order_details['shipping_charge']))+"</b></td>";
                cart_string+="<td class='hidden-print'></td>";
                cart_string+="</tr>";

                //FINAL SPACING ADDED
                cart_string+="<tr>";
                cart_string+="<td colspan='6'></td>";
                cart_string+="<td class='hidden-print'></td>";
                cart_string+="</tr>";
                
                //ITEMS DELIVERED OR PENDING
                cart_string+="<tr>";
                cart_string+="<td colspan='5' style='text-align: right'><b>Items Ordered/Delivered</b></td>";
                cart_string+="<td><b>"+this.state.prod_details[0]['final_total_items']+"/"+delivered_items+"</b></td>";
                cart_string+="<td class='hidden-print'></td>";
                cart_string+="</tr>";
                
                //FINAL FOOTER
                cart_string+="<tr class='hidden_row'>";
                cart_string+="<td colspan='6' style='text-align: center'><b>www.marketboi.in</b><br/><b>+91-"+this.state.contact+"</b></td>";
                cart_string+="<td class='hidden-print'></td>";
                cart_string+="</tr>";

                $("#show_cart_items").html(cart_string);
                $("#place_final_order_button").show();
                
                $(".edit_button").click(function(){
                    let c = JSON.parse($(this).val());
                    obj.openEditModal(c['p_id'], c['name'], c['quantity_type'], c['min_quantity'], c['max_quantity'], c['quantity_increase_by'], c['price'], c['product_price'], c['product_quantity']);
                })

                $(".remove_button").click(function(){
                    let current_item = JSON.parse($(this).val());
                    
                    if(window.confirm("Are You Sure To Remove This Product?"))
                    {
                        //UPDATE DELIVERY DATE
                        let statusForm=new FormData();
                        statusForm.append("remove_order_item",current_item['p_id']);
                        
                        if(current_item['product_quantity_type'] === "KG")
                        {
                            let sum_price=current_item['product_quantity']*(current_item['product_price']/1000);
                            statusForm.append("remove_order_price",sum_price);
                        }
                        else
                        {
                            let sum_price=current_item['product_quantity']*current_item['product_price'];
                            statusForm.append("remove_order_price",sum_price);
                        }
                        
                        statusForm.append("update_order_id",obj.state.id);
                        statusForm.append("admin_send","set_by_admin");
                        axios({
                            method: 'post',
                            url: api_link+'OrdersManagement.php',
                            data: statusForm,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            if(data === "ok")
                            {
                                $("#update_message").removeClass("alert-danger").addClass("alert-success");
                                $("#update_message").html("<strong>Successfully </strong> Removed!");
                            }
                            else
                            {
                                $("#update_message").removeClass("alert-success").addClass("alert-danger");
                                $("#update_message").html("<strong>Error! </strong> Unable to remove the product!");
                            }

                            $("#update_message").show()
                            window.scrollTo(0, 0); 
                            
                            setTimeout(function(){ $("#update_message").hide();; }, 4000);
                            
                            obj.fetchProducts();
                         })
                    }
                })
                
                $(".cancel_button").click(function(){
                    let current_item = JSON.parse($(this).val());
                    
                    if(window.confirm("Are You Sure To Cancel This Product From Every Pending Orders?"))
                    {
                        //UPDATE DELIVERY DATE
                        let statusForm=new FormData();
                        statusForm.append("cancel_order_item",current_item['p_id']);
                        
                        if(current_item['product_quantity_type'] === "KG")
                        {
                            let sum_price=current_item['product_quantity']*(current_item['product_price']/1000);
                            statusForm.append("remove_order_price",sum_price);
                        }
                        else
                        {
                            let sum_price=current_item['product_quantity']*current_item['product_price'];
                            statusForm.append("remove_order_price",sum_price);
                        }
                        
                        statusForm.append("update_order_id",obj.state.id);
                        axios({
                            method: 'post',
                            url: api_link+'OrdersManagement.php',
                            data: statusForm,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(response => response.data)
                        .then((data) => {
                            if(data === "ok")
                            {
                                $("#update_message").removeClass("alert-danger").addClass("alert-success");
                                $("#update_message").html("<strong>Successfully </strong> Cancelled!");
                            }
                            else
                            {
                                $("#update_message").removeClass("alert-success").addClass("alert-danger");
                                $("#update_message").html("<strong>Error! </strong> Unable to cancel the product!");
                            }

                            $("#update_message").show()
                            window.scrollTo(0, 0); 
                            
                            setTimeout(function(){ $("#update_message").hide();; }, 4000);
                            
                            obj.fetchProducts();
                         })
                    }
                })
                
                $(".slot_button").click(function(){
                    //UPDATE TIME SLOT
                    let statusForm=new FormData();

                    statusForm.append('get_delivery_details', $.trim(temp_add.substring(temp_add.lastIndexOf("- ")+2)))
                    axios({
                        method: 'post',
                        url: api_link+'CreateOrdersAjax.php',
                        data: statusForm,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        $("#timeslot_select").html(data);
                        obj.openSlotModal()
                     })
                })
            }
         })
    }
    
    handleOrderHistory(e){
        e.preventDefault();
        
        if(window.confirm("Are You Sure You Want To Update?"))
        {
            var obj=this;

            //UPDATE STATUS
            var ost_final=$("#order_history_status").val();
            let statusForm=new FormData();
            statusForm.append("update_order_status",$("#order_history_status").val());
            statusForm.append("update_order_id",this.state.id);
            axios({
                method: 'post',
                url: api_link+'OrdersManagement.php',
                data: statusForm,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                if(data === "ok")
                {
                    //GET ORDER HISTORY
                    let historyFormData = new FormData();
                    historyFormData.append('history_id', this.state.id)
                    axios({
                        method: 'post',
                        url: api_link+'CustomerOrdersFetch.php',
                        data: historyFormData,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ history_details: data})
                        $("#o_status_final").html(ost_final);
                     })

                    $("#update_message").removeClass("alert-danger").addClass("alert-success");
                    $("#update_message").html("<strong>Successfully </strong> Updated Status!");
                }
                else
                {
                    $("#update_message").removeClass("alert-success").addClass("alert-danger");
                    $("#update_message").html("<strong>Error! </strong> Unable to update status!");
                }

                $("#update_message").show()
                window.scrollTo(0, 0); 
                setTimeout(function(){ $("#update_message").hide();; }, 4000);
             })
        }
    }
    
    openModal() {
        this.setState({
          doingModal: true,
          modalVisible: !this.state.modalVisible
        });
    }
    
    openSlotModal() {
        this.setState({
          doingModal: true,
          slotModalVisible: !this.state.slotModalVisible
        });
    }
    
    addModal() {
        
        this.fetchAllProducts();
        
        this.setState({
          doingModal: true,
          addModalVisible: !this.state.addModalVisible
        });
    }
    
    closeModal() {
        this.setState({
          doingModal: true,
          editModalVisible: !this.state.editModalVisible
        });
    }
    
    itemOptionModal() {
        this.setState({
          doingModal: true,
          itemModalVisible: !this.state.itemModalVisible
        });
    }
    
    handleDateFormSubmit(e){
        e.preventDefault();
        
        if(window.confirm("Are You Sure You Want To Update?"))
        {
            var obj=this;

            //UPDATE DELIVERY DATE
            let statusForm=new FormData();
            statusForm.append("update_delivery_date",$("#delivery_date").val());
            statusForm.append("update_order_id",this.state.id);
            axios({
                method: 'post',
                url: api_link+'OrdersManagement.php',
                data: statusForm,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {

                document.getElementById("delivery_date_form").reset();

                obj.openModal();

                if(data === "ok")
                {
                    let formOrder = new FormData();
                    formOrder.append('order_id', this.state.id)
                    ///GET ORDER DETAILS
                    axios({
                        method: 'post',
                        url: api_link+'CustomerOrdersFetch.php',
                        data: formOrder,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ order_details: data})
                     })

                    $("#update_message").removeClass("alert-danger").addClass("alert-success");
                    $("#update_message").html("<strong>Successfully </strong> Updated Status!");
                }
                else
                {
                    $("#update_message").removeClass("alert-success").addClass("alert-danger");
                    $("#update_message").html("<strong>Error! </strong> Unable to update status!");
                }

                $("#update_message").show()
                window.scrollTo(0, 0); 
                setTimeout(function(){ $("#update_message").hide();; }, 4000);
             })
        }
        
    }
    
    handleTimeslotFormSubmit(e){
        e.preventDefault();
        
        if(window.confirm("Are You Sure You Want To Update TimeSlot?"))
        {
            var obj=this;

            //UPDATE DELIVERY DATE
            let statusForm=new FormData();
            statusForm.append("update_order_id",this.state.id);
            statusForm.append("update_timeslot",this.refs.timeslot_select.value);
            statusForm.append("update_timeslot_pincode",$.trim(obj.state.order_details.shipping_address.substring(obj.state.order_details.shipping_address.lastIndexOf("- ")+2)));
            
            axios({
                method: 'post',
                url: api_link+'OrdersManagement.php',
                data: statusForm,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {

                document.getElementById("timeslot_form").reset();

                obj.openSlotModal();

                if(data === "ok")
                {
                    let formOrder = new FormData();
                    formOrder.append('order_id', obj.state.id)
                    ///GET ORDER DETAILS
                    axios({
                        method: 'post',
                        url: api_link+'CustomerOrdersFetch.php',
                        data: formOrder,
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(response => response.data)
                    .then((data) => {
                        obj.setState({ order_details: data})
                     })

                    $("#update_message").removeClass("alert-danger").addClass("alert-success");
                    $("#update_message").html("<strong>Successfully </strong> Updated Status!");
                }
                else
                {
                    $("#update_message").removeClass("alert-success").addClass("alert-danger");
                    $("#update_message").html("<strong>Error! </strong> Unable to update status!");
                }

                $("#update_message").show()
                window.scrollTo(0, 0); 
                setTimeout(function(){ $("#update_message").hide();; }, 4000);
             })
        }
        
    }
    
    openEditModal(product_id, product_name, quantity_type, min_quantity, max_quantity, quantity_increase_by, price, product_price, product_quantity){
        this.closeModal();
      
        if(quantity_type === "KG")
        {
            $("#show_options").html(this.provideGramOptions(min_quantity, max_quantity, quantity_increase_by, product_quantity));
        }
        else if(quantity_type === "Litre")
        {
            $("#show_options").html(this.provideLitreOptions(min_quantity, max_quantity, quantity_increase_by, product_quantity));
        }
        else
        {
            $("#show_options").html(this.provideOptions(quantity_type, min_quantity, max_quantity, quantity_increase_by, product_quantity));
        }
      
        this.setState({
          current_product: product_name,
          current_id: product_id,
          current_type: quantity_type,
          current_price: price,
          current_product_price: product_price,
          current_product_quantity: product_quantity,
        });
    }
    
    provideGramOptions(min_quantity, max_quantity, quantity_increase_by, pquantity) {
        // you can access the item object and the event object
//        var min_kg = Math.floor(min_quantity/1000);
//        var min_gram = min_quantity-(min_kg*1000);
//        var max_kg = Math.floor(max_quantity/1000);
        
        var select='';
        if(pquantity)
        {
            
            let selected_kg=Math.floor(pquantity/1000);
            let selected_gram=pquantity-(selected_kg*1000);
            
            let total=(selected_kg*1000)+selected_gram;
            
            select="<div class='col-md-12'>";
            select+="<label>Total Grams</label><br/><input type='number' id='kg_option' class='form-control' value='"+total+"'>";
            select+="</div>";
            
//            select="<div class='col-md-6'>";
//            select+="<label>KG</label><br/><select id='kg_option' class='form-control' onchange='check_max_gram("+min_quantity+","+max_quantity+")'>";
//
//            for(var i=min_kg; i<=max_kg; i++)
//            {
//                if(i == selected_kg)
//                {
//                    select+="<option value='"+i+"' selected>"+i+"</option>";
//                }
//                else
//                {
//                    select+="<option value='"+i+"'>"+i+"</option>";
//                }
//            }
//
//            select+="</select></div>";
//
//            if(quantity_increase_by < 1000)
//            {
//                select+="<div class='col-md-6'>";
//                select+="<label>Grams</label><br/><select id='gram_option' class='form-control' onchange='check_max_gram("+min_quantity+","+max_quantity+")'>";
//
//                if(window.parseInt(min_gram) > window.parseInt(selected_gram))
//                {
//                    select+="<option value='"+selected_gram+"' selected>"+selected_gram+"</option>";
//                }
//                
//                for(var j=window.parseInt(min_gram); j<1000;)
//                {
//                    if(j == selected_gram)
//                    {
//                        select+="<option value='"+j+"' selected>"+j+"</option>";
//                    }
//                    else
//                    {
//                        select+="<option value='"+j+"'>"+j+"</option>";
//                    }
//                    
//                    j=j+window.parseInt(quantity_increase_by)
//                }
//
//                select+="</select></div>";
//            }
        }
        else
        {
            
            select="<div class='col-md-12'>";
            select+="<label>Total Grams</label><br/><input type='number' id='kg_option' class='form-control'>";
            select+="</div>";
            
//            select="<div class='col-md-6'>";
//            select+="<label>KG</label><br/><select id='kg_option' class='form-control' onchange='check_max_gram("+min_quantity+","+max_quantity+")'>";
//
//            for(var i=min_kg; i<=max_kg; i++)
//            {
//                select+="<option value='"+i+"'>"+i+"</option>";
//            }
//
//            select+="</select></div>";
//
//            if(quantity_increase_by < 1000)
//            {
//                select+="<div class='col-md-6'>";
//                select+="<label>Grams</label><br/><select id='gram_option' class='form-control' onchange='check_max_gram("+min_quantity+","+max_quantity+")'>";
//
//                for(var j=window.parseInt(min_gram); j<1000;)
//                {
//                    select+="<option value='"+j+"'>"+j+"</option>";
//                    j=j+window.parseInt(quantity_increase_by)
//                }
//
//                select+="</select></div>";
//            }
        }
        
        return select;
    }
  
    provideLitreOptions(min_quantity, max_quantity, quantity_increase_by, pquantity) {
        // you can access the item object and the event object
//        var min_kg = Math.floor(min_quantity/1000);
//        var min_gram = min_quantity-(min_kg*1000);
//        var max_kg = Math.floor(max_quantity/1000);
      
        var select='';
        
        if(pquantity)
        {
            
            let selected_l=Math.floor(pquantity/1000);
            let selected_ml=pquantity-(selected_l*1000);
            
            let total=(selected_l*1000)+selected_ml;
            
            select="<div class='col-md-12'>";
            select+="<label>Total ML</label><br/><input type='number' id='l_option' class='form-control' value='"+total+"'>";
            select+="</div>";
            
//            
//            select="<div class='col-md-6'>";
//            select+="<label>Litres</label><br/><select id='l_option' class='form-control' onchange='check_max_litre("+min_quantity+","+max_quantity+")'>";
//
//            for(var i=min_kg; i<=max_kg; i++)
//            {
//                if(i == selected_l)
//                {
//                    select+="<option value='"+i+"' selected>"+i+"</option>";
//                }
//                else
//                {
//                    select+="<option value='"+i+"'>"+i+"</option>";
//                }
//            }
//
//            select+="</select></div>";
//
//            if(quantity_increase_by < 1000)
//            {
//                select+="<div class='col-md-6'>";
//                select+="<label>ML</label><br/><select id='ml_option' class='form-control' onchange='check_max_litre("+min_quantity+","+max_quantity+")'>";
//
//                if(window.parseInt(min_gram) > selected_ml)
//                {
//                    select+="<option value='"+selected_ml+"' selected>"+selected_ml+"</option>";
//                }
//                
//                for(var j=window.parseInt(min_gram); j<1000;)
//                {
//                    if(j == selected_ml)
//                    {
//                        select+="<option value='"+j+"' selected>"+j+"</option>";
//                    }
//                    else
//                    {
//                        select+="<option value='"+j+"'>"+j+"</option>";
//                    }
//                    
//                    j=j+window.parseInt(quantity_increase_by)
//                }
//
//                select+="</select></div>";
//            }
        }
        else
        {
            select="<div class='col-md-12'>";
            select+="<label>Total ML</label><br/><input type='number' id='l_option' class='form-control'>";
            select+="</div>";
//            select="<div class='col-md-6'>";
//            select+="<label>Litres</label><br/><select id='l_option' class='form-control' onchange='check_max_litre("+min_quantity+","+max_quantity+")'>";
//
//            for(var i=min_kg; i<=max_kg; i++)
//            {
//                select+="<option value='"+i+"'>"+i+"</option>";
//            }
//
//            select+="</select></div>";
//
//            if(quantity_increase_by < 1000)
//            {
//                select+="<div class='col-md-6'>";
//                select+="<label>ML</label><br/><select id='ml_option' class='form-control' onchange='check_max_litre("+min_quantity+","+max_quantity+")'>";
//
//                for(var j=window.parseInt(min_gram); j<1000;)
//                {
//                    select+="<option value='"+j+"'>"+j+"</option>";
//                    j=j+window.parseInt(quantity_increase_by)
//                }
//
//                select+="</select></div>";
//            }
        }
        
        return select;
    }
  
    provideOptions(quantity_type, min_quantity, max_quantity, quantity_increase_by, pquantity) {

        var select="<div class='col-md-12'>";
        select+="<label>"+quantity_type+"</label><br/><select id='other_option' class='form-control'>";
      
        for(var i=window.parseInt(min_quantity); i<=window.parseInt(max_quantity); i=i+window.parseInt(quantity_increase_by))
        {
            if(pquantity && i===pquantity)
            {
                select+="<option value='"+i+"' selected>"+i+"</option>";
            }
            else
            {
                select+="<option value='"+i+"'>"+i+"</option>";
            }
        }
      
        select+="</select></div>";
        
        return select;
    }
    
    updateCart(){
      
        if(window.confirm("Are You Sure To Update This Item?"))
        {        
            var arr={};
            
            arr['product_id']=this.state.current_id;
            arr['product_name']=this.state.current_product;
            arr['product_type']=this.state.current_type;
            arr['product_price']=this.state.current_price;
            
            if(arr['product_type'] === "KG" || arr['product_type'] === "Litre")
            {
                arr['last_price']=this.state.current_product_quantity*(this.state.current_product_price/1000);
            }
            else
            {
                arr['last_price']=this.state.current_product_quantity*this.state.current_product_price;
            }

            if(this.state.current_type === "KG")
            {
//                arr['product_quantity']=(window.parseInt($("#kg_option").val())*1000) + window.parseInt($("#gram_option").val());
                arr['product_quantity']=window.parseInt($("#kg_option").val());
                arr['final_price'] = arr['product_quantity'] * (this.state.current_price/1000);
            }
            else if(this.state.current_type === "Litre")
            {
//                arr['product_quantity']=(window.parseInt($("#l_option").val())*1000) + window.parseInt($("#ml_option").val());
                arr['product_quantity']=window.parseInt($("#l_option").val());
                arr['final_price'] = arr['product_quantity'] * (this.state.current_price/1000);
            }
            else
            {
                arr['product_quantity']=window.parseInt($("#other_option").val());
                arr['final_price']=this.state.current_price*arr['product_quantity'];
            }
            
            var obj=this;

            //UPDATE DELIVERY DATE
            let statusForm=new FormData();
            statusForm.append("edit_product",JSON.stringify(arr));
            statusForm.append("update_order_id",this.state.id);
            axios({
                method: 'post',
                url: api_link+'OrdersManagement.php',
                data: statusForm,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                
                if(data === "ok")
                {
                    $("#update_message").removeClass("alert-danger").addClass("alert-success");
                    $("#update_message").html("<strong>Successfully </strong> Updated Product!");
                    obj.fetchProducts();
                }
                else
                {
                    $("#update_message").removeClass("alert-success").addClass("alert-danger");
                    $("#update_message").html("<strong>Error! </strong> Unable to edit the product!");
                }

                $("#update_message").show()
                window.scrollTo(0, 0); 
                setTimeout(function(){ $("#update_message").hide();; }, 4000);
             })
            
        }
        
        this.closeModal();
    }
    
    addProduct(){
      
        if(window.confirm("Are You Sure To Add This Product?"))
        {
            var arr={}

            arr['product_id']=this.state.current_id;
            arr['product_name']=this.state.current_product;
            arr['product_price']=this.state.current_price;
            arr['product_type']=this.state.current_type;
            arr['product_brand']=this.state.current_brand;
            arr['product_home_and_kitchen']=this.state.current_home_and_kitchen;
            arr['product_category']=this.state.current_category;
            if(this.state.current_type === "KG")
            {
                arr['product_quantity']=window.parseInt($("#kg_option").val());
                arr['final_price'] = arr['product_quantity'] * (this.state.current_price/1000);
            }
            else if(this.state.current_type === "Litre")
            {
                arr['product_quantity']=window.parseInt($("#l_option").val());
                arr['final_price'] = arr['product_quantity'] * (this.state.current_price/1000);
            }
            else
            {
                arr['product_quantity']=window.parseInt($("#other_option").val());
                arr['final_price']=this.state.current_price*arr['product_quantity'];
            }
            
            var obj=this;

            //UPDATE DELIVERY DATE
            let statusForm=new FormData();
            statusForm.append("add_product",JSON.stringify(arr));
            statusForm.append("update_order_id",this.state.id);
            axios({
                method: 'post',
                url: api_link+'OrdersManagement.php',
                data: statusForm,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(response => response.data)
            .then((data) => {
                
                if(data === "ok")
                {
                    $("#update_message").removeClass("alert-danger").addClass("alert-success");
                    $("#update_message").html("<strong>Successfully </strong> Updated Product!");
                    obj.fetchProducts();
                }
                else
                {
                    $("#update_message").removeClass("alert-success").addClass("alert-danger");
                    $("#update_message").html("<strong>Error! </strong> Unable to edit the product!");
                }

                $("#update_message").show()
                window.scrollTo(0, 0); 
                setTimeout(function(){ $("#update_message").hide();; }, 4000);
             })
            
            this.itemOptionModal();
            this.addModal();
        }
    }
    
    fetchAllProducts(){
        
        let add=this.state.order_details.shipping_address;

        let formData = new FormData();
        formData.append('products_for_pincode', $.trim(add.substring(add.lastIndexOf("- ")+2)))
        
        axios({
            method: 'post',
            url: api_link+'ProductsFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
        .then((data) => {
            this.setState({ products: data })
            $("script[src='/agent/js/dataTable.js']").remove();
            const script = document.createElement("script");
            script.src = "/agent/js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         }) 
    }
    
    openAddItemModal(product_id, product_name, quantity_type, min_quantity, max_quantity, quantity_increase_by, price, category, brand, home_and_kitchen){
        this.itemOptionModal();
      
        if(quantity_type === "KG")
        {
            $("#show_add_options").html(this.provideGramOptions(min_quantity, max_quantity, quantity_increase_by));
        }
        else if(quantity_type === "Litre")
        {
            $("#show_add_options").html(this.provideLitreOptions(min_quantity, max_quantity, quantity_increase_by));
        }
        else
        {
            $("#show_add_options").html(this.provideOptions(quantity_type, min_quantity, max_quantity, quantity_increase_by));
        }
      
        this.setState({
          current_product: product_name,
          current_id: product_id,
          current_price: price,
          current_type: quantity_type,
          current_category: category,
          current_brand: brand,
          current_home_and_kitchen: home_and_kitchen,
        });
    }
    
    render()
    {
        const css_define = `.hidden_row{display:none;} .btn-danger{margin-left: 10px !important;}`;
        
		var obj=this;
		
        function printDiv(logo, name, contact, address, order_no, order_date, order_delivery_date) {
            
            var divContents = document.getElementById("cart_table").innerHTML; 
            
            divContents=divContents.replace('class="table table-bordered"','');
            divContents=divContents.replace('<hr>','');
            
            var a = window.open('', '', 'height=800, width=800'); 
            a.document.write('<html>'); 
            a.document.write('<head>'); 
            a.document.write('<style type="text/css">* {font-size: 33px;font-family: "Century Gothic" !important;font-weight:bold; letter-spacing: 2px;}.ticket{width: 500px;}td,th,tr,thead,table {border: 1px solid black;border-collapse: collapse;}th,td{padding-left: 4px;}.description{width: 250px;max-width: 250px;padding-right: 50px;}.amount{width: 70px;max-width: 80px;}.quantity{width: 40px;max-width: 40px;word-break: break-all;}.price{width: 45px;max-width: 45px;word-break: break-all;}.centered{text-align: center;align-content: center;}.center{display: block;margin-left: auto;margin-right: auto;width: 10%;}@media print{.hidden-print,.hidden-print *{display: none !important;}}</style>');
            a.document.write('<style type="text/css">.hidden-print{display: none}</style>');
//            a.document.write('<style>  .container{max-width:600px !important;padding:0px !important;border:1px solid black;} th,td{border:1px solid black;padding:5px;} .col-xs-12 table{margin-left: 37px;}</style>'); 
            a.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">'); 
            a.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>'); 
            a.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>'); 
            a.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>'); 
            a.document.write('<head>'); 
            a.document.write('<body >'); 
            a.document.write('<div class="ticket container">'); 
            a.document.write('<img class="center mt-3" src="/images/'+logo+'" style="display: block;margin-left: auto;margin-right: auto;width: 50%;margin-top:15px;" >'); 
            a.document.write('<p  class="centered" style="width:100%;margin:auto;"><strong>'+name+', '+contact+'</strong><br/>'+address+'</p>'); 
            a.document.write('<div class="order" style="width:100%;margin:auto;">'); 
            a.document.write('<p style="float: left;"><strong>Order No: '+order_no+'</strong></p>'); 
            
            if(order_delivery_date)
            {
                a.document.write('<p style="float: right;"><strong>Delivery Date: '+order_delivery_date+'</strong></p>'); 
            }
            else
            {
                a.document.write('<p style="float: right;"><strong>Date: '+order_date+'</strong></p>'); 
            }
			
			a.document.write('<p style="clear: both; text-align:center"><b>Time Slot('+obj.state.order_details['time_slot_type']+') - '+obj.state.order_details['time_slot']+'</b></p>');
            
            a.document.write('</div>'); 
            a.document.write(divContents); 
            a.document.write('</div></body></html>'); 
            a.document.close(); 
            setTimeout(function(){ a.print(); }, 1200);
            
        } 
        
        let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        let modalFade = this.state.modalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        let estyles = this.state.editModalVisible
          ? { display: "block" }
          : { display: "none" };
        let emodalFade = this.state.editModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        let astyles = this.state.addModalVisible
          ? { display: "block", overflowY: 'scroll' }
          : { display: "none", overflowY: 'scroll' };
        let amodalFade = this.state.addModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        let istyles = this.state.itemModalVisible
          ? { display: "block", overflowY: 'scroll' }
          : { display: "none", overflowY: 'scroll' };
        let imodalFade = this.state.itemModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        let tstyles = this.state.slotModalVisible
          ? { display: "block", overflowY: 'scroll' }
          : { display: "none", overflowY: 'scroll' };
        let tmodalFade = this.state.slotModalVisible
          ? { fade: "fade" }
          : { fade: "show" };
        
        return(
            <React.Fragment>
                <div id="main_div" className="content-wrapper">
                    <style>{css_define}</style>
                    <section className="content-header">
                        <h1>
                            Orders Details for {this.state.id}
                            <div className="pull-right">
                                {
                                    this.state.order_details.delivery_date
                                    ?
                                    ''
                                    :
                                    <button id="delivery_date_button" onClick={() => this.openModal()} className="btn btn-danger" style={{marginRight: '15px'}}>
                                        <i className="fa fas fa-calendar"></i> Add Delivery Date
                                     </button>
                                }
                                <button onClick={() => printDiv(this.state.logo, this.state.order_details.name, this.state.order_details.contact, this.state.order_details.shipping_address, this.state.id, this.state.order_details.time_statmpts, this.state.order_details.delivery_date)} data-toggle="tooltip" id="btn" title="Print Invoice" className="btn btn-info">
                                    <i className="fa fa-print"></i>
                                 </button>
                            </div>
                        </h1>
                        <section>
                            <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                        </section>
                        <div>
                        <br />
                        <div className="row">
                          <div className="col-xs-12">
                            <div className="box">
                              <div className="box-body">
                                <section id="printarea">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="panel panel-default table-responsive">
                                        <div className="panel-heading">
                                          <h3 className="panel-title"><i className="fa fa-shopping-cart" /> Details</h3>
                                        </div>
                                        <div className="table-responsive">
                                          <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td style={{width: '1%'}}><button data-toggle="tooltip" title="Payment Method" className="btn btn-info btn-xs"><i className="fa fa-credit-card fa-fw" /></button></td>
                                                    <td id="o_status_final">{this.state.order_details.order_status}</td>
                                                </tr>
                                                <tr>
                                                    <td><button data-toggle="tooltip" title="Date Added" className="btn btn-info btn-xs"><i className="fa fa-calendar fa-fw" /></button></td>
                                                    <td>{this.state.order_details.time_statmpts}</td>
                                                </tr>
                                                <tr>
                                                    <td><button data-toggle="tooltip" title="Payment Method" className="btn btn-info btn-xs"><i className="fa fa-credit-card fa-fw" /></button></td>
                                                    <td>{this.state.order_details.payment_mode}</td>
                                                </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="panel panel-default table-responsive">
                                        <div className="panel-heading">
                                          <h3 className="panel-title"><i className="fa fa-user" /> Customer Details</h3>
                                        </div>
                                        <div className="table-responsive">
                                          <table className="table">
                                            <tbody><tr>
                                                <td style={{width: '1%'}}><button data-toggle="tooltip" title="Customer" className="btn btn-info btn-xs"><i className="fa fa-user fa-fw" /></button></td>
                                                <td>{this.state.order_details.name}</td>
                                              </tr>
                                              <tr>
                                                <td><button data-toggle="tooltip" title="E-Mail" className="btn btn-info btn-xs"><i className="fa fa-envelope fa-fw" /></button></td>
                                                <td>{this.state.order_details.email}</td>
                                              </tr>
                                              <tr>
                                                <td><button data-toggle="tooltip" title="Telephone" className="btn btn-info btn-xs"><i className="fa fa-phone fa-fw" /></button></td>
                                                <td>{this.state.order_details.contact}</td>
                                              </tr>
                                            </tbody></table>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="panel panel-default">
                                        <div className="panel-heading">
                                          <h3 className="panel-title"><i className="fa fa-cog" /> Shipping Details</h3>
                                        </div>
                                        <div>
                                          <table className="table">
                                            <tbody>
                                              <tr style={{margin: '5px'}}>
                                                {parse("<td>"+this.state.order_details.shipping_address+"</td>")}
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="panel panel-default">
                                    <div className="panel-heading">
                                      <h3 className="panel-title">
                                          <i className="fa fa-info-circle" /> 
                                          Order (#{this.state.id}) 
                                          {
                                            this.state.order_details.delivery_date
                                            ?
                                            <b> Delivery Date - {this.state.order_details.delivery_date}</b>
                                            :
                                            ''
                                          }
                                          <button className="btn btn-primary" style={{marginLeft: '5%'}} onClick={() => this.addModal()}><i className="fa fa-plus"/> Add Product</button>
                                      </h3>
                                    </div>
                                    <div id="cart_table" className="panel-body table-responsive">
                                        <hr />

                                      <table className="table table-bordered" style={{width: '100%'}}>
                                        <thead>
                                          <tr>
                                            <th>No.</th>
                                            <th>Particular</th>
                                            <th>Qty</th>
                                            <th>Unit</th>
                                            <th>Price</th>
                                            <th>Amount</th>
                                            <th className="hidden-print">Action</th>
                                          </tr>
                                        </thead>
                                        <tbody id="show_cart_items" style={{clear: 'both'}}>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </section>
                                <section id="history_section" className="content table-responsive">
                                  <fieldset>
                                    <legend>Add Order History</legend>

                                    <div className="table-responsive">
                                      <table className="table">
                                        <tbody><tr>
                                            <th>Updated On</th>
                                            <th>Status</th>
                                          </tr>

                                          {this.state.history_details.map((history, key) => (
                                            <tr key={key}>
                                                <td>{history.timestamps}</td>
                                                <td>{history.action}</td>
                                              </tr>
                                           ))}
                                        </tbody></table>
                                    </div>
                                    <form id="update_status" onSubmit={(e) => this.handleOrderHistory(e)}>
                                      <div className="form-group">
                                        <br/>
                                        <label className="col-sm-2 control-label" htmlFor="input-order-status">Order Status</label>
                                        <div className="col-sm-6">
                                            <select name="order_status_id" id="order_history_status" className="form-control">
                                                {this.state.status_details.map((status, key) => (

                                                    <option key={key} value={status.status_name}>{status.status_name}</option>
                                            ))}
                                                </select>


                                        </div>
                                        <div className="col-sm-3">
                                            <button type="submit" id="button-history" className="btn btn-block btn-primary">
                                                <i className="fa fa-plus-circle" /> Add History
                                            </button>
                                        </div>
                                      </div>
                                    </form>
                                  </fieldset>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                </div>
                
                <div className={'modal '+modalFade} id="add_delivery_modal" style={styles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                     <div className="modal-header">
                        <button type="button" className="close" onClick={this.openModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Add Delivery Date</h4>
                      </div> 
                      <form id="delivery_date_form" onSubmit={this.handleDateFormSubmit.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-md-12">
                                    <input type="date" className="form-control" id="delivery_date" required />
                              </div>
                          </div>
                          <br/>
                         </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.openModal}>Close</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                        </form>
                          </div>
                    </div>
                  </div>
                
                <div className={'modal '+tmodalFade} id="change_timeslot" style={tstyles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                     <div className="modal-header">
                        <button type="button" className="close" onClick={this.openSlotModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Change Time Slot</h4>
                      </div> 
                      <form id="timeslot_form" onSubmit={this.handleTimeslotFormSubmit.bind(this)}>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-md-12">
                                    <select className="form-control" id="timeslot_select" ref="timeslot_select" required>
                                    </select>
                              </div>
                          </div>
                          <br/>
                         </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.openSlotModal}>Close</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                        </form>
                          </div>
                    </div>
                  </div>
                
                <div className={'modal '+emodalFade} id="edit_modal"  style={estyles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close"  onClick={this.closeModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Edit {this.state.current_product}</h4>
                      </div>
                      <div className="modal-body">
                          <div className="row" id="show_options">
                          </div>
                          <br/>
                       </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.closeModal}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={this.updateCart}>Update Product</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={'modal '+amodalFade} id="add_modal"  style={astyles}>
                  <div className="modal-dialog" style={{width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close"  onClick={this.addModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Add Product</h4>
                      </div>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-xs-12">
                                  <table id="example3" className="table">
                                    <thead>
                                    <tr>
                                      <th>Image</th>
                                      <th>Details</th>
                                      <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.products.map((product, key) => (                                      
                                        <tr key={product.id}>
                                          <td>
                                            <img height="117px" alt="p_image" src={"/images/"+product.product_image}/>
                                          </td>
                                          <td id={'name'+product.id}>
                                            {product.name} ( {product.tamil_name} )
                                            <br/>
                                            <b>Price: ₹{product.price} for 1{product.quantity_type}</b>
                                            <br/>
                                            Category - {product.category_name}
                                            <br/>
                                            Brand - {product.brand_name}
                                            <br/>
                                            Home &amp; Kitchen - {product.home_and_kitchen_name}
                                          </td>
                                          <td>
                                              <button className="btn btn-success" onClick={() => this.openAddItemModal(product.id, product.name, product.quantity_type, product.min_quantity, product.max_quantity, product.quantity_increase_by, product.price, product.category_name, product.brand_name, product.home_and_kitchen_name)}>
                                                  <i className="fa fa-plus"></i> Add
                                              </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                  </table>
                              </div>
                          </div>
                          <br/>
                       </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.addModal}>Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={'modal '+imodalFade} id="item_modal"  style={istyles}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close"  onClick={this.itemOptionModal}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Add {this.state.current_product}</h4>
                      </div>
                      <div className="modal-body">
                          <div className="row" id="show_add_options">
                          </div>
                          <br/>
                       </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default pull-left" onClick={this.itemOptionModal}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={this.addProduct}>Add Product</button>
                      </div>
                    </div>
                  </div>
                </div>
            </React.Fragment>
        );
    }
}

class CustomerOrderDetails extends React.Component{

    
    constructor(props) {
        super();
        this.state = {
            id: props.match.params.token,
            name: props.match.params.name,
            orders: []
        }
        
        this.childKey = 0;    
    }
    
    componentDidMount() {
        document.title="Orders of "+this.state.name
        
        let formData = new FormData();
        formData.append('token', this.state.id)

        var obj=this
        
        axios({
            method: 'post',
            url: api_link+'CustomerOrdersFetch.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((data) => {
            obj.setState({ orders: data})
            $("script[src='js/dataTable.js']").remove();    
            const script = document.createElement("script");
            script.src = "/js/dataTable.js";
            script.async = true;
            document.body.appendChild(script);
         })
            
    }
    
    shouldComponentUpdate(nextProps,nextState){
          if(JSON.stringify(this.state.orders) === JSON.stringify(nextState.orders))
          {
                return true;
          }
          else 
          {
                if(this.state.refresh)
                {
                    $("script[src='js/dataTable.js']").remove();
                    const script = document.createElement("script");
                    script.src = "/js/dataTable.js";
                    script.async = true;
                    document.body.appendChild(script);
                    ++this.childKey
                }
                else
                {
                    this.setState({
                        refresh: true
                    })
                }
                return true;
          }
    }
    
    render()
    {
        return(
            <div className="content-wrapper">
                <section>
                    <div id="update_message" className="alert" style={{display: 'none'}}></div> 
                </section>
                <section className="content-header">
                    <h1>
                        Orders of {this.state.name}
                    </h1>
                </section>

                <section className="content">
                      <div className="box">
                          <div className="box-body table-responsive" key={this.childKey}>
                                <br/>
                                <table id="example1" className="table">
                                  <thead>
                                  <tr>
                                        <th>Order ID</th>
                                        <th>Total</th>
                                        <th>Date Added</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                  </tr>
                                  </thead>
                                  <tbody id="tData">
                                      {this.state.orders.map((order, key) => (
                                        <tr key={key}>
                                            <td>{order.order_id}</td>
                                            <td>{order.order_amount}</td>
                                            <td>{order.time_statmpts}</td>
                                            <td>{order.order_status}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <Link to={"/admin/view-order/"+order.order_id+"/"+this.state.name}>
                                                        <button class="btn btn-primary">
                                                            <i class="fa fa-eye"></i>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                          </tr>
                                        ))}
                                  </tbody>
                                  <tfoot></tfoot>
                                </table>                    
                          </div>
                        </div>
                 </section>
            </div>
        );
    }
}


export {
    CustomerOrderDetails,
    SingleOrderDetails,
};