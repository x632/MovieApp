import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Oups! Something went wrong.',
  errorText2: 'Make sure you are online and restart the app.',
};

class Error extends React.PureComponent {
  render() {
    const {errorText1, errorText2} = this.props;

    return (
      <View styles={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
  },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;
