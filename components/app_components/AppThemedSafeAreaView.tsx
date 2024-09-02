import { COLORTHEME } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native";


const AppThemedSafeAreaView  = ({ children }: { children: React.ReactNode }) => {
    const backgroundColor = useThemeColor(
        { light: COLORTHEME.light.background, dark: COLORTHEME.dark.background },
        "background"
      );
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}}>
            {children}
        </SafeAreaView>
    );
};
export default AppThemedSafeAreaView;