import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { NAVIGATORS, ROUTES } from "./routes";

export const navigation_ref = createNavigationContainerRef();

export const navigate = (screen, params) => {
    if (navigation_ref.isReady()) {
        navigation_ref.navigate(screen, params);
    }
};

export const navigateToWriteReview = (token) => {
    if (!navigation_ref.isReady() || !token) return

    navigation_ref.navigate(NAVIGATORS.APP_STACK, {
        screen: ROUTES.WRITE_REVIEW,
        params: { token },
    })
}

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
