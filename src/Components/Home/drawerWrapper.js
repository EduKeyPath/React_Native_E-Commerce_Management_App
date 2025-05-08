import React from 'react';
import {View, Drawer, Container, Left, Body, Right, Title, Content, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import FilterDrawer from '../../../Drawer';
import Header from '../Common/Header';
import BackHeader from '../Common/BackHeader';
import Footer from '../Common/Footer';
class DrawerWrapper extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        //this.drawer = React.createRef()
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    
    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {
        return (
            <>
            {
                (this.props.type !== 'back') ?
                <Drawer
                    type="overlay"
                    content={<FilterDrawer navigation={this.props.navigation} closeDrawer={this.closeDrawer.bind(this)}/>}
                    tapToClose={true}
                    openDrawerOffset={0.2}
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                    resizeMode='cover'
                    styles={drawerStyles}
                    ref={(ref) => { this.drawer = ref; }}
                >
                    <Header navigation={this.props.navigation} title={this.props.title || 'Home'} openDrawer={this.openDrawer.bind(this)} closeDrawer={this.closeDrawer.bind(this)}/>
                        {this.props.renderContent()}
                    {/* <Footer navigation={this.props.navigation}/> */}
                </Drawer>
                : <>
                <BackHeader navigation={this.props.navigation} title={this.props.title} background={this.props.background}/>
                {this.props.renderContent()}
                {/* <Footer navigation={this.props.navigation} /> */}
                </>
            }
            </>
        )
    }
}

export default DrawerWrapper;
const drawerStyles = {
drawer: { width:'100%', shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3}
}