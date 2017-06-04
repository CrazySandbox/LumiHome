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

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isClearButton: false,
      isFocus: false,
      text: this.props.value || '',
      securePass: true,
    }
  }

  static propTypes = {
    type: PropTypes.string,
    style: View.propTypes.style,
    focusStyle: View.propTypes.style,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    maxLength: PropTypes.number,
    editable: PropTypes.bool,
    selectionColor: PropTypes.string,
    onChangeText: PropTypes.func,
    doSetting: PropTypes.func,
    textInputRef: PropTypes.string,
    error: PropTypes.bool,
    errorStyle: View.propTypes.style,
    returnKeyType: PropTypes.string,
    focus: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    placeholder: '',
    placeholderTextColor: 'rgba(242, 242, 242, 0.5)',
    maxLength: 40,
    editable: true,
    selectionColor: 'white',
    error: false,
    returnKeyType: 'next'
  }

  onFocus() {
    if(this.state.text.length > 0) {
      this.setState({
        isClearButton: true,
        isFocus: true
      })
    } else {
      this.setState({
        isClearButton: false,
        isFocus: true,
      })
    }
  }

  focus() {
    this.refs[this.props.textInputRef].focus();
  }

  onBlur() {
    this.setState({
      isClearButton: false,
      isFocus: false
    });
  }

  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({
      isClearButton: true,
      isFocus: true,
      text: text,
    });
  }

  clearText() {
    if (this.props.onChangeText) {
      this.props.onChangeText('');
    }
    try {
      const ref = this.props.textInputRef;
      this.refs[ref].clear();
    } catch (e) {
        console.log('Could not access');
    }
    this.setState({
      isClearButton: false,
      text: '',
    });
  }

  doSetting() {
    this.props.doSetting();
  }

  doShowHidePass() {
    this.setState({
      securePass: !this.state.securePass
    })
  }

  render() {
    const {
      style,
      type,
      placeholder,
      placeholderTextColor,
      maxLength,
      editable,
      selectionColor,
      textInputRef,
      returnKeyType
    } = this.props;

    const renderRightIconUser = (
      this.state.isClearButton ? (
      <TouchableOpacity
        style={styles.rightButton}
        onPress={this.clearText.bind(this)}
      >
        <Image
          source={imgs.iconEdit.delete}
          style={styles.image}
        />
      </TouchableOpacity>) : (
      <TouchableOpacity
        style={styles.rightButton}
        onPress={this.doSetting.bind(this)}
      >
        <Image
          source={imgs.iconSetting.setting}
          style={styles.image}
        />
      </TouchableOpacity>)
    )

    const renderRightIconPass = (
      this.state.isClearButton ? (
      <TouchableOpacity
        style={styles.rightButton}
        onPress={this.clearText.bind(this)}
      >
        <Image
          source={imgs.iconEdit.delete}
          style={styles.image}
        />
      </TouchableOpacity>) : (
      <TouchableOpacity
        style={styles.rightButton}
        onPress={this.doShowHidePass.bind(this)}
      >
        <Image
          source={imgs.iconSetting.eye}
          style={styles.image}
        />
      </TouchableOpacity>)
    )

    const renderRightIcon = (
      this.state.isClearButton ? (
      <TouchableOpacity
        style={styles.rightButton}
        onPress={this.clearText.bind(this)}
      >
        <Image
          source={imgs.iconEdit.delete}
          style={styles.image}
        />
      </TouchableOpacity>) : <View />
    )

    if(type == "user") {
      const { errorStyle } = this.props;
      return (
        <View
          style={[
            styles.container,
            style,
            this.props.error ? errorStyle || styles.viewError : '',
            this.state.isFocus ? styles.viewFocus : styles.view]}
        >
          <TextInput
            {...this.props}
            style={styles.TextInput}
            ref={textInputRef}
            underlineColorAndroid='transparent'
            keyboardType='email-address'
            returnKeyType={returnKeyType}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={maxLength}
            editable={editable}
            numberOfLines={1}
            multiline={false}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            selectionColor={selectionColor}
            onChangeText={(text) => this.onChangeText(text)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            value={this.state.text}
          />
          {renderRightIconUser}
        </View>
      );
    } else if (type == "pass") {
      const { errorStyle } = this.props;
      return (
        <View
          style={[
            styles.container,
            style,
            this.props.error ? errorStyle || styles.viewError : '',
            this.state.isFocus ? styles.viewFocus : styles.view]}
        >
          <TextInput
            {...this.props}
            style={styles.TextInput}
            ref={textInputRef}
            underlineColorAndroid='transparent'
            returnKeyType='done'
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={maxLength}
            editable={editable}
            numberOfLines={1}
            multiline={false}
            secureTextEntry={this.state.securePass}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            selectionColor={selectionColor}
            onChangeText={(text) => this.onChangeText(text)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            value={this.state.text}
          />
          {renderRightIconPass}
        </View>
      );
    } else {
      const { errorStyle } = this.props;
      return (
        <View
          style={[
            styles.container,
            style,
            this.props.error ? errorStyle || styles.viewError : '',
            this.state.isFocus ? styles.viewFocus : styles.view]}
        >
          <TextInput
            {...this.props}
            style={styles.TextInput}
            ref={textInputRef}
            underlineColorAndroid='transparent'
            returnKeyType={returnKeyType}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={maxLength}
            editable={editable}
            numberOfLines={1}
            multiline={false}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            selectionColor={selectionColor}
            onChangeText={(text) => this.onChangeText(text)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            value={this.state.text}
          />
          {renderRightIcon}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 320,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  view: {
    backgroundColor: 'rgba(43, 56, 72, 0.3)',
  },
  viewFocus: {
    backgroundColor: 'rgba(43, 56, 72, 0.5)',
    borderWidth: 0.3,
    borderColor: '#19c1ff',
  },
  viewError: {
    borderWidth: 0.5,
    borderColor: 'red',
  },
  TextInput: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 5,
    color: 'white',
  },
  rightButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 16,
    width: 16,
    borderRadius: 8,
  }
});

export default Input;
