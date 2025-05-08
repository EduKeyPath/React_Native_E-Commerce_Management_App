import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, TouchableOpacity  } from 'react-native';
import {View, Radio, Container, Content, Text, Icon, Button, Tab, Tabs, ScrollableTab, Form, Item, Input, Label, Textarea} from 'native-base';
import DrawerWrapper from '../../Home/drawerWrapper';
import Loading from '../../Common/Loading';
import {callApi} from '../../../Helper/api';

export default function EditProfile(props){
    let defaultError	=	{
		name			:	false,
		category		:	false,
		vendor_code		:	false,
		businessname	:	false,
		gstNumber		:	false,
		mobile			:	false,
		altphone		:	false,
		email			:	false,
		address			:	false,
		state			:	false,
		city			:	false,
		pincode			:	false,
		password		:	false
	}
	let [formData, setFormData]		=	useState({
		name			:	'',
		category		:	'',
		vendor_code		:	'',
		businessname	:	'',
		gstNumber		:	'',
		mobile			:	'',
		altphone		:	'',
		email			:	'',
		address			:	'',
		state			:	'',
		city			:	'',
		pincode			:	''
	});
	let [isProcessing, setProcessing]	=	useState(false);
	let [citiesData, setCitiesData]		=	useState([]);
	let [statesData, setStatesData]		=	useState([]);
	let [pincodesList, setPincodesList]	=	useState([]);
	let [categoryList, setCategoryList]		=	useState([]);
	useEffect(() => {
		getCitiesList();
		getCategoryList();
		getDetails();
	}, []);

	useEffect(() => {
		getPincodes();
	}, [formData.city]);


	const getCitiesList	= async (searchData)	=>	{
		try {
			const payload = await callApi('GET', `act=filter&section=getCityList`);
			if (payload.data.error) {
			}
			else {
				let result          =   payload.data.result || [];
				let states			=	[];
				let cities			=	{};
				(result.list || []).forEach(city => {
					let index			=	city.stateId;
					if(!!cities[index]) {					
						cities[index].cities.push({
							id: city.id,
							name: city.name
						})	
					} else {					
						states.push({
							id: city.stateId,
							name: city.stateName
						})
						cities[index]	=	{
							id : city.stateId,
							name : city.stateName,
							cities	:	[{
								id: city.id,
								name: city.name
							}]
						}
					}
				})
				setStatesData(states);
				setCitiesData(cities);
			}
		} catch(err) {
			console.log(err);
		}
	}
	
	const getDetails	= async (searchData)	=>	{
		try {
			const payload = await callApi('GET', `act=profile&section=getDetails`);
			if (payload.data.error) {
			}
			else {
				let result          =   payload.data.result || [];
				let details			=	result.details || {};
				setFormData({
					name			:	details.name,
					category		:	details.category,
					vendor_code		:	details.vendor_code,
					businessname	:	details.businessname,
					gstNumber		:	details.gstNumber,
					mobile			:	details.mobile,
					altphone		:	details.altphone,
					email			:	details.email,
					address			:	details.address,
					state			:	details.state,
					city			:	details.city,
					pincode			:	details.pincode
				});
			}
		} catch(err) {
			console.log(err)
		}
	}

	const getPincodes	= async ()	=>	{
		try {
			const payload = await callApi('POST', `act=filter&section=getPincodesList`, {id: formData.city});
			if (payload.data.error) {
				console.log(payload.data.error);
			}
			else {
				let result          =   payload.data.result || [];
				setPincodesList(result.list);
			}
		} catch(err) {
			console.log(err);
		}
	}
    const onChangeHandle  =   (e)  =>  {
        setFormData({
			...formData,                
			[e.target.name]     :   e.target.value
        })
	}

	const handleSubmit	=	async (e)	=>	{
		try {
			e.preventDefault();
			setProcessing(true);
			const payload = await callApi('POST', `act=profile&section=updateProfile`, {...formData, id: id});
			if (payload.data.error) {
				notifyError({message: payload.data.error});
				setProcessing(false);
			}
			else {
				setUserData({...userData, name: formData.name});
				notifySuccess(payload.data.result);
				setProcessing(false);
			}
		} catch(err) {
			console.log(err);
		}
	}

	const validate	=	()	=>	{
		let error		=	{...defaultError};
		let isError		=	false;
		if(!!!formData.name) {
			error.name	=	true;
			isError		=	true;
		}
		if(!!!formData.category) {
			error.category	=	true;
			isError		=	true;
		}
		if(!!!formData.vendor_code) {
			error.vendor_code	=	true;
			isError		=	true;
		}
		if(!!!formData.mobile) {
			error.mobile	=	true;
			isError		=	true;
		}
		if(!!formData.mobile && (isNaN(formData.mobile) || formData.mobile.length !== 10)) {
			error.mobile	=	true;
			isError		=	true;
		}
		if(!!formData.altphone && (isNaN(formData.altphone) || formData.altphone.length !== 10)) {
			error.altphone	=	true;
			isError		=	true;
		}
		return {isError: isError, error: error};
	}

	let {isError, error}		=	validate();

    return <DrawerWrapper
        type='back'
        title='Edit Profile'
        navigation={props.navigation}
        renderContent={() => (                    
            <Container style={{padding:10}}>
                <Content>
                    <View style={[styles.tabContent]}>
                        <View style={styles.tabBox}>
                            <Form>
                                <Text style={styles.heading}>Basic Details</Text>
                                <Item floatingLabel last style={[styles.txtRow, {marginTop:0}]}>
                                    <Label style={styles.txtLabel}>Name</Label>
                                    <Input style={[styles.txtInput]}
                                        value={formData.name}
                                        name="name"
                                        onChangeText={onChangeHandle}
                                    />
                                </Item>
                                <Item floatingLabel last style={[styles.txtRow]}>
                                    <Label style={styles.txtLabel}>Code</Label>
                                    <Input style={[styles.txtInput]}
                                        name="vendor_code" value={formData.vendor_code} onChange={onChangeHandle}
                                    />
                                </Item>
                                <Item floatingLabel last style={[styles.txtRow]}>
                                    <Label style={styles.txtLabel}>Mobile No.</Label>
                                    <Input style={[styles.txtInput]}
                                        name="mobile" value={formData.mobile} onChange={onChangeHandle}
                                    />
                                </Item>
                                <Item floatingLabel last style={[styles.txtRow]}>
                                    <Label style={styles.txtLabel}>Alt. Mobile No.</Label>
                                    <Input style={[styles.txtInput]}
                                        name="altphone" value={formData.altphone} onChange={onChangeHandle}
                                    />
                                </Item>
                                <Item floatingLabel last style={[styles.txtRow]}>
                                    <Label style={styles.txtLabel}>Email</Label>
                                    <Input style={[styles.txtInput]}
                                        name="email" value={formData.email} onChange={onChangeHandle}
                                    />
                                </Item>

                                <Text style={[styles.heading,{marginTop:30}]}>Location</Text>
                                <Item floatingLabel last style={[styles.txtRow]}>
                                    <Label style={styles.txtLabel}>Address</Label>
                                    <Input style={[styles.txtInput]}
                                        name="address" value={formData.address} onChange={onChangeHandle}
                                    />
                                </Item>
                                
                                <TouchableOpacity>
                                    <Button style={styles.defaultBtn} disabled={!!isError || !!isProcessing} onPress={handleSubmit}>
                                        <Text style={styles.defaultBtnTxt}>{(!!isProcessing) ? 'Processing....' : 'Update Profile'}</Text>
                                    </Button>
                                </TouchableOpacity>
                            </Form>
                        </View>
                    </View>
                </Content>
            </Container>
        )}
    />
}
const styles = StyleSheet.create({    
    tabBox : {minHeight:200, paddingTop:8, marginBottom:30 },
    txtRow : {marginBottom:0},
    txtLabel: {fontSize: 13,opacity:0.5,color: '#606060', marginLeft:-10},
    txtInput: {fontSize: 14, padding:5, color: '#606060', marginLeft:-15},
    txtArea: {fontSize: 14, padding:5, color: '#606060', borderBottomWidth:1, borderBottomColor:'#ddd',
    borderLeftWidth:0, borderTopWidth:0,borderRightWidth:0, marginLeft:-10},
    defaultBtn : {width:'100%', backgroundColor: '#d60022', borderRadius: 20, height:40, marginTop:30, marginBottom:20},
    defaultBtnTxt : {width:'100%',fontFamily: "OpensansSemiBold", fontSize: 16,color: '#fff',textTransform: 'capitalize', textAlign:'center'},
})