import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Button,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMovie} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const placeholderImage = require('../assets/images/default-placeholder.png');
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Detail = ({route, navigation}) => {
  const [movieDetail, setMovieDetail] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const movieId = route.params.movieId;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId)
      .then(movieData => {
        setMovieDetail(movieData);
        setIsLoaded(true);
        console.log(movieData.poster_path);
      })
      .catch(err => {
        setIsLoaded(true);
        setErrorMessage(err.message);
      });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
      {isLoaded && (
        <View>
          <ScrollView>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500/' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genres}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          marginStart: 5,
                        }}
                        key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <View style={{marginTop: 15, width: width / 2}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={22}
                  fullStarColor={'gold'}
                  rating={movieDetail.vote_average / 2}
                />
              </View>
              <View style={styles.reloverview}>
                <Text style={{color: 'white'}}>{movieDetail.overview}</Text>
                <Text
                  style={{
                    color: 'white',
                    marginTop: 20,
                    marginBottom: 20,
                    fontWeight: 'bold',
                  }}>
                  {'Release date: ' +
                    dateFormat(movieDetail.release_date, ' mmmm dS, yyyy')}
                </Text>
              </View>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <Button onPress={videoShown} title="No video - go back" />
            </View>
          </Modal>
        </View>
      )}
      {!isLoaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    height: height * 0.6,
  },
  movieTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  genres: {
    flexDirection: 'row',
    alignContent: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  overview: {
    marginTop: 10,
    color: 'white',
    flexDirection: 'row',
    alignContent: 'center',
  },
  reloverview: {
    marginTop: 10,
    color: 'white',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    top: -30,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Detail;
