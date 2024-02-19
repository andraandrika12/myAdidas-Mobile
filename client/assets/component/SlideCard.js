import React, { Component } from "react";
import { View, Image, ScrollView, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");

const photos = [
  {
    uri: "https://www.adidas.co.id/media/wysiwyg/football-fw23-MarineRush-Launch-hp-teaser-carousel-d.jpg",
  },
  {
    uri: "https://www.adidas.co.id/media/wysiwyg/ADIZERO_SELECT_CCM_TC_1050x1400.jpg",
  },
  {
    uri: "https://www.adidas.co.id/media/wysiwyg/running-fw23-switchfwd-launch-hp-tc-d.jpg",
  },
  {
    uri: "https://www.adidas.co.id/media/wysiwyg/3392485_-_CAM_Onsite_FW23_ULTRABOOST_LIGHT_CCM_1050x1400px.jpg",
  },
];

export default class SlideCard extends Component {
  scrollX = new Animated.Value(0);

  render() {
    let position = Animated.divide(this.scrollX, width);

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width, height: width }}>
          <Animated.ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {photos.map((source, i) => {
              return (
                <Image
                  key={i}
                  style={{ width, height: width }}
                  source={source}
                />
              );
            })}
          </Animated.ScrollView>
        </View>
        <View style={{ flexDirection: "row" }}>
          {photos.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#595959",
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
