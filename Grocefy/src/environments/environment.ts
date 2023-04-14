import { HttpHeaders } from "@angular/common/http";

export const environment = {
    baseUrl:'https://7a12-117-217-127-105.ngrok-free.app/api/v1/',
    userLogin:'customer/login',
    userSignUp:'customer/register',
    customerDetais:'customer/customer-details',


    addCustomerAddress:'customer/add-customer-address',
    deleteCustomerAddres:'customer/delete-customer-address',
    getCustomerAllOrder:'customer/get-customer-all-orders',
    editCustomer:'customer/update-customer',
    changePassword:'customer/changePassword',
    editAddress:'customer/update-customer-address',
    getAllProducts:'product/get-all-products',


    getProductById:'product/get-product-by-id',
    addProduct:'product/add-product',
    putProduct:'product/update-product',
    getProductByCategoryId:'product/get-product-by-category-id',

    getAllCategory:'category/get-all-categories',
    addCategory:'category/add-category',
    updateCategory:'category/update-category',

    addOrder:'order/add-order',
    getOrderById:'order/get-order-by-id',

    adminLogin:'admin/login',
    adminRegister:'admin/register',
    getAdminDeatils:'admin/admin-details',

    header:{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})},
    encryptionId:'encryption'
};
