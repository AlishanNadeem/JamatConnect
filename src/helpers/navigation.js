import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

export const navigation_ref = createNavigationContainerRef();

export const navigate = (screen, params) => {
    if (navigation_ref.isReady()) {
        navigation_ref.navigate(screen, params);
    }
};

export const goBack = () => {
    if (navigation_ref.isReady() && navigation_ref.canGoBack()) {
        navigation_ref.goBack();
    }
};

export const replace = (screen, params) => {
    if (navigation_ref.isReady()) {
        navigation_ref.dispatch(StackActions.replace(screen, params));
    }
};

export const push = (screen, params) => {
    if (navigation_ref.isReady()) {
        navigation_ref.dispatch(StackActions.push(screen, params));
    }
};

export const reset = (screen) => {
    if (navigation_ref.isReady()) {
        navigation_ref.reset({ index: 0, routes: [{ name: screen }] });
    }
};

export const openDrawer = () => {
    if (navigation_ref.isReady()) {
        navigation_ref.dispatch(DrawerActions.openDrawer());
    }
};

export const closeDrawer = () => {
    if (navigation_ref.isReady()) {
        navigation_ref.dispatch(DrawerActions.closeDrawer());
    }
};

export const toggleDrawer = () => {
    if (navigation_ref.isReady()) {
        navigation_ref.dispatch(DrawerActions.toggleDrawer());
    }
};

export const getCurrentRoute = () => {
    if (navigation_ref.isReady()) {
        return navigation_ref.getCurrentRoute()?.name;
    }
};

export const getCurrentParams = () => {
    if (navigation_ref.isReady()) {
        return navigation_ref.getCurrentRoute()?.params;
    }
};