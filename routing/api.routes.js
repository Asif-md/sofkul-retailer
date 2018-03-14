/*
 * API endpoints are defined here
 * all routes start with /api
 */
var express_1 = require("express");
var customer_controller_1 = require("../controllers/customer.controller");
var product_controller_1 = require("../controllers/product.controller");
var area_controller_1 = require("../controllers/area.controller");
var invoice_controller_1 = require("../controllers/invoice.controller");
var payDateCounter_controller_1 = require("../controllers/payDateCounter.controller");
var report_controller_1 = require("../controllers/report.controller");
var router = express_1.Router();
var multer = require('multer');
var upload = multer();
var type = upload.single('csvFile');
router.get('/', function (req, res) {
    res.send("Welcome to API routes");
});
//customer file upload
router.post('/customer/create', function (req, res) {
    customer_controller_1.CustomerController.createNewCustomer(res, req.body);
});
//all customers
router.get('/customer/all/page=:paginator', function (req, res) {
    customer_controller_1.CustomerController.getAllCustomers(res, req.params.paginator);
});
//set active/inactive status
router.put('/customer/status_change', function (req, res) {
    customer_controller_1.CustomerController.changeStatus(res, req.body);
});
//get details of specific customer by id
router.get('/customer/details/:id', function (req, res) {
    customer_controller_1.CustomerController.getCustomerDetails(res, req.params.id);
});
//update customer details
router.put('/customer/details/update', function (req, res) {
    customer_controller_1.CustomerController.updateCustomerDetails(res, req.body);
});
// create new product
router.post('/product/create', function (req, res) {
    product_controller_1.ProductController.create(res, req.body);
});
// get all product
router.get('/product/all', function (req, res) {
    product_controller_1.ProductController.getAllProduct(res);
});
//get product by id
router.get('/product/id/:id', function (req, res) {
    product_controller_1.ProductController.getProductById(res, req.params.id);
});
//set active/inactive status
router.put('/product/status_change', function (req, res) {
    product_controller_1.ProductController.changeStatus(res, req.body);
});
//update product
router.put('/product/update', function (req, res) {
    product_controller_1.ProductController.update(res, req.body);
});
//create a new area
router.post('/area/create', function (req, res) {
    area_controller_1.AreaController.create(res, req.body);
});
//get all areas
router.get('/area/all', function (req, res) {
    area_controller_1.AreaController.getAllArea(res);
});
//set active/inactive status
router.put('/area/status_change', function (req, res) {
    area_controller_1.AreaController.changeStatus(res, req.body);
});
//get area by id
router.get('/area/id/:id', function (req, res) {
    area_controller_1.AreaController.getAreaById(res, req.params.id);
});
//update area
router.put('/area/update', function (req, res) {
    area_controller_1.AreaController.update(res, req.body);
});
//search all customers data by username
router.post('/customer/search/username', function (req, res) {
    customer_controller_1.CustomerController.searchByUsername(res, req.body);
});
//search all customers data by mobile number
router.post('/customer/search/mobile_number', function (req, res) {
    customer_controller_1.CustomerController.searchByMobileNumber(res, req.body);
});
//search all customers data by area
router.post('/customer/search/area', function (req, res) {
    customer_controller_1.CustomerController.searchByArea(res, req.body);
});
//search all customers data by area id
router.post('/customer/search/customerByArea', function (req, res) {
    customer_controller_1.CustomerController.customerByArea(res, req.body);
});
router.get('/customer/id/username=:username', function (req, res) {
    customer_controller_1.CustomerController.getIdByUsername(res, req.params.username);
});
//get recent invoices (this month)
router.get('/invoice/recent/customers', function (req, res) {
    invoice_controller_1.InvoiceController.getRecentInvoiceCustomers(res);
});
//search all products data by name
router.post('/product/search/name', function (req, res) {
    product_controller_1.ProductController.searchByName(res, req.body);
});
// post invoice
router.post('/invoice/create', function (req, res) {
    invoice_controller_1.InvoiceController.storeInvoice(res, req.body);
});
// generate invoice as PDF
router.post('/invoice/generate/pdf', function (req, res) {
    invoice_controller_1.InvoiceController.generateInvoice(res, req.body);
});
// get invoice by id
router.get('/invoice/:type/id/:id', function (req, res) {
    invoice_controller_1.InvoiceController.getInvoiceById(res, req.params.type, req.params.id);
});
//search all customers data by username
router.post('/invoice/search/username', function (req, res) {
    invoice_controller_1.InvoiceController.searchByUsername(res, req.body);
});
// insert recent invoice into DB
router.post('/invoice/recent/save', function (req, res) {
    invoice_controller_1.InvoiceController.saveRecentInvoice(res, req.body);
});
//drop all recent invoices
router.get('/invoice/drop/recent/all', function (req, res) {
    invoice_controller_1.InvoiceController.dropRecentInvoiceAll(res);
});
//check if recent invoices exists
router.get('/invoice/recent_invoice/exists', function (req, res) {
    invoice_controller_1.InvoiceController.checkRecentInvoiceExists(res);
});
// get invoice from db
router.get('/invoice/recent_invoice_db/paginator=:paginator', function (req, res) {
    invoice_controller_1.InvoiceController.getRecentInvoiceDB(res, req.params.paginator);
});
// clean and nuke recent invoices
router.get('/invoice/clean_invoice', function (req, res) {
    invoice_controller_1.InvoiceController.cleanInvoice(res);
});
router.put('/invoice/change_status', function (req, res) {
    invoice_controller_1.InvoiceController.changeStatus(res, req.body);
});
router.post('/invoice/product_list/total', function (req, res) {
    product_controller_1.ProductController.getTotal(res, req.body);
});
router.get('/invoice/recent/build_and_save', function (req, res) {
    invoice_controller_1.InvoiceController.buildAndSaveRecentInvoice(res);
});

