import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import {View, Container, Content, Text, Icon, Picker,DatePicker, Button, Fab, Form, Input, Item} from 'native-base';
import DrawerWrapper from '../../Home/drawerWrapper';
import {callApi} from '../../../Helper/api';
import Loading from '../../Common/Loading';

export default function Products(props){
    let params  =   {...props.params};
    let [product, setProduct]     =   useState({});
    let [mainCategoryList, setMainCatList]     =   useState([]);
	let [categoryList, setCategoryList]	=	useState([]);
    let [isLoading, setIsLoading] =   useState(false);
    let defaultSearchData	=	{ pageno: 1, main: '', category : '', subCategory: '', thirdCategory: '', name: '', code: '', fromDate: '', toDate: '', status: params.status || ''};
	let [searchData, setSearchData]	=	useState(defaultSearchData);
    let [status, setStatus]	=	useState([]);
    let [date, setDate]	=	useState([]);

    let [catList, setCatList]	=	useState([]);
	let [subList, setSubList]	=	useState([]);
	let [thirdList, setThirdList]	=	useState([]);
    
    const [productFilterModal, setProductFilterModal] = useState(false);
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;

    useEffect(() => {
		let catList	=	(categoryList || []).find(item => item.id === searchData.main);
		let dataList	=	(!!catList) ? catList.list : [];
		setCatList(dataList);
	}, [searchData.main]);	

	useEffect(() => {
		let subList	=	(catList || []).find(item => item.id === searchData.category);
		let dataList	=	(!!subList) ? subList.subList : [];
		setSubList(dataList);
        console.log('55',dataList)
	}, [searchData.category]);	

	useEffect(() => {
		let data	=	(subList || []).find(item => item.id === searchData.subCategory);
		let dataList	=	(!!data) ? data.subList : [];
		setThirdList(dataList);
	}, [searchData.subCategory]);

    const toggleModal = () => {
        setProductFilterModal(!productFilterModal);
    };

    useEffect(() => {
        getMainCategory();
        getCategory();
        getProduct();
    }, [])

    const search	=	(e)	=>	{
		e.preventDefault();
        getProduct(searchData);
        toggleModal();
	}

    const getProduct = async () => {
        try {
            setIsLoading(true);
            const res = await callApi('POST', `act=products&section=getProducts`, {...searchData});
            if (res.data.error) {
                console.log(res.data.error);
                setIsLoading(false);
            }
            else {
                let result = res.data.result || {};
                setProduct(result.list);
                setIsLoading(false);
            }
        } catch(e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    const onChangeHandle  =   (fldName, val)  =>  {
        setSearchData({
			...searchData,                
			[fldName]     :   val
        })
	}
  
    return <DrawerWrapper
        type='back'
        title='Manage Products'
        navigation={props.navigation}
        renderContent={() => (                    
            <Container>
                <Modal isVisible={productFilterModal} deviceWidth={deviceWidth} deviceHeight={deviceHeight}>
                    <View style={{flex: 1, left:-13, width:'108%', bottom:-20, backgroundColor:'#fff', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                        <View style={{ alignItems:'center', borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection:'row'}}>
                            <Icon onPress={toggleModal} style={{padding:6,paddingLeft:10}} name="chevron-back-outline" />
                            <Text style={{fontSize:18,marginTop:-3}}>Product Search</Text>
                        </View>
                        <View style={{padding:10, paddingBottom:50}}>
                            <ScrollView>
                                <Form style={{ paddingBottom:30}}>
                                    <View style={styles.inputRow}>
                                        <Picker
                                            note
                                            name="main"
                                            mode="dropdown"
                                            style={styles.txtInput}
                                            selectedValue={searchData.main}
                                            onValueChange={(text) => onChangeHandle('main', text)}
                                            >
                                            <Picker.Item label="All Main Category" value={searchData.main} />
                                            {
												(mainCategoryList).map((item, i) => {
													return (
                                                        <Picker.Item key={i} label={item.name} value={item.id} />
													)
												})
											}
                                            
                                        </Picker>
                                    </View>
                                    <View style={styles.inputRow}>
                                        <Picker
                                            note
                                            name="thirdCategory"
                                            mode="dropdown"
                                            style={styles.txtInput}
                                            selectedValue={searchData.thirdCategory}
                                            onValueChange={(text) => onChangeHandle('thirdCategory', text)}
                                            >
                                            <Picker.Item label="All Third Category" value={searchData.thirdCategory} />
                                            {
												(thirdList).map((item, i) => {
													return (
                                                        <Picker.Item key={i} label={item.name} value={item.id} />
													)
												})
											}
                                        </Picker>
                                    </View>
                                    <Item regular style={styles.inputRow}>
                                        <Input style={[styles.txtInput]} name="code" onChangeText={text => onChangeHandle('code', text)} placeholder='Product Code' value={searchData.code} />
                                    </Item>
                                    <Item regular style={styles.inputRow}>
                                        <Input style={[styles.txtInput]} name="name" onChangeText={text => onChangeHandle('name', text)} placeholder='Product Name' value={searchData.name} />
                                    </Item>
                                    <View style={styles.inputRow}>
                                        <Picker
                                            note
                                            name="status"
                                            mode="dropdown"
                                            style={styles.txtInput}
                                            selectedValue={searchData.status}
                                            onValueChange={(text) => onChangeHandle('status', text)}
                                            >
                                            <Picker.Item label="Change Status" value={searchData.status} />
                                            <Picker.Item label="All" value="" />
                                            <Picker.Item label="Active" value="A" />
                                            <Picker.Item label="Inactive" value="I" />
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
                                <Text style={[styles.tableTh,{width:'30%', borderRightWidth:1}]}>Name</Text>
                                <Text style={[styles.tableTh,{width:'30%', borderRightWidth:1}]}>Main</Text>
                                <Text style={[styles.tableTh,{width:'20%'}]}>Amount</Text>
                            </View>
                            {
                                (product.length > 0) ?
                                    <>
                                    {
                                        (product || []).map((item, k) => {
                                        return (
                                            <TouchableOpacity key={k} onPress={() => props.navigation.push('ProductDetails', {id: item.id})}>
                                                <View style={[styles.tdBody]}>
                                                    <View style={[styles.tableTd,{width:'30%', borderRightWidth:1}]}>
                                                        <Text style={[styles.normTxt,styles.proCode]}>{item.name}</Text>
                                                        <Text style={[styles.normTxt,styles.proCode,{fontStyle:'italic', marginTop:3}]}>Code : {item.code}</Text>
                                                    </View>
                                                    <View style={[styles.tableTd,{width:'30%', borderRightWidth:1}]}>
                                                        <Text style={[styles.normTxt,styles.proCode]}>{item.mainCategory}</Text>
                                                    </View>
                                                    <View style={[styles.tableTd,{width:'20%'}]}>
                                                        <Text style={[styles.normTxt, {textAlign:'center'}]}>{item.category}</Text>
                                                        <Text style={[(item.status === 'A') ? styles.active : styles.inactive, styles.normTxt,styles.proCode,{fontStyle:'italic',textAlign:'center',marginTop:3}]}>
                                                            {
                                                                (item.status === 'A') ? 'Active' : 'Inactive'
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.tableTd,{width:'20%', borderRightWidth:1}]}>
                                                        <Text style={[styles.normTxt,styles.proCode, {textAlign:'right'}]}>{item.price}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            )
                                        })
                                    }
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
                    style={{backgroundColor: '#2e86c9',bottom:10}}
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