FROM reactnativecommunity/react-native-android:2.1


WORKDIR /mobile

COPY . /mobile

VOLUME ["/mobile/android/app/build/outputs/apk/release"]
#COPY . /mobile/

#ENV LANG C.UTF-8
#ENV LC_ALL C.UTF-8

#RUN npm install
#RUN npm install -g bundle
#RUN npm install -g bundler
#RUN npm install -g react-native-cli

#RUN useradd -ms /bin/bash reactnative
#RUN chmod -R 777 node_modules
#RUN chown -R $USER:$GROUP node_modules
#RUN chown -R $USER:$GROUP ~/.npm
#RUN chown -R $USER:$GROUP ~/.config
#RUN chown reactnative:reactnative $ANDROID_HOME -R

#USER reactnative

#CMD ["react-native", "bundle", "--platform", "android", "--dev", "false", "--entry-file", "index.js", "--bundle-output", "android/app/src/main/assets/index.android.bundle", "--assets-dest", "android/app/src/main/res/"],

#CMD ["mkdir", "-p", "android/app/src/main/assets"]
#CMD ["react-native", "run-android", "--variant=release"]

#RUN cd android && ./gradlew bundleRelease -x bundleReleaseJsAndAssets
