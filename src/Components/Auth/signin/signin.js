import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {View, Drawer, Container, Left, Body, Right, Item, Label, Input, Title, Content, FooterTab, Button, Text, Badge } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackActions, NavigationActions } from 'react-navigation';
import { isEmpty } from 'lodash';
import {isValidEmail, isValidMobile} from '../../../Helper/common';

export default function SignIn(props){
    let [email, setemail] =   useState('');
    let [password, setPassword] =   useState('');
    const [hidePass, setHidePass] = useState(true);
    let [isSuccess, setIsSuccess] =   useState(false);
    
    useEffect(() => {
        if(!!props.isSuccess && !isSuccess && !isEmpty(props.userData)) {
            console.log(props.userData)
            props.navigation.navigate('Home')
        }
        setIsSuccess(props.isSuccess)
    }, [props.isSuccess])
    let defaultErrors       =   {
        email    :   false,
        password    :   false
    }

    const handleSubmit   =  async (e) => {
        e.preventDefault();
        let loginData   =   {
            email: email,
            password: password,
            pagename: !!props.params ? props.params.pagename : ''
        };
        props.signin(loginData);
    }

    const validateForm = () => {
        let formData    =   {
            email: email,
            password: password
        }
		let errors		=	{...defaultErrors};
		let isError		=	false;
		if(!!!formData.password) {
			errors.password		=	true;
			isError				=	true;
        }
        if(!!!formData.email) {
            errors.email     =	true;
            isError				=	true;
        }
        if(!isValidEmail(formData.email) && !isValidMobile(formData.email)) {
            errors.email        =	true;
            isError				=	true;
        }
		return {isError: isError, errors: errors};
    }

    let validate        =   validateForm();
    let errors          =   validate.errors;
    let isError         =   validate.isError;

    return <Container>
            <View style={{padding:10, paddingVertical:15, marginBottom:20, borderBottomWidth:1, borderBottomColor:'#eaeaea'}}>
                <Text style={{fontSize:17, paddingLeft:5, paddingTop:2, color:'#8c8c8c', fontWeight:'100'}}>Ecommerce</Text>
            </View>
            <Content style={styles.mainContainer}>
                <View style={styles.loginIconBoxActive}>
                    <Text style={{fontSize:24,color: '#a64343'}}>Ecommerce Seller</Text>
                </View>
                <View>
                    <View>
                        <Item floatingLabel last style={[styles.txtRow, (!!errors.email) ? styles.error: '']}>
                            <Label style={styles.txtLabel}>Enter Your Login Id</Label>
                            <Input style={styles.txtInput} 
                                autoCapitalize="none"
                                autoCorrect={false}
                                spellCheck={false}
                                name="email"
                                value={email}
                                onChangeText={text => setemail(text)} />
                        </Item>
                        <Item floatingLabel last style={[styles.txtRow, (!!errors.password) ? styles.error: '']}>
                            <Label style={styles.txtLabel}>Enter Your Password</Label>
                            <Input style={styles.txtInput}
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false} 
                            secureTextEntry={hidePass ? true : false}
                            name="password"
                            value={password}
                            onChangeText={text => setPassword(text)}/>                                    
                        </Item>
                        <Icon
                            style={{position:'absolute',  right:5, bottom:12, zIndex:1, fontSize:20, width:30, height:25}}
                            name={hidePass ? 'eye-slash' : 'eye'}
                            size={15}
                            color="grey"
                            onPress={() => setHidePass(!hidePass)}
                        />
                    </View>
                </View>
                <TouchableOpacity disabled={!!isError || props.isProcessing} onPress={handleSubmit}>
                    <Text style={styles.defaultBtn}>{(!!props.isProcessing) ? 'Processing....' : 'Sign In'}</Text>
                </TouchableOpacity>
                
            </Content>
        </Container>
}

const styles = StyleSheet.create({
    mainContainer : {margin:5},
    pageHeading : {fontFamily: "AvenirBook", fontSize:25, fontWeight:'600', color:'#d60022', marginBottom:3},
    loginIconWrap: {
        marginTop: 10,
        marginBottom: 25,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    loginIconBox: {
        height: 130,
        padding: 20,
        borderRadius: 10,
        marginRight: 5,
        width: '48%',
        backgroundColor: '#e8f3f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginIconBoxActive: {
        backgroundColor: '#ffcece',
        borderColor: '#efb6b6',
        borderWidth: 2, height:180, marginBottom:30, borderRadius:15,
        justifyContent:'center', alignItems:'center'
    },
    loginIcon: {
        fontSize: 30,
        color: '#41a1d2'
    },
    loginIconActive: {
        color: '#a64343'
    },
    loginTxt: {
        marginTop: 5,
        color: '#41a1d2'
    },
    loginTxtActive: {
        color: '#a64343'
    },
    txtRow : {marginBottom:10, position:'relative'},
    txtLabel: {fontSize: 13,opacity:0.5,color: '#606060', marginLeft:-12},
    txtInput: {fontSize: 14, padding:5, color: '#000', marginLeft:-5},
    
    defaultBtn: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#2e86c9',
        marginBottom: 8,
        borderRadius: 20,
        textAlign: 'center',
        paddingTop: 5,
        height: 40        
    },
    forgetLink: {
        color: '#a3a3a3',
        marginTop:10,
        fontSize: 15,
        textAlign: 'center'
    },
    SignUpLink: {
        width: '100%',
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#606060',
        fontSize: 13,
        marginTop: 30,
        marginBottom: 10
    },
    SignUpText: {
        color: '#d60022',
        fontSize: 15,
        paddingLeft: 10
    },
    error: {borderColor: '#ff0000'}
})