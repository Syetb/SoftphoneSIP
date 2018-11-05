import {Navigation} from 'react-native-navigation';

import App from '../App';

import PostsList from './Screens/PostsList';
import ViewPost from './Screens/ViewPost';
import AddPost from './Screens/AddPost';

export function registerScreens() {

    Navigation.registerComponent('reactNativeInit.App', () => App);

    Navigation.registerComponent('blog.PostsList', () => PostsList);
    Navigation.registerComponent('blog.AddPost', () => ViewPost);
    Navigation.registerComponent('blog.ViewPost', () => AddPost);

}