import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import {View, Container, Content, Text, Icon} from 'native-base';
import DrawerWrapper from '../../Home/drawerWrapper';
import Loading from '../../Common/Loading';
import {callApi} from '../../../Helper/api';

export default function Profile(props){
    let [userData, setUserData]             =   useState({});
    let [isLoading, setIsLoading]           =   useState(false);

    useEffect(()   =>   {
        getProfileDetails();
    }, [])
    
    const getProfileDetails = async () => {
        try {
            setIsLoading(true);
            const res = await callApi('GET', `act=profile&section=getDetails`);
            if (res.data.error) {
                console.log(res.data.error);
                setIsLoading(false);
            }
            else {
                let result = res.data.result || {};
                setUserData(result.details || {})
                setIsLoading(false);
            }
        } catch(e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    return <DrawerWrapper
        type='back'
        title='Profile'
        navigation={props.navigation}
        renderContent={() => (                    
            <Container>
                {
                (!isLoading) ?
                    <Content>
                        <View style={styles.profileBodyWrap}>
                            <View style={{height:20}}>
                            </View>
                            <View style={styles.profileWrap}>
                                <View style={styles.tabBody}>
                                    <View style={styles.tabContent}>
                                        <View style={styles.tabBox}>
                                            <Text style={styles.heading}>Basic Details</Text>
                                            <Text style={styles.subTxt}>Category : {userData.categoryName}</Text>
                                            <Text style={styles.subTxt}>Name : {userData.name}</Text>
                                            <Text style={styles.subTxt}>Code : {userData.vendor_code}</Text>
                                            <Text style={styles.subTxt}>Business Name : {userData.businessname}</Text>
                                            <Text style={styles.subTxt}>GST No. : {userData.gstNumber}</Text>
                                            <Text style={styles.subTxt}>Mobile : {userData.mobile}</Text>
                                            <Text style={styles.subTxt}>Alt. Phone : {userData.altphone}</Text>
                                            <Text style={styles.subTxt}>Email : {userData.email}</Text>
                                        </View>
                                        <View style={styles.tabBox}>
                                            <Text style={styles.heading}>Location</Text>
                                            <Text style={styles.subTxt}>Address : {userData.full_address}</Text>
                                            <Text style={styles.subTxt}>State : {userData.stateName}</Text>
                                            <Text style={styles.subTxt}>City : {userData.cityName}</Text>
                                            <Text style={styles.subTxt}>Pincode : {userData.pincodeNo}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Content>
                : <Loading/>
                }
            </Container>
        )}
    />
}
const styles = StyleSheet.create({    
    profileBodyWrap : {backgroundColor:'#2e86c9'},
    profileWrap : { backgroundColor:'#fff', width: '100%',borderTopLeftRadius:20, borderTopEndRadius:20, padding:8, paddingTop:15 },
    profileImg : {width:150, height:150, backgroundColor:'#ddd', marginLeft:'auto', marginRight:'auto', marginTop:-50, marginBottom:5, borderWidth:5, borderColor:'#fff', resizeMode: 'cover', borderRadius:100},
    profileName : {fontFamily: "AvenirBook", fontSize:25, fontWeight:'600', color:'#d60022', marginBottom:5},
    tabBox : {padding:8, marginTop:5, borderColor:'#ccc', borderWidth:1, borderRadius:8 },
    heading : { fontFamily: "OpensansSemiBold", color:'#000', fontSize:14, marginBottom:3, opacity:0.9},
    subTxt : { fontFamily: "AvenirBook", color:'#2d2d2d', fontSize:14, lineHeight:20, opacity:0.6},
    strong : { fontFamily: "OpensansSemiBold", fontSize:14, lineHeight:20},
    editIconWrap : {backgroundColor:'#fff', elevation:8, marginTop: -35, borderRadius:20, padding:10, position:'absolute', right:20},
    editIcon : {color:'#2e86c9', fontSize:22},
    tabBar : {flexDirection:'row', borderBottomWidth:2, borderColor:'#2e86c9'},
    tabName : {backgroundColor:'#f6fafd', width:'33%', borderWidth:1, borderColor:'#fff', textAlign:'center', padding:10, borderTopLeftRadius:10, borderTopRightRadius:10},
    tabActive : {backgroundColor: '#2e86c9', color:'#fff'},
    tabBlankBox : {minHeight:200, borderRadius:8, backgroundColor:'rgba(0,0,0,0.02)', marginTop:5 },
    noContentTxt : {fontFamily: "OpensansLight", fontSize:18, opacity:0.5},
    noPageIcon : {opacity:0.5},
    ScrollableTab : {backgroundColor:'red'},
})