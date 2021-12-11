import { Image } from "react-native";

export const fetchImage = async(url: string) => {
    await Image.prefetch(url)
    .catch((error) => console.log('error: ', error));
};
