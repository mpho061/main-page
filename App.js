import { StatusBar } from 'expo-status-bar';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import profile from './assets/profile.png';
import { useRef, useState } from 'react';
//Tab icons...
import home from './assets/home.png';
import search from './assets/search.png';
import Notifications from './assets/bell.png';
import settings from './assets/settings.png';
import logout from './assets/logout.png';
//Menu
import menu from './assets/menu.png';
import close from './assets/close.png';

//Photo 
import photo from './assets/photo.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState("Home");
  //To get the current state menu
  const [showMenu, setShowMenu] = useState(false);
  //animated  properties
  const offstValue = useRef(new Animated.Value(0)).current;
  //scale initial must be
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 8,
        }}></Image>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20,
        }}>Username</Text>
        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white',
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // tab bar buttons
          }

          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Search", search)}
          {TabButton(currentTab, setCurrentTab, "Notifications", Notifications)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}
        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "logOut", logout)}
        </View>
      </View>
      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: "white",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        //Transfoming View
        transform: [
          { scale: scaleValue },
          { translateX: offstValue }
        ]
      }}>
        {
          // Menu button
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            //do action more
            //scaling the view
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offstValue, {
              toValue: showMenu ? 0 : 220,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              //random values
              toValue: showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()
            setShowMenu(!showMenu);
          }}>
            <Image source={showMenu ? close : menu} style={{
              width: 30,
              height: 30,
              tintColor: 'black',
              marginTop: 40
            }}></Image>
          </TouchableOpacity>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 20,
          }}>
            {currentTab}
          </Text>
          <Image source={photo} style={{
            width: '100%',
            height: 300,
            borderRadius: 15,
            marginTop: 20,
          }}>
          </Image>

          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            paddingTop: 15,
            paddingBottom: 5,
          }}>
            userName
          </Text>

          <Text style={{

            fontWeight: 'bold',

          }}>
            To strive and prosper, to assess and reasses
          </Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        //log out function
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15,
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          //  tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359d1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
