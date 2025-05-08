let env             =   process.env.REACT_APP_ENV || 'development';
let ApiUrl          =   './api.php?';
//let ApiUrl          =   './data.php?';

let path            =   {};
if(env === 'production') {
} else {
}
const Config        =   {
    Title       :   'Ecommerce',
    Pagination  : {
        itemsPerPage : 100
    },
    ApiUrl: ApiUrl,
    path: {...path},
    RazorPay: {
        key : '',
        currency: 'INR',
        description: '',
        image: ''
    }
}
export default Config;