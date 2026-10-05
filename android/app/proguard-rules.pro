# Add project specific ProGuard rules here.

# React Native
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}
-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
    void set*(***);
    *** get*();
}
-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers class * { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class * { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }
-keepclassmembers class * { native <methods>; }
-dontwarn com.facebook.react.**

# Hermes
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# Reanimated / Worklets
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.common.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native Screens / Gesture Handler / Safe Area
-keep class com.swmansion.rnscreens.** { *; }
-keep class com.swmansion.gesturehandler.** { *; }
-keep class com.th3rdwave.safeareacontext.** { *; }

# Firebase / Notifee
-keep class io.invertase.firebase.** { *; }
-dontwarn io.invertase.firebase.**
-keep class io.invertase.notifee.** { *; }
-dontwarn io.invertase.notifee.**
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# OkHttp / Okio
-dontwarn okhttp3.**
-dontwarn okio.**
