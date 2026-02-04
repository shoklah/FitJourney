import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { HomePageButton } from '@/components/homepage-button';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import  SetYourGoalsScreen from './setBodyWeightGoals';
import { getUserData } from '@/storage/userDataStorage';

export default function HomeScreen() {
  const router = useRouter();
  // const handleFirstTimeUser = async () => {
  //   var userDataStorage = await getUserData();
  //   if (!userDataStorage.firstTimeUser === false) {
  //     router.push('/homePage');
  //   }
  // }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <ThemedView>
          <SetYourGoalsScreen />
        </ThemedView>
      {/* <HomePageButton 
        title="Workouts"
        onPress={() => router.push('/setWorkoutsGoals')}
      />
      <HomePageButton 
        title="Calories"
        onPress={() => router.push('/setCaloriesGoals')}
      />
      <HomePageButton 
        title="Body Weight"
        onPress={() => router.push('/setBodyWeightGoals')}
      /> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
