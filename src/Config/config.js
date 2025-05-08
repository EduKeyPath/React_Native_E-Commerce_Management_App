let env             =   process.env.REACT_APP_ENV || 'development';
let ApiUrl          =   '.../api.php?';
//let ApiUrl          =   '.../api.php?';

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
    path: {...path}
}
export default Config;