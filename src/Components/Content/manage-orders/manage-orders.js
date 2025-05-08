import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import Modal from 'react-native-modal';
import {View, Container, Content, Text, Icon, Picker,DatePicker, Button, Fab, Form, Input, Item} from 'native-base';
import DrawerWrapper from '../../Home/drawerWrapper';
import {callApi} from '../../../Helper/api';
import Loading from '../../Common/Loading';

export default function Orders(props){
    let params  =   {...props.params};
    let [order, setOrder]     =   useState({});
	let [dataList, setList]	=	useState([]);
    let [isLoading, setIsLoading]       =   useState(false);
	let [status, setStatus]	=	useState([]);
    let [date, setDate]	=	useState([]);
    let defaultSearchData	=	{ pageno: 1, name: '', mobile: '', email: '', orderNo: '', type: params.type || '', status: params.status || '', payment_status: params.payment_status || '', fromDate: '', toDate: '' };
    let [searchData, setSearchData]	=	useState(defaultSearchData);
    
    const [orderFilterModal, setOrderFilterModal] = useState(false);
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;

    const toggleModal = () => {
        setOrderFilterModal(!orderFilterModal);
    };

    useEffect(() => {
        getOrder();
    }, [])

    const search	=	(e)	=>	{
		e.preventDefault();
        getOrder(searchData);
        toggleModal();
	}

    const onChangeHandle  =   (fldName, val)  =>  {
        setSearchData({
			...searchData,                
			[fldName]     :   val
        })
	}

    const getOrder = async () => {
        try {
            setIsLoading(true);
            const res = await callApi('POST', `act=orders&section=getOrderHistory`, searchData);
            if (res.data.error) {
                console.log(res.data.error);
                setIsLoading(false);
            }
            else {
                let result = res.data.result || {};
                setOrder(result || {});
                setList(result.list || []);
                setIsLoading(false);
            }
        } catch(e) {
            console.log(e);
            setIsLoading(false);
        }
    }
    return <DrawerWrapper
        type='back'
        title='Order'
        navigation={props.navigation}
        renderContent={() => (                    
            <Container>
                <Modal isVisible={orderFilterModal} deviceWidth={deviceWidth} deviceHeight={deviceHeight}>
                    <View style={{flex: 1, left:-13, width:'108%', bottom:-20, backgroundColor:'#fff', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                        <View style={{ alignItems:'center', borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection:'row'}}>
                            <Icon onPress={toggleModal} style={{padding:6,paddingLeft:10}} name="chevron-back-outline" />
                            <Text style={{fontSize:18,marginTop:-3}}>Order Search</Text>
                        </View>
                        <View style={{padding:10, paddingBottom:50}}>
                            <ScrollView>
                                <Form style={{ paddingBottom:30}}>
                                    <Item regular style={styles.inputRow}>
                                        <Input style={[styles.txtInput]} value={searchData.orderNo} name="orderNo" placeholder="Order No." onChangeText={text => onChangeHandle('orderNo', text)} />
                                    </Item>
                                    <Item regular style={styles.inputRow}>
                                        <Input style={[styles.txtInput]} value={searchData.name} name="name" placeholder="Name" onChangeText={text => onChangeHandle('name', text)} />
                                    </Item>
                                    <Item regular style={styles.inputRow}>
                                        <Input style={[styles.txtInput]} value={searchData.mobile} name="mobile" placeholder="Mobile" onChangeText={text => onChangeHandle('mobile', text)} />
                                    </Item>
                                    <Item regular style={styles.inputRow}>
                                        <Input style={[styles.txtInput]} value={searchData.email} name="email" placeholder="Email" onChangeText={text => onChangeHandle('email', text)} />
                                    </Item>
                                    <View style={styles.inputRow}>
                                        <Picker
                                            note
                                            mode="dropdown"
                                            style={styles.txtInput}
                                            name="type"
                                            selectedValue={searchData.type}
                                            onValueChange={(text) => onChangeHandle('type', text)}
                                            >
                                            <Picker.Item label="Group Order" value="Group Order" />
                                            <Picker.Item label="Order" value="Order" />
                                        </Picker>
                                    </View>
                                    <View style={styles.inputRow}>
                                        <Picker
                                            note
                                            mode="dropdown"
                                            style={styles.txtInput}
                                            name="status"
                                            selectedValue={searchData.status}
                                            onValueChange={(text) => onChangeHandle('status', text)}
                                            >
                                            <Picker.Item label="Shipping Status" value="" />
                                            <Picker.Item label="New" value="New" />
                                            <Picker.Item label="Shipped" value="Shipped" />
                                            <Picker.Item label="Cancelled" value="Cancelled" />
                                            <Picker.Item label="Returned" value="Returned" />
                                            <Picker.Item label="Refunded" value="Refunded" />
                                            <Picker.Item label="Delivered" value="Delivered" />
                                        </Picker>
                                    </View>
                                    <View style={styles.inputRow}>
                                        <Picker
                                            note
                                            mode="dropdown"
                                            style={styles.txtInput}
                                            name="payment_status"
                                            selectedValue={searchData.payment_status}
                                            onValueChange={(text) => onChangeHandle('payment_status', text)}
                                            >
                                            <Picker.Item label="Payment Status" value="" />
                                            <Picker.Item label="Paid" value="Paid" />
                                            <Picker.Item label="Unpaid" value="Unpaid" />
                                        </Picker>
                                    </View>
                                    <Button onPress={search} type="submit" style={styles.defaultBtn}>
                                        <Text style={styles.defaultBtnTxt}>Search</Text>
                                    </Button>
                                </Form>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                {
                (!isLoading) ?
                    <Content style={styles.mainContainer}>
                        <View style={[styles.tableBody]}>
                            <View style={[styles.thHead]}>
                                <Text style={[styles.tableTh,{width:'30%', borderRightWidth:1}]}>Order</Text>
                                <Text style={[styles.tableTh,{width:'30%', borderRightWidth:1}]}>Customer</Text>
                                <Text style={[styles.tableTh,{width:'20%', borderRightWidth:1}]}>Status</Text>
                                <Text style={[styles.tableTh,{width:'20%'}]}>Amount</Text>
                            </View>
                            {
                                (dataList.length > 0) ?
                                    <>
                                    {
                                        (dataList || []).map((item, k) => {
                                        return (
                                            <TouchableOpacity key={k} onPress={() => props.navigation.push('OrderDetails', {id: item.orderId, type : item.type})}>
                                                <View style={[styles.tdBody]}>
                                                    <View style={[styles.tableTd,{width:'30%', borderRightWidth:1}]}>
                                                        <Text style={[styles.normTxt]}>{item.type}</Text>
                                                        <Text style={[styles.normTxt,styles.proCode,{fontStyle:'italic', marginTop:3}]}>{item.orderNo}</Text>
                                                    </View>
                                                    <View style={[styles.tableTd,{width:'30%', borderRightWidth:1}]}>
                                                        <Text style={[styles.normTxt]}>{item.shipping_name}</Text>
                                                        <Text style={[styles.normTxt,styles.proCode,{fontStyle:'italic', marginTop:3}]}>{item.shipping_mobile}</Text>
                                                    </View>
                                                    <View style={[styles.tableTd,{width:'20%'}]}>
                                                        <Text style={[styles.normTxt,styles.proCode, (item.status === 'Cancelled') ? styles.inactive : styles.active]}>
                                                            {item.status}
                                                        </Text>
                                                        <Text style={[(item.paymentStatus === 'Paid') ? styles.active : styles.inactive, styles.normTxt,styles.proCode,{fontStyle:'italic', marginTop:3}]}>
                                                            {item.paymentStatus}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.tableTd,{width:'20%', borderRightWidth:1}]}>
                                                        <Text style={[styles.normTxt,styles.proCode, {textAlign:'right'}]}>{item.totalAmount}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            )
                                        })
                                    }
                                    <View style={styles.normCard}>                        
                                        <View style={[styles.tdBody,{borderBottomWidth:0, justifyContent:'space-between'}]}>
                                            <View style={[styles.tableTd,{borderRightWidth:1}]}>
                                                <Text style={{fontWeight:'600'}}>Total</Text>
                                            </View>
                                            <View style={[styles.tableTd]}>
                                                <Text style={{fontWeight:'600', textAlign:'right'}}>{order.total}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    </> : 
                                <Text style={{fontSize:11, textAlign:'center', padding:5}}>No Records</Text>
                            }
                        </View>
                    </Content>  
                : <Loading/>
                }
                        
                <Fab 
                    onPress={toggleModal}
                    navigation={props.navigation}
                    direction="up"
                    style={{backgroundColor: '#2e86c9',bottom:50}}
                    position="bottomRight">
                    <Icon name="funnel-outline" />
                </Fab>
            </Container>
        )}
    />
}
const styles = StyleSheet.create({    
    mainContainer : {margin:5},
    normCard : {backgroundColor:'#fff', marginBottom:7, borderRadius:10, padding:7},
    tableBody : {backgroundColor:'#fff',marginBottom:7},
    thHead : {backgroundColor:'#d9e5ea', flexDirection:'row', width:'100%', justifyContent:'space-around'},
    tableTh : {color:'#000',fontSize:14, fontWeight:'600', padding:5,paddingBottom:7, borderColor:'#fff', width:'33.33%', textAlign:'center'},
    tdBody : {flexDirection:'row', borderColor:'#ececec', borderBottomWidth:1, width:'100%', justifyContent:'space-around', flexWrap:'wrap'},
    tableTd : {padding:2,fontFamily: 'Lato',fontSize:12, opacity:0.8, borderColor:'#ececec', width:'33.33%', textAlign:'center'},
    normTxt:{fontSize:13},
    proCode:{fontSize:11},
    qty:{borderWidth:1, borderColor:'#ccc', textAlign:'center', padding:3, paddingTop:5, height:30, fontSize:18},
    qtyCount:{borderLeftWidth:0, borderRightWidth:0, width:35, fontSize:14,},
    qtyAdd:{paddingHorizontal:8, borderTopRightRadius:8, borderBottomRightRadius:8},
    qtyRemove:{paddingHorizontal:8, borderTopLeftRadius:8, borderBottomLeftRadius:8},
    dropdown: {backgroundColor:'#fff', width:'100%', fontSize:13, height:58, borderRadius:8,marginBottom:5},
    defaultBtn: {width:'60%', marginLeft:'auto', marginRight:'auto', backgroundColor: '#e82e29',marginBottom: 8,borderRadius: 20,paddingTop: 5,height: 40},
    btnTxt : {textTransform:'capitalize', width:'100%',textAlign: 'center',fontSize: 15, fontWeight:'100',color: '#fff',},
    inactive : {color:'red'},
    active : {color:'green'},
    txtRow : {marginBottom:15},
    inputRow : {borderWidth:1, borderColor:'#ccc', height:45, marginBottom:5, borderRadius:7},
    txtLabel: {fontSize: 13,opacity:0.5,color: '#606060', marginLeft:-10},
    txtInput: {fontSize: 14, padding:5, color: '#606060', marginLeft:0},
    defaultBtn : {width:'100%', backgroundColor: '#d60022', borderRadius: 20, height:40, marginTop:8, marginBottom:10},
    defaultBtnTxt : {width:'100%',fontFamily: "OpensansSemiBold", fontSize: 16,color: '#fff',textTransform: 'capitalize', textAlign:'center'},
})