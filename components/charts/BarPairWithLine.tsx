import React from 'react';
import {View, Text} from 'react-native';
import {BarChart} from "react-native-gifted-charts";
import { ruleTypes } from 'gifted-charts-core';

const BarPairWithLine = () => {
  const data = [
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Jan',
    },
    {value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 3500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Feb',
    },
    {value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 4500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Mar',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 5200,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Apr',
    },
    {value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

    {
      value: 3000,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'May',
    },
    {value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Jun',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Jul',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Aug',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Sep',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Oct',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Nov',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Dec',
    },
    {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
  ];

  return (
    <View
      style={{
        // margin: 10,
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        // borderRadius: 20,
        // backgroundColor: '#232B5D',
      }}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        Goals vs Actual
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <BarChart
        width={300}
          data={data}
          barWidth={16}
          initialSpacing={10}
          spacing={14}
          barBorderRadius={0}
          showGradient
          yAxisThickness={0}
          xAxisType={ruleTypes.SOLID}
          xAxisColor={'lightgray'}
          yAxisTextStyle={{color: 'lightgray'}}
          stepValue={1000}
          maxValue={10000}
          noOfSections={10}
          yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k']}
          labelWidth={40}
          xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
          showLine={true}
          lineConfig={{
            color: '#F29C6E',
            thickness: 3,
            curved: true,
            hideDataPoints: true,
            shiftY: 20,
            initialSpacing: -30,
          }}
        />
      </View>
    </View>
  );
};

export default BarPairWithLine;