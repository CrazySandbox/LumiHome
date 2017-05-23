import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { DefaultRenderer } from 'react-native-router-flux';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <View style={styles.container} >
        <DefaultRenderer
          navigationState={children[0]}
          onNavigate={this.props.onNavigate}
        />
      </View>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NavigationDrawer;
