// import {
//   formatTimestamp,
//   isValidAmount,
//   isValidDate,
// } from "@/app/(auth)/(tabs)/utilities/transactions-utilities";
// import { GoalProps } from "@/app/types";
// import { formatDateString } from "@/common/utilities";
// import AppThemedText from "@/components/app_components/AppThemedText";
// import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
// import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
// import AppThemedView from "@/components/app_components/AppThemedView";
// import ShowIf from "@/components/ShowIf";
// import { GoalContext } from "@/store/goal/goal-context";
// import { GoalTransactionState } from "@/store/goal/goal-reducer";
// import { useContext } from "react";
// import { View } from "react-native";

// interface GoalTransactionModalContentProps {
//   data: GoalTransactionState;
// }

// const GoalTransactionModalContent = ({ data }: GoalTransactionModalContentProps) => {
//   const goalCtx = useContext(GoalContext);
//   const handleDelete = () => {};
//   const handleSubmit = () => {};
//   const handleResetState = () => {};
//   return (
//     <>
//       <ShowIf
//         condition={true}
//         render={
//           <View
//             style={{
//               alignItems: "center",
//               flexDirection: "row",
//               paddingBottom: 25,
//               width: "80%",
//               justifyContent: "flex-end",
//             }}
//           >
//             <AppThemedText
//               type="link"
//               onPress={() => {
//                 handleDelete()
//               }}
//             >
//               Delete
//             </AppThemedText>
//           </View>
//         }
//         renderElse={
//           <AppThemedView style={{ marginVertical: 25 }}></AppThemedView>
//         }
//       />
//       <AppThemedTextInput
//         iconName="calendar"
//         data={[]}
//         keyboardType="numeric"
//         placeholder="MM/DD/YYYY"
//         secureEntry={false}
//         value={
//           typeof data.date === "object"
//             ? formatDateString(formatTimestamp(data.date))
//             : data.date
//         }
//         checkValue={isValidDate}
//         setValue={transactionsCtx.setDate}
//       />
//       <AppThemedTextInput
//         data={[]}
//         keyboardType="numeric"
//         placeholder="Amount"
//         secureEntry={false}
//         value={data.amount.toString()}
//         checkValue={isValidAmount}
//         setValue={transactionsCtx.setAmount}
//       />
//       <AppThemedTouchableOpacity onPress={handleSubmit}>
//         Submit
//       </AppThemedTouchableOpacity>
//       <AppThemedText type="link" onPress={handleResetState}>
//         Close
//       </AppThemedText>
//     </>
//   );
// };

// export default GoalTransactionModalContent;