router.post('/invoice/recent/partial_pay/save', function (req, res) {
    invoice_controller_1.InvoiceController.savePartialPay(res, req.body);
});
router.post('/invoice/pre_generate_update', function (req, res) {
    invoice_controller_1.InvoiceController.preGenerateUpdate(res, req.body);
});

///
router.post('/invoice/delete', function (req, res) {
    invoice_controller_1.InvoiceController.deleteInvoice(res, req.body);
});
// get all invoices
router.get('/invoice/all/page=:paginator', function (req, res) {
    invoice_controller_1.InvoiceController.getAllInvoices(res, req.params.paginator);
});
// create new invoice
router.post('/invoice/create/new', function (req, res) {
    invoice_controller_1.InvoiceController.createNewInvoice(res, req.body);
});
//pay date coounter clean
router.get('/home/pay-date-counter/clean-build', function (req, res) {
    payDateCounter_controller_1.PayDateCounterController.checkAndCleanPayDateCounter(res);
});
//set pay date counter
router.post('/invoice/set_paid_date_counter', function (req, res) {
    payDateCounter_controller_1.PayDateCounterController.setPayDateCounter(res, req.body);
});
// get pay date counter
router.get('/invoice/get_paid_date_counter', function (req, res) {
    payDateCounter_controller_1.PayDateCounterController.getPayDateCounter(res);
});
// get all invoice count
router.get('/invoice/all_invoice_count', function (req, res) {
    invoice_controller_1.InvoiceController.getAllInvoiceCount(res);
});
// save auto invoive
router.post('/invoice/save-auto-invoice', function (req, res) {
    invoice_controller_1.InvoiceController.saveAutoInvoice(res, req);
});
// global invoice search by customer
router.get('/invoice/global-search-by-customer/:query', function (req, res) {
    invoice_controller_1.InvoiceController.globalSearchByCustomer(res, req.params.query);
});
//get invoice by customer id
router.get('/invoice/by-customer-id/:id', function (req, res) {
    invoice_controller_1.InvoiceController.getInvoiceByCustomerId(res, req.params.id);
});
// remove Invoice
router.post('/invoice/remove-invoice', function (req, res) {
    invoice_controller_1.InvoiceController.removeInvoice(res, req.body);
});
//get customer by area
router.get('/report/customer_by_area/:id', function (req, res) {
    report_controller_1.ReportController.getCustomerByArea(res, req.params.id);
});
// generate report for a list of customers
router.get('/report/report_for_customers/:id', function (req, res) {
    report_controller_1.ReportController.getReportForCustomers(res, req.params.id);
});
// check status change for generate invoice monthly
router.post('/customer/check_change_generate_invoice_monthly', function (req, res) {
    customer_controller_1.CustomerController.setCheckGenerateInvoice(res, req.body);
});
router.post('/upload-file', function (req, res) {
    customer_controller_1.CustomerController.uploadFile(res, req.body);
});
router.post('/customer/upload-file-contents', type, function (req, res, next) {
    customer_controller_1.CustomerController.getFileContents(res, req);
});
router.get('/customer/customer-count', function (req, res) {
    customer_controller_1.CustomerController.getTotalCustomerCount(res);
});
router.get('/customer/generate-auto-invoice/:id', function (req, res) {
    customer_controller_1.CustomerController.generateAutoInvoice(res, req.params.id);
});
router.get('/customer/global-search/:query', function (req, res) {
    customer_controller_1.CustomerController.searchAllCustomer(res, req.params.query);
});
router.get('/customer/get-auto-generate-list', function (req, res) {
    customer_controller_1.CustomerController.getAutoGenerateCustomerList(res);
});



exports.ApiRoute = router;
