import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  iconActive: PropTypes.number,
  iconInActive: PropTypes.number,
};

const TabIcon = (props) => (
  <View style={styles.renderTabBar} >
    <View style={styles.viewIcon} >
      <Image source={props.selected ? props.iconActive : props.iconInActive } style={styles.imageIcon} />
    </View>
    <Text style={[{color: props.selected ? '#19C1FF' : '#7E92A8'}, styles.textIcon]} >
      {props.title}
    </Text>
  </View>
);

TabIcon.propTypes = propTypes;

const styles = StyleSheet.create({
  renderTabBar: {
    alignItems: 'center',
  },
  viewIcon: {

  },
  imageIcon: {
    width: 26,
    height: 26
  },
  textIcon: {
    marginTop: 4,
    fontWeight: '500',
    fontSize: 10
  }
})

export default TabIcon;
