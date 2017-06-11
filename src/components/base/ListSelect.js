import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image
} from 'react-native';

import imgs from '../../config/theme';
import langs from '../../config/langs';

const { w, h } = Dimensions.get('window');

const DATA = [
  {
    title: langs.enable,
    key: 0,
  },
  {
    title: langs.disable,
    key: 1,
  },
]

class ListSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPressHeader: false,
      check: this.props.initialTitleRightHeader || '',
    }
  }

  static propTypes = {
    headerTitle: PropTypes.string,
    initialTitleRightHeader: PropTypes.string,
    imageHeaderRightActive: Image.propTypes.source,
    imageHeaderRightInactive: Image.propTypes.source,
    onHeader: PropTypes.func,
    isSelect: PropTypes.string,
    item: PropTypes.array,
    imageSelect: Image.propTypes.source,
    value: PropTypes.string,
    onValueChange: PropTypes.func,
  }

  static defaultProps = {
    initialTitleRightHeader: null,
    imageHeaderRightActive: imgs.base.downGrey,
    imageHeaderRightInactive: imgs.base.rightGrey,
    imageSelect: imgs.base.check,
    item: DATA
  }

  onPressHeader() {
    if(this.props.onHeader) {
      this.props.onHeader(this.props.headerTitle)
    }
    if(this.props.headerTitle == this.props.isSelect) {
      this.setState({
        onPressHeader: !this.state.onPressHeader
      })
    } else {
      this.setState({
        onPressHeader: true
      })
    }
  }

  onCheck(item) {
    this.props.onValueChange(item.title)
    this.setState({
      check: item.title
    })
  }

  render() {
    const {
      headerTitle,
      initialTitleRightHeader,
      imageHeaderRightActive,
      imageHeaderRightInactive,
      onHeader,
      item,
      isSelect,
      imageSelect
    } = this.props;

    const renderBody = (
      <View style={styles.body} >
        {
          item.map((item, i) => {
            return (
              <View style={styles.rowItem} key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => this.onCheck(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.titleLeftItem}>
                    <Text style={styles.textTitle}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.imgRightItem}>
                    {
                      this.state.check == item.title ? <Image
                        style={styles.imgSelect}
                        resizeMode="contain"
                        source={imageSelect}
                      /> : <View />
                    }
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    )

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.onPressHeader.bind(this)}
            activeOpacity={0.7}
            style={styles.headerRow}
          >
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {headerTitle}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.textRightHeader}>
                <Text style={styles.txtRightHeader} numberOfLines={1}>
                  {this.state.check}
                </Text>
              </View>
              <View style={styles.imgRight}>
                <Image
                  style={styles.imageRight}
                  resizeMode="contain"
                  source={isSelect == headerTitle ? this.state.onPressHeader ? imageHeaderRightActive : imageHeaderRightInactive : imageHeaderRightInactive}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {
          isSelect == headerTitle ? this.state.onPressHeader ? renderBody : <View /> : <View />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: w,
    marginBottom: 0.5
  },
  header: {
    height: 50,
    backgroundColor: 'rgba(43, 56, 72, 0.5)',
  },
  headerRow: {
    paddingLeft: 13,
    paddingRight: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#19c1ff',
    backgroundColor: 'transparent',
  },
  headerRight: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRightHeader: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  txtRightHeader: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7e92a8',
    backgroundColor: 'transparent',
    marginRight: 8
  },
  imgRight: {
    height: 50,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageRight: {
    height: 18,
    width: 18
  },
  rowItem: {
    height: 50,
    width: w,
    backgroundColor: 'rgba(43, 56, 72, 0.7)',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2b3848'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 13,
    paddingRight: 8,
  },
  titleLeftItem: {
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7e92a8',
    backgroundColor: 'transparent',
  },
  imgRightItem: {
    height: 50,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSelect: {
    height: 13,
    width: 13
  }
});

export default ListSelect;
