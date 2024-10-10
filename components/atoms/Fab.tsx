import {StyleSheet, TouchableOpacity} from "react-native";
import {PropsWithChildren, ReactNode} from "react";
import {StyleProps} from "react-native-reanimated";
import {Colors} from "@/constants/Colors";

type FabProps = {
    children: ReactNode,
    placement: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomRight' | 'bottomLeft' | 'center',
    style?: StyleProps
}

export default function Fab({children, placement, style}: FabProps){
    return (
        <TouchableOpacity style={[fabStyles[placement], style]}>{children}</TouchableOpacity>
    )
}

const fabBase = StyleSheet.create({
    base: {
        position: 'absolute',
        color: Colors.white,
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 50
    }
})

const fabStyles = StyleSheet.create({
    top:{
        ...fabBase.base,
        top: 0
    },
    topRight: {
        ...fabBase.base,
        top: 0,
        right:0
    },
    topLeft: {
        ...fabBase.base,
        top: 0,
        left: 0
    },
    bottom:{
        ...fabBase.base,
        bottom: 0
    },
    bottomRight:{
        ...fabBase.base,
        bottom: 0,
        right: 0
    },
    bottomLeft: {
        ...fabBase.base,
        bottom: 0,
        left: 0
    },
    center: {

    }
})

