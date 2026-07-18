import { Platform } from 'react-native'

const fonts = {
    primary: {
        bold: Platform.select({
            ios: 'Montserrat-Bold',
            android: 'Montserrat-Bold',
        }),
        semibold: Platform.select({
            ios: 'Montserrat-Medium',
            android: 'Montserrat-Medium',
        }),
        regular: Platform.select({
            ios: 'Montserrat-Regular',
            android: 'Montserrat-Regular',
        }),
    },
}

export default fonts