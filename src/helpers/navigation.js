import { createNavigationContainerRef, StackActions } from "@react-navigation/native";

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

export const reset = (screen) => {
    if (navigation_ref.isReady()) {
        navigation_ref.reset({ index: 0, routes: [{ name: screen }] });
    }
};
