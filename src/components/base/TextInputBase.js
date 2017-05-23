import React, { Component, PropTypes } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text
} from 'react-native';

import imgs from '../../config/theme';

class TextInputBase extends Component {

  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
  }

  render() {
    const renderRightIcon = (
      <TouchableOpacity
        style={styles.rightButton}
        onPress={() => console.log("aaa")}
      >
        <Image
          source={imgs.iconEdit.delete}
          style={styles.image}
        />
      </TouchableOpacity>
    )

    if(this.props.type == "user") {
      return (
        <View style={[this.props.style, styles.container]}
        >
          <TextInput
            {...this.props}
            style={styles.TextInput}
            placeholder={this.props.placeholder}
          />
          {renderRightIcon}
        </View>
      );
    }
  }
}

TextInputBase.defaultProps = {
  placeholder: 'Input'
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 320,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  TextInput: {
    flex: 1,
    color: 'white',
  },
  rightButton: {
    width: 36,
    height:
  }
});

export default TextInputBase;
