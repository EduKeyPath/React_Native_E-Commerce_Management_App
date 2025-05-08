import axios from "axios";
import Config from '../Config';
import AsyncStorage from '@react-native-community/async-storage';
import { getUniqueId, getManufacturer } from 'react-native-device-info';

let baseAPIUrl          =   Config.ApiUrl;
export async function callApi(...params) {
    let UUID            =   getUniqueId();
    let method          =   params[0];
    let url             =   params[1] || '';
    let postData        =   params[2] || {};
    let userDataStr = await AsyncStorage.getItem('user');
    let userData    =   JSON.parse(userDataStr) || {};
    let reqHeaders      =   {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                'Access-Control-Allow-Origin': '*'
                            };
    reqHeaders.Uuid     =   UUID;
    if(!!userData.token) {
        reqHeaders.Token    =   "Bearer " + userData.token;
    }
    let instance = axios.create({
        headers: reqHeaders
    });
    console.log('UUID : ', reqHeaders)

    let result          =   '';
    let bodydata        =   {};
    switch(method) {
        case'POST': 
            bodydata = JSON.stringify(
                {        
                    jsonrpc:2,
                    ver:1,
                    platform:"web",
                    brw:{
                        os:"Win32",
                        name:"Chrome 67"
                    },
                    params:postData
                });
                //console.log(baseAPIUrl+url, bodydata)
            result      =   instance.post(baseAPIUrl+url, bodydata);
        break;

        case'PUT': 
            bodydata = JSON.stringify(
                {        
                    jsonrpc:2,
                    ver:1,
                    platform:"web",
                    brw:{
                        os:"Win32",
                        name:"Chrome 67"
                    },
                    params:postData
                });
            result      =   instance.put(baseAPIUrl+url, bodydata);
        break;

        case'DELETE': 
            bodydata = JSON.stringify(
                {        
                    jsonrpc:2,
                    ver:1,
                    platform:"web",
                    brw:{
                        os:"Win32",
                        name:"Chrome 67"
                    },
                    params:postData
                });
            result      =   instance.delete(baseAPIUrl+url, bodydata);
        break;
        
        case'GET':
            result      =   instance.get(baseAPIUrl+url);
        break;

        default:
            result      =   instance.get(baseAPIUrl+url);
        break;
    }
    return result;
}

export async function callApiFileUpload(...params) {
    let UUID            =   getUniqueId();
    let method          =   params[0];
    let url             =   params[1] || '';
    let postData        =   params[2] || {};
    //let userData        =   JSON.parse(SyncStorage.get('user') || '{}');
    let userDataStr = await AsyncStorage.getItem('user');
    let userData    =   JSON.parse(userDataStr) || {};
    let reqHeaders      =   {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                'Access-Control-Allow-Origin': '*',
                                'content-type': 'multipart/form-data'
                            };
    reqHeaders.UUID     =   UUID;
    if(!!userData.token) {
        reqHeaders.Token    =   "Bearer " + userData.token;
    }
    
    let instance = axios.create({
        headers: reqHeaders
    });
    let result          =   '';
    let bodydata        =   {};
    bodydata            =   postData
    result      =   instance.post(baseAPIUrl+url, bodydata);
    return result;
}