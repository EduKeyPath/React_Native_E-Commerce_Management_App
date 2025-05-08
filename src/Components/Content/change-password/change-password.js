import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {Container, Content,View, Text, Icon, Item, Label, Input, Button, Form} from 'native-base';
import DrawerWrapper from '../../Home/drawerWrapper';
import {error as notifyError, success as notifySuccess} from '../../../Utils/notify';
import {callApi} from '../../../Helper/api';

export default function ChangePassword(props){
    let [oldpassword, setOldpassword]   =   useState('');
    let [password, setNewPassword]         =   useState('');
    let [newConfPass, setNewConfPass]   =   useState('');
    let [isProcessing, setIsProcessing] =   useState(false);
    const [oldHidePass, setOldHidePass] = useState(true);
    const [hidePass, setHidePass] = useState(true);
    const [reHidePass, setReHidePass] = useState(true);

    let defaultErrors  =   {
        oldpassword :   false,
        password    :   false,
        newConfPass :   false
    }

    const handleSubmit   =  async (e) => {
        e.preventDefault();
        let changePassData   =   {
            newpassword: password,
            oldpassword: oldpassword
        };
        //console.log(changePassData);

        try {
            setIsProcessing(true);
            const res = await callApi('POST', `act=profile&section=changePassword`, changePassData);
            if (res.data.error) {
                console.log(res.data.error);
                notifySuccess(res.data.error || '');
                setIsProcessing(false);
                setOldpassword('');
                setNewConfPass('');
                setNewPassword('');
            }
            else {
                let result = res.data.result || {};
                notifySuccess(result.message || '');
                setIsProcessing(false);
                setOldpassword('');
                setNewConfPass('');
                setNewPassword('');
            }
        } catch(e) {
            console.log(e);
            setIsProcessing(false);
        }
    }

    const validateForm = () => {
        let formData    =   {
            oldpassword: oldpassword,
            password: password,
            newConfPass: newConfPass
        }
		let errors		=	{...defaultErrors};
		let isError		=	false;
		if(!!!formData.password) {
			errors.password		=	true;
			isError				=	true;
        }
        if(!!!formData.newConfPass) {
            errors.newConfPass     =	true;
            isError				=	true;
        }
        if(!!!formData.oldpassword) {
            errors.oldpassword     =	true;
            isError				=	true;
        }
		return {isError: isError, errors: errors};
    }

    //let formData        =   state.formData || {};
    let validate        =   validateForm();
    let errors          =   validate.errors;
    let isError         =   validate.isError;
    //console.log(isError, errors)
    
    return <DrawerWrapper
        navigation={props.navigation}
        type='back'
        title='Change Password'
        renderContent={() => (                    
            <Container>
                <Content>
                    <View style={styles.container}>
                        <Form>
                            <View style={{position:'relative'}}>
                                <Item floatingLabel last style={[styles.txtRow, {marginTop:0}]}>
                                    <Label style={styles.txtLabel}>Enter your old password</Label>
                                    <Input style={[styles.txtInput, (!!errors.oldpassword)?styles.errorFld : '']} 
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={oldHidePass ? true : false}
                                        spellCheck={false}
                                        name="oldpassword"
                                        value={oldpassword}
                                        onChangeText={text => setOldpassword(text)} />
                                </Item>
                                <Icon
                                    style={{position:'absolute',  right:0, bottom:12, zIndex:1, fontSize:20, width:30, height:25}}
                                    name={oldHidePass ? 'eye-off-outline' : 'eye-outline'}
                                    size={15}
                                    color="grey"
                                    onPress={() => setOldHidePass(!oldHidePass)}
                                />
                            </View>
                            <View style={{position:'relative'}}>
                                <Item floatingLabel last style={[styles.txtRow, {marginTop:0}]}>
                                    <Label style={styles.txtLabel}>Enter your new password</Label>
                                    <Input style={[styles.txtInput, (!!errors.password)?styles.errorFld : '']} 
                                            autoCapitalize="none"
                                            secureTextEntry={hidePass ? true : false}
                                            autoCorrect={false}
                                            spellCheck={false}
                                            name="password"
                                            value={password}
                                            onChangeText={text => setNewPassword(text)} />
                                </Item>
                                <Icon
                                    style={{position:'absolute',  right:0, bottom:12, zIndex:1, fontSize:20, width:30, height:25}}
                                    name={hidePass ? 'eye-off-outline' : 'eye-outline'}
                                    size={15}
                                    color="grey"
                                    onPress={() => setHidePass(!hidePass)}
                                />
                            </View>
                            
                            <View style={{position:'relative'}}>
                                <Item floatingLabel last style={[styles.txtRow, {marginTop:0}]}>
                                    <Label style={styles.txtLabel}>Confirm your password</Label>
                                    <Input style={[styles.txtInput, (!!errors.newConfPass)?styles.errorFld : '']} 
                                        autoCapitalize="none"
                                        secureTextEntry={reHidePass ? true : false}
                                        autoCorrect={false}
                                        spellCheck={false}
                                        value={newConfPass}
                                        name="newConfPass"
                                        onChangeText={text => setNewConfPass(text)} />
                                </Item>
                                <Icon
                                    style={{position:'absolute',  right:0, bottom:12, zIndex:1, fontSize:20, width:30, height:25}}
                                    name={reHidePass ? 'eye-off-outline' : 'eye-outline'}
                                    size={15}
                                    color="grey"
                                    onPress={() => setReHidePass(!reHidePass)}
                                />
                            </View>
                            <TouchableOpacity>
                                <Button style={styles.defaultBtn} disabled={!!isError || !!isProcessing} onPress={handleSubmit}>
                                    <Text style={styles.defaultBtnTxt}>{(!!isProcessing) ? 'Processing....' : 'Change Password'}</Text>
                                </Button>
                            </TouchableOpacity>
                        </Form>
                    </View>
                </Content>
            </Container>
        )}
    />
}
const styles = StyleSheet.create({    
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingVertical:5,
        paddingHorizontal:5,
        position: 'relative'
    },
    starIcon : { color:'#2d2d2d', fontSize:20, lineHeight:20, opacity:0.7, marginRight:3},
    starIconActive :  {color:'#d2b555'},
    txtRow : {marginBottom:15},
    txtLabel: {
        fontSize: 13,opacity:0.5,
        color: '#606060', marginLeft:-10
    },
    txtInput: {
        fontSize: 14, padding:5, color: '#606060', marginLeft:0
    },
    defaultBtn : {width:'100%', backgroundColor: '#d60022', borderRadius: 20, height:40, marginTop:30, marginBottom:20},
    defaultBtnTxt : {width:'100%',fontFamily: "OpensansSemiBold", fontSize: 16,color: '#fff',textTransform: 'capitalize', textAlign:'center'},
  
})