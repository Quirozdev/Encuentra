import { TouchableOpacity, Image, View } from "react-native";
import styles from "./ProfileImageSelector.style";
import { LinearGradient } from "expo-linear-gradient";
import NoAvatarIcon from "../../../assets/images/profile_screen/noAvatar.svg"
import ImagePickerIcon from "../../../assets/images/profile_screen/imagePicker.svg"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react";


interface ProfileImageSelectorProps{
    profPic: {uri:string, base64:any}| ImagePicker.ImagePickerAsset
    onImageChange: (image: ImagePicker.ImagePickerAsset) => void;
}

const ProfileImageSelector: React.FC<ProfileImageSelectorProps> = ({ profPic, onImageChange }) => {
    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
          });

        if (!result.canceled) {
            console.log(result.assets[0].type)
            onImageChange(result.assets[0]);
        }
    }

    return (
    <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={pickImage}>
            <LinearGradient
            colors={['#FF7208', '#222419']} // Gradient colors
            start={[0, 0]} // Gradient start position
            end={[1, 1]} // Gradient end position
            style={styles.gradientContainer}
            >
            {profPic.uri ?  (
            <Image
                source={{ uri: profPic.uri }}
                style={styles.profilePicture}
                resizeMode="cover"
                
            />
            ) : (
            <View style={styles.noProfilePicture}>
                <NoAvatarIcon width={"100%"} height={"100%"}/>
            </View>
            
            )}
            </LinearGradient>
            <View style={styles.imagePickerContainer}>
                <ImagePickerIcon/>
            </View>
        </TouchableOpacity>
    </View>
)}

export default ProfileImageSelector