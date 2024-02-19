import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SlideCard from "../component/SlideCard";


SplashScreen.preventAutoHideAsync();

export default function HomeScreen(props) {
  const { onPress, title1 = "SHOP NOW", title2 = "TO THE COLLECTION" } = props;

  const [isLoaded] = useFonts({
    "mrt-xbold": require("../fonts/Montserrat-ExtraBold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container} onLayout={handleOnLayout}>
        <Text style={styles.title}>Featured</Text>
        <StatusBar style="auto" />
        <SlideCard/>
        
        <Image
          style={styles.image2}
          source={{
            uri: "https://www.adidas.co.id/media/scandiweb/slider/o/n/onsite_fw23_9.9_sale_masthead_dt_1920x720_en.jpg",
          }}
        />
        <View style={styles.grouping}>
        <Text style={styles.titleText11}>10.10 SALE</Text>
        <Text style={styles.titleText12}>BUY 2, GET EXTRA 20% OFF</Text>
        <Pressable style={styles.button1} onPress={onPress}>
          <Text style={styles.text}>{title1}</Text>
        </Pressable>
        </View>
        <Image
          style={styles.image3}
          source={{
            uri: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/enSG/Images/DesktopHeader_tcm207-476324.jpg",
          }}
        />
        <View style={styles.grouping}>
        <Text style={styles.titleText21}>SUPERSTAR, GAZELLE, SAMBA.</Text>
        <Text style={styles.titleText22}>Adidas Originals</Text>
        <Pressable style={styles.button2} onPress={onPress}>
          <Text style={styles.text}>{title2}</Text>
        </Pressable>
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  title: {
    fontFamily: "mrt-xbold",
    fontSize: 30,
    // textDecorationLine: "underline",
    marginBottom: 30
  },
  title1: {
    fontFamily: "mrt-xbold",
    fontSize: 30,
    textDecorationLine: "underline",
  },
  title2: {
    fontFamily: "mrt-xbold",
    fontSize: 30,
    textDecorationLine: "underline",
  },
  image1: {
    width: 66,
    height: 58,
    margin: 100,
    
  },
  image2: {
    width: 500,
    height: 550,
    margin: 60,
  },
  image3: {
    width: 500,
    height: 550,
    marginTop: -110,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingLeft: 20,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "white",
    top: 170,
    left: -161,
    shadowColor: 'black'
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingLeft: 20,
    borderRadius: 5,
    backgroundColor: "white",
    top: 725,
    left: -145,
    shadowColor: 'black'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "black",
    textAlign: "left",
  },
  titleText11: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    top: 140,
    left: -170,
  },
  titleText12: {
    fontSize: 16,
    fontStyle: 'italic',
    color: "black",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    top: 150,
    left: -115,
  },
  titleText21: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    top: 690,
    left: -115,
  },
  titleText22: {
    fontSize: 16,
    fontStyle: 'italic',
    color: "black",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 12,
    top: 700,
    left: -175,
  },
  grouping: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },

  
  
});
