import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
//import {Container, Content, View, Text, Icon } from 'native-base';
import {View, Container, Content, Text } from 'native-base';
import DrawerWrapper from './drawerWrapper';
import {callApi} from '../../Helper/api';
import Loading from '../Common/Loading';
import AsyncStorage from '@react-native-community/async-storage'

function Home(props) {
    let [isLoading, setIsLoading]   =   useState(true);
    let [dashboardData, setDashboardData]     =   useState([]);
    useEffect(() => {
        getDashboardData();
    }, [])

    const getDashboardData = async () => {
        try {
            setIsLoading(true);
            const res = await callApi('GET', `act=dashboard&section=getDashboardData`);
            if (res.data.error) {
                console.log(res.data.error);
                setIsLoading(false);
            }
            else {
                let result = res.data.result || {};
                console.log(result)
                setDashboardData(result.details || {});
                setIsLoading(false);
            }
        } catch(e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    const renderHome = ()  => {
        return (
            <Container>
                {
                    (!isLoading) ?
                    <Content style={styles.mainContainer}>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{backgroundColor:'#fddddd'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {status: 'New'})}>
                                    <Text style={styles.counter}>{dashboardData.order.pending}</Text>
                                    <Text style={styles.subTxt}>New Order</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.cardBox,{backgroundColor:'#fbffde'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {status: 'Cancelled'})}>
                                    <Text style={styles.counter}>{dashboardData.order.cancelled}</Text>
                                    <Text style={styles.subTxt}>Cancelled Order</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.cardBox,{backgroundColor:'#deffe8'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {status: 'Shipped'})}>
                                    <Text style={styles.counter}>{dashboardData.order.shipped}</Text>
                                    <Text style={styles.subTxt}>Shipped Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{backgroundColor:'#e4f5ff'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {status: 'Delivered'})}>
                                    <Text style={styles.counter}>{dashboardData.order.delivered}</Text>
                                    <Text style={styles.subTxt}>Deliverd Order</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.cardBox,{backgroundColor:'#eee4ff'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {status: 'Returned'})}>
                                    <Text style={styles.counter}>{dashboardData.order.returned}</Text>
                                    <Text style={styles.subTxt}>Returned Order</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.cardBox,{backgroundColor:'#ffe4f5'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {status: 'Refunded'})}>
                                    <Text style={styles.counter}>{dashboardData.order.refunded}</Text>
                                    <Text style={styles.subTxt}>Refunded Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{width:'100%',backgroundColor:'#ffede4'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders')}>
                                    <Text style={styles.counter}>{(dashboardData.order.amount + dashboardData.bulkorder.amount).toFixed(2)}</Text>
                                    <Text style={styles.subTxt}>Order Amount</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', justifyContent:'space-between', borderTopWidth:2, borderColor:'#fff', marginTop:3}}>
                                    <TouchableOpacity onPress={() => props.navigation.push('Orders', {payment_status: 'Paid'})}>
                                        <Text style={styles.subTxt}>Paid: <Text style={styles.strong}>{(dashboardData.bulkorder.paidAmount + dashboardData.order.paidAmount).toFixed(2)}</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.push('Orders', {payment_status: 'Unpaid'})}>
                                        <Text style={styles.subTxt}>Unpaid: <Text style={styles.strong}>{(dashboardData.bulkorder.unpaidAmount + dashboardData.order.unpaidAmount).toFixed(2)}</Text></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{width:'100%',backgroundColor:'#ffe4fd'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Order'})}>
                                    <Text style={styles.counter}>{(dashboardData.order.amount).toFixed(2)}</Text>
                                    <Text style={styles.subTxt}>Normal Order Amount</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', justifyContent:'space-between', borderTopWidth:2, borderColor:'#fff', marginTop:3}}>
                                    <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Order', payment_status: 'Paid'})}>
                                        <Text style={styles.subTxt}>Paid: <Text style={styles.strong}>{(dashboardData.order.paidAmount).toFixed(2)}</Text></Text>
                                    </TouchableOpacity>                                        
                                    <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Order', payment_status: 'Unpaid'})}>
                                        <Text style={styles.subTxt}>Unpaid: <Text style={styles.strong}>{(dashboardData.order.unpaidAmount).toFixed(2)}</Text></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{width:'100%',backgroundColor:'#ffe4e6'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Group Order'})}>
                                    <Text style={styles.counter}>{(dashboardData.bulkorder.amount).toFixed(2)}</Text>
                                    <Text style={styles.subTxt}>Bulk Order Amount</Text>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', borderTopWidth:2, borderColor:'#fff', marginTop:3}}>                  
                                        <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Group Order', payment_status: 'Paid'})}>
                                            <Text style={styles.subTxt}>Paid: <Text style={styles.strong}>{(dashboardData.bulkorder.paidAmount).toFixed(2)}</Text></Text>
                                        </TouchableOpacity>                  
                                        <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Group Order', payment_status: 'Unpaid'})}>
                                            <Text style={styles.subTxt}>Unpaid: <Text style={styles.strong}>{(dashboardData.bulkorder.unpaidAmount).toFixed(2)}</Text></Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{width:'100%',backgroundColor:'#e4ebff'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Orders')}>
                                    <Text style={styles.counter}>{dashboardData.order.total + dashboardData.bulkorder.total}</Text>
                                    <Text style={styles.subTxt}>Total Order</Text>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', borderTopWidth:2, borderColor:'#fff', marginTop:3}}>
                                        <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Order'})}>
                                            <Text style={styles.subTxt}>Normal Order: <Text style={styles.strong}>{dashboardData.order.total}</Text></Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.navigation.push('Orders', {type: 'Group Order'})}>
                                            <Text style={styles.subTxt}>Bulk Order: <Text style={styles.strong}>{dashboardData.bulkorder.total}</Text></Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{width:'100%',backgroundColor:'#e4fff3'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('Products')}>
                                    <Text style={styles.counter}>{dashboardData.product.total}</Text>
                                    <Text style={styles.subTxt}>Products</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', justifyContent:'space-between', borderTopWidth:2, borderColor:'#fff', marginTop:3}}>
                                    <TouchableOpacity onPress={() => props.navigation.push('Products', {status: 'A'})}>
                                        <Text style={styles.subTxt}>Active: <Text style={styles.strong}>{dashboardData.product.active}</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.push('Products', {status: 'I'})}>
                                        <Text style={styles.subTxt}>Inactive: <Text style={styles.strong}>{dashboardData.product.inactive}</Text></Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardRow}>
                            <View style={[styles.cardBox,{width:'100%',backgroundColor:'#fbffe4'}]}>
                                <TouchableOpacity onPress={() => props.navigation.push('GroupProducts')}>
                                    <Text style={styles.counter}>{dashboardData.bulkproduct.total}</Text>
                                    <Text style={styles.subTxt}>Bulk Products</Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', justifyContent:'space-between', borderTopWidth:2, borderColor:'#fff', marginTop:3}}>
                                    <TouchableOpacity onPress={() => props.navigation.push('GroupProducts', {status: 'A'})}>
                                        <Text style={styles.subTxt}>Active: <Text style={styles.strong}>{dashboardData.bulkproduct.active}</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.push('GroupProducts', {status: 'I'})}>
                                        <Text style={styles.subTxt}>Inactive: <Text style={styles.strong}>{dashboardData.bulkproduct.inactive}</Text></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Content>
                    : <Loading/>
                }                
            </Container>
        )
    }
    
    return (
        <DrawerWrapper title='Dashboard' renderContent={renderHome} navigation={props.navigation}/>
    )
}

export default Home;
const drawerStyles = {
  drawer: { width:'100%',shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3}
}

const styles = StyleSheet.create({
    mainContainer : {margin:5},
    cardRow : {flexDirection:'row', marginBottom:3, justifyContent:'space-between'},
    cardBox : {width:'32.5%', backgroundColor:'#f1f1f1', padding:8, paddingVertical:10, borderRadius:8},
    subTxt : {fontFamily: "AvenirBook",fontSize:13, color:'#000',opacity:0.8, marginTop:5,textAlign:'center'},
    counter : {fontFamily: "OpensansLight",fontSize:35, lineHeight:40, color:'#292931',textAlign:'center'},
})