import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getDocumentaries,
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import react from 'react';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [movieImages, setMovieImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaries, setDocumentaries] = useState();
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const movieImageArray = [];
          upcomingMoviesData.forEach(movie => {
            movieImageArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });
          setMovieImages(movieImageArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaries(documentariesData);
          setIsLoaded(true);
        },
      )
      .catch(() => {
        setError(true);
      });
  }, []);
  return (
    <react.Fragment>
      {isLoaded && !error && (
        <ScrollView style={styles.mainScreen}>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                autoplay={true}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimensions.height * 0.66}
                circleLoop={true}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}

          {documentaries && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentaries"
                content={documentaries}
              />
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!isLoaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </react.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainScreen: {
    backgroundColor: '#000000',
  },
});

export default Home;
