import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import { COLORS } from "@/constants/Colors";
import { s, ScaledSheet, vs } from "react-native-size-matters";


export default function Details() {
    return (
        <AppThemedView
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
        }}
        >
        <AppThemedText
            style={{ textAlign: "center", paddingTop: 25 }}
            type="title"
        >
            Goal Details
        </AppThemedText>
        <AppThemedView
            style={[
            styles.section,
            ]}
        >
            <AppThemedText style={styles.sectionTitle}>
            Goal Details
            </AppThemedText>
            <AppThemedText style={styles.text}>
            View details about your goal here.
            </AppThemedText>
        </AppThemedView>
        </AppThemedView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: vs(20),
    },
    section: {
        width: "90%",
        marginVertical: vs(10),
        padding: s(20),
        borderRadius: s(10),
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: s(5),
        elevation: 3,
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: s(18),
        fontWeight: "bold",
        marginBottom: vs(10),
    },
    text: {
        fontSize: s(16),
        textAlign: "center",
    },
});
